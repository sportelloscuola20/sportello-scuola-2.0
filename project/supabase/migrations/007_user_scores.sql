-- 007_user_scores.sql
-- Crea la tabella user_scores per salvare i risultati dei simulatori GPS e ATA

CREATE TABLE IF NOT EXISTS user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo_graduatoria TEXT NOT NULL CHECK (tipo_graduatoria IN ('gps', 'ata')),
  fascia TEXT NOT NULL DEFAULT 'I',
  classe_concorso TEXT NOT NULL DEFAULT '',
  punteggio_totale NUMERIC(6,2) NOT NULL DEFAULT 0,
  dettagli_calcolo JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indici per query frequenti
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON user_scores (user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_tipo ON user_scores (tipo_graduatoria);
CREATE INDEX IF NOT EXISTS idx_user_scores_created ON user_scores (created_at DESC);

-- RLS policies
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;

-- L'utente può leggere i propri punteggi
CREATE POLICY "Users read own scores"
  ON user_scores FOR SELECT
  USING (auth.uid() = user_id);

-- L'utente può inserire i propri punteggi
CREATE POLICY "Users insert own scores"
  ON user_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- L'utente può eliminare i propri punteggi
CREATE POLICY "Users delete own scores"
  ON user_scores FOR DELETE
  USING (auth.uid() = user_id);
