-- 001_area_riservata.sql
-- Crea tabella profiles estesa con onboarded, preferences, notification_targets
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  ruolo TEXT DEFAULT 'aspirante',
  is_premium BOOLEAN DEFAULT false,
  onboarded BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{}',
  notification_targets JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Simulations (score history)
CREATE TABLE IF NOT EXISTS simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo_graduatoria TEXT NOT NULL,
  punteggio_finale NUMERIC NOT NULL,
  dettagli JSONB DEFAULT '{}',
  titoli_simulati JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Junction table: user favorites (bookmarks)
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS policies: profiles
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS policies: simulations
CREATE POLICY "Users can read own simulations" ON simulations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own simulations" ON simulations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own simulations" ON simulations
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies: user_favorites
CREATE POLICY "Users can read own favorites" ON user_favorites
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON user_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON user_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Bandi / interpelli table
CREATE TABLE IF NOT EXISTS interpelli_nazionali (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo TEXT NOT NULL,
  ente TEXT NOT NULL DEFAULT '',
  tipo TEXT DEFAULT '',
  data_scadenza TIMESTAMPTZ NOT NULL,
  data_pubblicazione TIMESTAMPTZ DEFAULT now(),
  link TEXT,
  regione TEXT,
  provincia TEXT,
  categoria TEXT,
  descrizione TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE interpelli_nazionali ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read bandi" ON interpelli_nazionali
  FOR SELECT USING (true);

-- Storage bucket for user documents
INSERT INTO storage.buckets (id, name, public) VALUES ('user-documents', 'user-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage bucket
CREATE POLICY "Users can read own documents" ON storage.objects
  FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (auth.uid() = owner_id AND bucket_id = 'user-documents');
CREATE POLICY "Users can delete own documents" ON storage.objects
  FOR DELETE USING (auth.uid() = owner_id AND bucket_id = 'user-documents');
