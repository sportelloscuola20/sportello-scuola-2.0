CREATE TABLE IF NOT EXISTS page_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'search', 'feature_use', 'chat_message', 'simulator_run')),
  path TEXT,
  query TEXT,
  result_count INTEGER,
  feature_name TEXT,
  metadata JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_page_analytics_event_type ON page_analytics(event_type);
CREATE INDEX idx_page_analytics_created_at ON page_analytics(created_at DESC);
CREATE INDEX idx_page_analytics_path ON page_analytics(path);
CREATE INDEX idx_page_analytics_user_id ON page_analytics(user_id);

ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics"
  ON page_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read analytics"
  ON page_analytics FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );

CREATE MATERIALIZED VIEW IF NOT EXISTS analytics_daily_stats AS
SELECT
  date_trunc('day', created_at) AS day,
  event_type,
  path,
  COUNT(*) AS count,
  COUNT(DISTINCT user_id) AS unique_users
FROM page_analytics
GROUP BY 1, 2, 3;

CREATE UNIQUE INDEX idx_analytics_daily_stats ON analytics_daily_stats(day, event_type, path);
