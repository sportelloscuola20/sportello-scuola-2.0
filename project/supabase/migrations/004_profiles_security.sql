-- 004_profiles_security.sql
-- CAP-SEC-01 — Block is_premium / is_admin self-escalation on profiles (EMA §7.4)
--
-- Before: RLS policy "Users can update own profile" allowed any authenticated user
-- to set is_premium = true (paid feature bypass) and to forge the admin email check
-- that the client used to compute is_admin.
--
-- After:
--   * is_admin becomes a server-side column (granted only via this migration or
--     a service-role/webhook write).
--   * is_premium can only be changed by the service role (Stripe webhook).
--   * INSERT forces is_premium = false and derives is_admin from the creator email
--     (email lives in auth.users and cannot be self-changed).

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- ────────────────────────────────────────────────────────────────────────────
-- INSERT: users may only create their own profile and only as non-premium.
-- is_admin is derived by the trigger below, never trusted from the request.
-- ────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id AND is_premium = false);

-- ────────────────────────────────────────────────────────────────────────────
-- Triggers
-- ────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.derive_profile_privileges()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- is_premium can never be set from the client on INSERT
  NEW.is_premium := false;
  -- is_admin derived from the creator email (stored in auth.users, not client-controlled)
  NEW.is_admin := (NEW.email = 'sportelloscuola2.0@gmail.com');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_derive_profile_privileges ON profiles;
CREATE TRIGGER trg_derive_profile_privileges
  BEFORE INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.derive_profile_privileges();

CREATE OR REPLACE FUNCTION public.block_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Service role (Stripe webhook / manual admin) may change privileges
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  IF NEW.is_premium IS DISTINCT FROM OLD.is_premium THEN
    RAISE EXCEPTION 'is_premium cannot be modified by the user';
  END IF;

  IF NEW.is_admin IS DISTINCT FROM OLD.is_admin THEN
    RAISE EXCEPTION 'is_admin cannot be modified by the user';
  END IF;

  -- email lives in auth.users; keep profiles.email consistent
  IF NEW.email IS DISTINCT FROM OLD.email THEN
    RAISE EXCEPTION 'email cannot be modified by the user';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_block_profile_privilege_escalation ON profiles;
CREATE TRIGGER trg_block_profile_privilege_escalation
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.block_profile_privilege_escalation();

-- ────────────────────────────────────────────────────────────────────────────
-- Bootstrap: existing creator profile becomes admin
-- ────────────────────────────────────────────────────────────────────────────
UPDATE profiles
SET is_admin = true
WHERE email = 'sportelloscuola2.0@gmail.com';
