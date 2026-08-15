-- 017_pipeline_tables_rls.sql
-- Completes the schema: creates the remaining infrastructure tables that the app
-- queries but that were never defined in any migration (they were created manually
-- in the live DB), and hardens RLS across the whole pipeline.
--
-- Tables already defined in earlier migrations (005, 008, 013) get their RLS here.
-- Remaining tables (user_notifications, saved_items, gemini_calls_log, news_cache,
-- intelligence_dashboard_stats) are created here.
--
-- RLS model:
--   * Public content (intelligence_news, intelligence_scadenze, knowledge_links,
--     news_cache, monitored_sources, intelligence_dashboard_stats): anon SELECT.
--   * Pipeline internals (source_documents): authenticated SELECT only.
--   * User-scoped (user_notifications, saved_items, gemini_calls_log writes): own rows.
--   * All writes from the cron/edge pipeline use the SERVICE_ROLE key (bypasses RLS).
--
-- SECURITY FIX: page_analytics SELECT becomes ADMIN-ONLY (was: any authenticated
-- user could read analytics).
--
-- NOTE: `CREATE POLICY IF NOT EXISTS` requires PostgreSQL 18; Supabase runs PG15/17,
-- so policy creation is wrapped in a helper that checks pg_policies first.

-- ============================================================================
-- Helper: admin check (SECURITY DEFINER so it bypasses profiles RLS)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  );
$$;

-- ============================================================================
-- Helper: create a policy only if it does not already exist (PG15/17 compatible)
-- ============================================================================
CREATE OR REPLACE FUNCTION public._mig_017_create_policy(
  p_policy TEXT,
  p_table TEXT,
  p_command TEXT,
  p_using TEXT,
  p_check TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_using TEXT;
  v_check TEXT;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = p_table AND policyname = p_policy
  ) THEN
    IF p_command = 'FOR INSERT' THEN
      -- INSERT policies only accept WITH CHECK (no USING clause)
      v_using := '';
      v_check := format('WITH CHECK (%s)', COALESCE(p_check, p_using));
    ELSE
      v_using := format('USING (%s)', p_using);
      v_check := CASE WHEN p_check IS NULL THEN '' ELSE format('WITH CHECK (%s)', p_check) END;
    END IF;

    EXECUTE format(
      'CREATE POLICY %I ON %I %s %s %s',
      p_policy, p_table, p_command, v_using, v_check
    );
  END IF;
END;
$$;

-- ============================================================================
-- RLS: monitored_sources (table created in 005)
-- ============================================================================
ALTER TABLE monitored_sources ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Anyone can read monitored sources', 'monitored_sources', 'FOR SELECT', 'true');
SELECT public._mig_017_create_policy('Service role writes monitored sources', 'monitored_sources', 'FOR INSERT', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates monitored sources', 'monitored_sources', 'FOR UPDATE', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role deletes monitored sources', 'monitored_sources', 'FOR DELETE', 'auth.role() = ''service_role''');

-- ============================================================================
-- RLS: source_documents (table created in 005)
-- ============================================================================
ALTER TABLE source_documents ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Authenticated read source documents', 'source_documents', 'FOR SELECT', 'auth.role() = ''authenticated''');
SELECT public._mig_017_create_policy('Service role writes source documents', 'source_documents', 'FOR INSERT', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates source documents', 'source_documents', 'FOR UPDATE', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role deletes source documents', 'source_documents', 'FOR DELETE', 'auth.role() = ''service_role''');

-- ============================================================================
-- RLS: intelligence_news (table created in 008)
-- ============================================================================
ALTER TABLE intelligence_news ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Anyone can read news', 'intelligence_news', 'FOR SELECT', 'true');
SELECT public._mig_017_create_policy('Service role writes news', 'intelligence_news', 'FOR INSERT', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates news', 'intelligence_news', 'FOR UPDATE', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role deletes news', 'intelligence_news', 'FOR DELETE', 'auth.role() = ''service_role''');

-- ============================================================================
-- RLS: intelligence_scadenze (table created in 008)
-- ============================================================================
ALTER TABLE intelligence_scadenze ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Anyone can read deadlines', 'intelligence_scadenze', 'FOR SELECT', 'true');
SELECT public._mig_017_create_policy('Service role writes deadlines', 'intelligence_scadenze', 'FOR INSERT', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates deadlines', 'intelligence_scadenze', 'FOR UPDATE', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role deletes deadlines', 'intelligence_scadenze', 'FOR DELETE', 'auth.role() = ''service_role''');

-- ============================================================================
-- RLS: knowledge_links (table created in 013; read policy added there)
-- ============================================================================
ALTER TABLE knowledge_links ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Anyone can read knowledge links', 'knowledge_links', 'FOR SELECT', 'true');
SELECT public._mig_017_create_policy('Service role writes knowledge links', 'knowledge_links', 'FOR INSERT', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates knowledge links', 'knowledge_links', 'FOR UPDATE', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role deletes knowledge links', 'knowledge_links', 'FOR DELETE', 'auth.role() = ''service_role''');

-- ============================================================================
-- user_notifications — in-app notifications (user-scoped)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_notifications_user ON user_notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_user_notifications_created ON user_notifications(created_at DESC);

ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Users read own notifications', 'user_notifications', 'FOR SELECT', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users create own notifications', 'user_notifications', 'FOR INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users update own notifications', 'user_notifications', 'FOR UPDATE', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users delete own notifications', 'user_notifications', 'FOR DELETE', 'auth.uid() = user_id');

-- ============================================================================
-- saved_items — user bookmarks (user-scoped)
-- ============================================================================
CREATE TABLE IF NOT EXISTS saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_items_user ON saved_items(user_id, item_type);

ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Users read own saved items', 'saved_items', 'FOR SELECT', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users create own saved items', 'saved_items', 'FOR INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users update own saved items', 'saved_items', 'FOR UPDATE', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users delete own saved items', 'saved_items', 'FOR DELETE', 'auth.uid() = user_id');

-- ============================================================================
-- gemini_calls_log — rate/cost tracking. Written by the anon client (logged-in
-- users, own rows) and by the edge functions (service role).
-- The live DB already has a legacy version of this table (id bigint, only
-- giorno/called_at/modello/esito/durata_ms); ADD COLUMN IF NOT EXISTS upgrades
-- it in place so a fresh DB and the existing one converge to the same superset.
-- ============================================================================
CREATE TABLE IF NOT EXISTS gemini_calls_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  prompt_preview TEXT,
  model TEXT,
  modello TEXT,
  tokens_in INT,
  tokens_out INT,
  input_tokens INT,
  output_tokens INT,
  latency_ms INT,
  durata_ms INT,
  status TEXT,
  esito TEXT,
  success BOOLEAN,
  endpoint TEXT,
  giorno DATE,
  called_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Upgrade an existing (legacy) table in place.
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS prompt_preview TEXT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS model TEXT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS modello TEXT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS tokens_in INT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS tokens_out INT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS input_tokens INT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS output_tokens INT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS latency_ms INT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS durata_ms INT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS esito TEXT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS success BOOLEAN;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS endpoint TEXT;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS giorno DATE;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS called_at TIMESTAMPTZ;
ALTER TABLE gemini_calls_log ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Relax legacy NOT NULL constraints: the app client inserts without modello/esito
-- (it uses model/status), while the edge functions use modello/esito/durata_ms.
ALTER TABLE gemini_calls_log ALTER COLUMN giorno DROP NOT NULL;
ALTER TABLE gemini_calls_log ALTER COLUMN called_at DROP NOT NULL;
ALTER TABLE gemini_calls_log ALTER COLUMN modello DROP NOT NULL;
ALTER TABLE gemini_calls_log ALTER COLUMN esito DROP NOT NULL;
ALTER TABLE gemini_calls_log ALTER COLUMN durata_ms DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_gemini_calls_user ON gemini_calls_log(user_id);
CREATE INDEX IF NOT EXISTS idx_gemini_calls_created ON gemini_calls_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gemini_calls_giorno ON gemini_calls_log(giorno);

ALTER TABLE gemini_calls_log ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Users read gemini logs', 'gemini_calls_log', 'FOR SELECT', 'auth.role() = ''authenticated''');
SELECT public._mig_017_create_policy('Users log own gemini calls', 'gemini_calls_log', 'FOR INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Service role writes gemini logs', 'gemini_calls_log', 'FOR INSERT', 'auth.role() = ''service_role''', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates gemini logs', 'gemini_calls_log', 'FOR UPDATE', 'auth.role() = ''service_role''');

-- ============================================================================
-- news_cache — legacy fallback news feed (public content, seeded elsewhere)
-- ============================================================================
CREATE TABLE IF NOT EXISTS news_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  content TEXT,
  due_date TIMESTAMPTZ,
  source_url TEXT,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_news_cache_created ON news_cache(created_at DESC);

ALTER TABLE news_cache ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Anyone can read news cache', 'news_cache', 'FOR SELECT', 'true');
SELECT public._mig_017_create_policy('Service role writes news cache', 'news_cache', 'FOR INSERT', 'auth.role() = ''service_role''', 'auth.role() = ''service_role''');
SELECT public._mig_017_create_policy('Service role updates news cache', 'news_cache', 'FOR UPDATE', 'auth.role() = ''service_role''');

-- ============================================================================
-- intelligence_dashboard_stats — single-row live stats snapshot. The live DB may
-- already expose this as a view; only create a table if no relation exists.
-- ============================================================================
DO $$
BEGIN
  IF to_regclass('public.intelligence_dashboard_stats') IS NULL THEN
    CREATE TABLE public.intelligence_dashboard_stats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      fonti_attive INT NOT NULL DEFAULT 0,
      fonti_totali INT NOT NULL DEFAULT 0,
      documenti_da_elaborare INT NOT NULL DEFAULT 0,
      documenti_ultime_24h INT NOT NULL DEFAULT 0,
      notizie_oggi INT NOT NULL DEFAULT 0,
      notizie_attive INT NOT NULL DEFAULT 0,
      collegamenti_knowledge_graph INT NOT NULL DEFAULT 0,
      scadenze_attive INT NOT NULL DEFAULT 0,
      scadenze_imminenti INT NOT NULL DEFAULT 0,
      ultimo_monitoraggio TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public.intelligence_dashboard_stats') IS NOT NULL
     AND EXISTS (
       SELECT 1 FROM pg_class
       WHERE oid = to_regclass('public.intelligence_dashboard_stats') AND relkind = 'r'
     ) THEN
    ALTER TABLE public.intelligence_dashboard_stats ENABLE ROW LEVEL SECURITY;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'public' AND tablename = 'intelligence_dashboard_stats'
        AND policyname = 'Anyone can read dashboard stats'
    ) THEN
      CREATE POLICY "Anyone can read dashboard stats" ON intelligence_dashboard_stats
        FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'public' AND tablename = 'intelligence_dashboard_stats'
        AND policyname = 'Service role writes dashboard stats'
    ) THEN
      CREATE POLICY "Service role writes dashboard stats" ON intelligence_dashboard_stats
        FOR ALL USING (auth.role() = 'service_role');
    END IF;
  END IF;
END $$;

-- ============================================================================
-- SECURITY FIX: page_analytics SELECT must be ADMIN-ONLY.
-- Previous policy allowed ANY authenticated user to read analytics.
-- ============================================================================
DROP POLICY IF EXISTS "Admins can read analytics" ON page_analytics;

SELECT public._mig_017_create_policy('Admins can read analytics', 'page_analytics', 'FOR SELECT', 'public.is_admin()');

-- ============================================================================
-- newsletter_subscriptions — public opt-in; INSERT/email dedupe handled in code.
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_active
  ON newsletter_subscriptions(is_active);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Anyone can subscribe', 'newsletter_subscriptions', 'FOR INSERT', 'true', 'true');
SELECT public._mig_017_create_policy('Service role manages subscriptions', 'newsletter_subscriptions', 'FOR ALL', 'auth.role() = ''service_role''');

-- ============================================================================
-- appointments — user-scoped consultation bookings.
-- ============================================================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  servizio TEXT NOT NULL,
  data_ora TIMESTAMPTZ NOT NULL,
  is_paid BOOLEAN NOT NULL DEFAULT false,
  meet_link TEXT,
  luogo TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_data_ora ON appointments(data_ora);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Users read own appointments', 'appointments', 'FOR SELECT', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users create own appointments', 'appointments', 'FOR INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users update own appointments', 'appointments', 'FOR UPDATE', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users delete own appointments', 'appointments', 'FOR DELETE', 'auth.uid() = user_id');

-- ============================================================================
-- user_preferences — extended professional profile, one row per user.
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT,
  ruolo TEXT,
  classe_concorso TEXT,
  punteggio_gps NUMERIC,
  punteggio_ata NUMERIC,
  fascia_gps TEXT,
  titoli TEXT[] NOT NULL DEFAULT '{}',
  certificazioni TEXT[] NOT NULL DEFAULT '{}',
  provincia_preferita TEXT,
  regione_preferita TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

SELECT public._mig_017_create_policy('Users read own preferences', 'user_preferences', 'FOR SELECT', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users upsert own preferences', 'user_preferences', 'FOR INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users update own preferences', 'user_preferences', 'FOR UPDATE', 'auth.uid() = user_id');
SELECT public._mig_017_create_policy('Users delete own preferences', 'user_preferences', 'FOR DELETE', 'auth.uid() = user_id');

-- ============================================================================
-- Drop the transient migration helper (no longer needed in the schema)
-- ============================================================================
DROP FUNCTION IF EXISTS public._mig_017_create_policy(TEXT, TEXT, TEXT, TEXT, TEXT);
