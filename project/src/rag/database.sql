-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table for storing users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT, -- For email/password auth, can be null if using OAuth
  role TEXT CHECK (role IN ('docente', 'ata', 'dirigente', 'sindacale', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT CHECK (plan IN ('free', 'pro', 'enterprise')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')) NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Table for storing document chunks
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing embeddings
CREATE TABLE embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id UUID REFERENCES document_chunks(id) ON DELETE CASCADE,
  embedding VECTOR(1536), -- Adjust dimension based on the embedding model (e.g., 1536 for OpenAI text-embedding-3-small)
  model TEXT NOT NULL, -- e.g., 'text-embedding-3-small'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for chat sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for chat messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  citations JSONB, -- Store citations as JSONB for flexibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for GPS scores
CREATE TABLE gps_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  details JSONB, -- Store breakdown of the score
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for ATA scores
CREATE TABLE ata_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  details JSONB, -- Store breakdown of the score
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'warning', 'error', 'success')) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to match embeddings using cosine distance
CREATE OR REPLACE FUNCTION match_embeddings (
  query_embedding VECTOR(1536),
  match_count INT
)
RETURNS TABLE (
  chunk_id UUID,
  similarity FLOAT8
)
LANGUAGE SQL
AS $$
  SELECT
    embeddings.chunk_id,
    1 - (embeddings.embedding <=> query_embedding) AS similarity
  FROM embeddings
  ORDER BY embeddings.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Indexes for faster retrieval
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX idx_document_chunks_document_id ON document_chunks(document_id);
CREATE INDEX idx_embeddings_chunk_id ON embeddings(chunk_id);
CREATE INDEX idx_embeddings_embedding ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_gps_scores_user_id ON gps_scores(user_id);
CREATE INDEX idx_ata_scores_user_id ON ata_scores(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);