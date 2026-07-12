-- EMA §2/§4 — Persistent Event Bus (domain_events table)
-- Enables server-side event storage and cross-session event history.

CREATE TABLE IF NOT EXISTS domain_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  source TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for querying by event type and time range
CREATE INDEX IF NOT EXISTS idx_domain_events_type ON domain_events(type);
CREATE INDEX IF NOT EXISTS idx_domain_events_created_at ON domain_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_domain_events_source ON domain_events(source);

-- RLS: only service role can write, authenticated can read recent
ALTER TABLE domain_events ENABLE ROW LEVEL SECURITY;

-- Service role can insert
CREATE POLICY "Service role can insert events" ON domain_events
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Authenticated users can read events (last 24h)
CREATE POLICY "Authenticated can read recent events" ON domain_events
  FOR SELECT USING (
    auth.role() = 'authenticated'
    AND created_at > now() - interval '24 hours'
  );

-- Function to clean up old events (keep 7 days)
CREATE OR REPLACE FUNCTION cleanup_old_domain_events()
RETURNS void AS $$
BEGIN
  DELETE FROM domain_events WHERE created_at < now() - interval '7 days';
END;
$$ LANGUAGE plpgsql;

-- Scheduled cleanup via pg_cron (if available)
-- SELECT cron.schedule('cleanup-domain-events', '0 3 * * *', 'SELECT cleanup_old_domain_events()');
