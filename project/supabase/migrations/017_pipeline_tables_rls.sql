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
-- RLS: monitored_sources (table created in 005)
-- ============================================================================
ALTER TABLE monitored_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read monitored sources" ON monitored_sources
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role writes monitored sources" ON monitored_sources
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates monitored sources" ON monitored_sources
  FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role deletes monitored sources" ON monitored_sources
  FOR DELETE USING (auth.role() = 'service_role');

-- ============================================================================
-- RLS: source_documents (table created in 005)
-- ============================================================================
ALTER TABLE source_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Authenticated read source documents" ON source_documents
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "Service role writes source documents" ON source_documents
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates source documents" ON source_documents
  FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role deletes source documents" ON source_documents
  FOR DELETE USING (auth.role() = 'service_role');

-- ============================================================================
-- RLS: intelligence_news (table created in 008)
-- ============================================================================
ALTER TABLE intelligence_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read news" ON intelligence_news
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role writes news" ON intelligence_news
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates news" ON intelligence_news
  FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role deletes news" ON intelligence_news
  FOR DELETE USING (auth.role() = 'service_role');

-- ============================================================================
-- RLS: intelligence_scadenze (table created in 008)
-- ============================================================================
ALTER TABLE intelligence_scadenze ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read deadlines" ON intelligence_scadenze
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role writes deadlines" ON intelligence_scadenze
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates deadlines" ON intelligence_scadenze
  FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role deletes deadlines" ON intelligence_scadenze
  FOR DELETE USING (auth.role() = 'service_role');

-- ============================================================================
-- RLS: knowledge_links (table created in 013; read policy added there)
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'knowledge_links'
      AND policyname = 'Anyone can read knowledge links'
  ) THEN
    ALTER TABLE knowledge_links ENABLE ROW LEVEL SECURITY;
    CREATE POLICY IF NOT EXISTS "Anyone can read knowledge links" ON knowledge_links
      FOR SELECT USING (true);
  END IF;
END $$;

CREATE POLICY IF NOT EXISTS "Service role writes knowledge links" ON knowledge_links
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates knowledge links" ON knowledge_links
  FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role deletes knowledge links" ON knowledge_links
  FOR DELETE USING (auth.role() = 'service_role');

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

CREATE POLICY IF NOT EXISTS "Users read own notifications" ON user_notifications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users create own notifications" ON user_notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own notifications" ON user_notifications
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own notifications" ON user_notifications
  FOR DELETE USING (auth.uid() = user_id);

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

CREATE POLICY IF NOT EXISTS "Users read own saved items" ON saved_items
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users create own saved items" ON saved_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users update own saved items" ON saved_items
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users delete own saved items" ON saved_items
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- gemini_calls_log — rate/cost tracking. Written by the anon client (logged-in
-- users, own rows) and by the edge functions (service role).
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

CREATE INDEX IF NOT EXISTS idx_gemini_calls_user ON gemini_calls_log(user_id);
CREATE INDEX IF NOT EXISTS idx_gemini_calls_created ON gemini_calls_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gemini_calls_giorno ON gemini_calls_log(giorno);

ALTER TABLE gemini_calls_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users read gemini logs" ON gemini_calls_log
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "Users log own gemini calls" ON gemini_calls_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Service role writes gemini logs" ON gemini_calls_log
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates gemini logs" ON gemini_calls_log
  FOR UPDATE USING (auth.role() = 'service_role');

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

CREATE POLICY IF NOT EXISTS "Anyone can read news cache" ON news_cache
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role writes news cache" ON news_cache
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Service role updates news cache" ON news_cache
  FOR UPDATE USING (auth.role() = 'service_role');

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

CREATE POLICY IF NOT EXISTS "Admins can read analytics" ON page_analytics
  FOR SELECT USING (public.is_admin());

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

CREATE POLICY IF NOT EXISTS "Anyone can subscribe" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Service role manages subscriptions" ON newsletter_subscriptions
  FOR ALL USING (auth.role() = 'service_role');

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

CREATE POLICY IF NOT EXISTS "Users read own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users create own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users update own appointments" ON appointments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users delete own appointments" ON appointments
  FOR DELETE USING (auth.uid() = user_id);

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

CREATE POLICY IF NOT EXISTS "Users read own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users upsert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users delete own preferences" ON user_preferences
  FOR DELETE USING (auth.uid() = user_id);
