-- ============================================
-- SPORTIELLO SCUOLA 2.0 — SCHEMA DATABASE
-- Supabase + PostgreSQL + pgvector
-- ============================================

-- Estensione vettoriale per RAG
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- TABELLE PRINCIPALI
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  ruolo TEXT NOT NULL DEFAULT 'aspirante' CHECK (ruolo IN ('docente', 'ata', 'aspirante')),
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tipo_graduatoria TEXT NOT NULL CHECK (tipo_graduatoria IN ('gps', 'ata')),
  fascia TEXT CHECK (fascia IN ('I', 'II', 'III')),
  classe_concorso TEXT,
  punteggio_totale DECIMAL(10, 2) NOT NULL DEFAULT 0,
  dettagli_calcolo JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS interpelli_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  regione TEXT NOT NULL,
  provincia TEXT NOT NULL,
  classe_concorso_area TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Docenti', 'ATA', 'Bandi', 'Generale')),
  content TEXT NOT NULL,
  due_date DATE,
  source_url TEXT,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  servizio TEXT NOT NULL,
  data_ora TIMESTAMPTZ NOT NULL,
  is_paid BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB NOT NULL DEFAULT '{}',
  uploaded_by UUID REFERENCES profiles(id)
);

CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id UUID NOT NULL REFERENCES document_chunks(id) ON DELETE CASCADE,
  embedding vector(1536),
  model TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  citations JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS saved_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('news', 'bando', 'scadenza')),
  title TEXT NOT NULL,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_id, item_type)
);

-- ============================================
-- INDICI
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_scores_user ON user_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_tipo ON user_scores(tipo_graduatoria);
CREATE INDEX IF NOT EXISTS idx_interpelli_alerts_user ON interpelli_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_interpelli_alerts_active ON interpelli_alerts(active);
CREATE INDEX IF NOT EXISTS idx_news_cache_category ON news_cache(category);
CREATE INDEX IF NOT EXISTS idx_news_cache_pinned ON news_cache(is_pinned);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(data_ora);
CREATE INDEX IF NOT EXISTS idx_document_chunks_doc ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_embeddings_chunk ON embeddings(chunk_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_saved_alerts_user ON saved_alerts(user_id);

-- Indice vettoriale per RAG
CREATE INDEX IF NOT EXISTS idx_embeddings_vector ON embeddings
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================
-- FUNZIONE RICERCA SEMANTICA
-- ============================================

CREATE OR REPLACE FUNCTION match_embeddings(
  query_embedding vector(1536),
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  chunk_id UUID,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.chunk_id,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM embeddings e
  ORDER BY e.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE interpelli_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utenti possono leggere il proprio profilo"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Utenti possono aggiornare il proprio profilo"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Utenti possono leggere i propri punteggi"
  ON user_scores FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono inserire i propri punteggi"
  ON user_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utenti possono leggere i propri alert"
  ON interpelli_alerts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono gestire i propri alert"
  ON interpelli_alerts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono leggere i propri appuntamenti"
  ON appointments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono gestire i propri appuntamenti"
  ON appointments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono gestire i propri alert salvati"
  ON saved_alerts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "News pubblica leggibile da tutti"
  ON news_cache FOR SELECT USING (true);

CREATE POLICY "Documenti leggibili da tutti"
  ON documents FOR SELECT USING (true);

CREATE POLICY "Newsletter iscrizione pubblica"
  ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
