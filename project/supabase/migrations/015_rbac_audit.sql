-- CAP-07 — RBAC + Audit Logging (EMA §7.4, §8.3)
-- Role-based access control and immutable audit trail.

-- User roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer', 'operator')),
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id, role)
);

-- Role permissions mapping
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer', 'operator')),
  resource TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('read', 'write', 'delete', 'admin')),
  granted_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(role, resource, action)
);

-- Default permissions per role
INSERT INTO role_permissions (role, resource, action) VALUES
  -- Admin: full access
  ('admin', '*', 'admin'),
  -- Editor: can write content
  ('editor', 'documenti', 'write'),
  ('editor', 'documenti', 'read'),
  ('editor', 'interpelli', 'write'),
  ('editor', 'interpelli', 'read'),
  ('editor', 'news', 'write'),
  ('editor', 'news', 'read'),
  -- Operator: can approve/reject
  ('operator', 'documenti', 'write'),
  ('operator', 'documenti', 'read'),
  ('operator', 'interpelli', 'read'),
  -- Viewer: read-only
  ('viewer', 'documenti', 'read'),
  ('viewer', 'interpelli', 'read'),
  ('viewer', 'news', 'read'),
  ('viewer', 'chat', 'read')
ON CONFLICT (role, resource, action) DO NOTHING;

-- Audit log (immutable append-only)
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for audit queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_resource ON audit_log(resource, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at DESC);

-- RLS: no one can delete from audit_log (append-only)
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Users can read their own roles
CREATE POLICY "Users read own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can manage all roles
CREATE POLICY "Admins manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Everyone can read role_permissions
CREATE POLICY "Authenticated read permissions" ON role_permissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can insert audit logs
CREATE POLICY "Service role insert audit" ON audit_log
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Authenticated users can read audit logs for their own actions
CREATE POLICY "Users read own audit" ON audit_log
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can read all audit logs
CREATE POLICY "Admins read all audit" ON audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Function to check user permission
CREATE OR REPLACE FUNCTION check_permission(
  p_user_id UUID,
  p_resource TEXT,
  p_action TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  has_permission BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_permissions rp ON rp.role = ur.role
    WHERE ur.user_id = p_user_id
      AND (rp.resource = p_resource OR rp.resource = '*')
      AND (rp.action = p_action OR rp.action = 'admin')
      AND (ur.expires_at IS NULL OR ur.expires_at > now())
  ) INTO has_permission;

  RETURN has_permission;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log audit events (called from app)
CREATE OR REPLACE FUNCTION log_audit_event(
  p_user_id UUID,
  p_action TEXT,
  p_resource TEXT,
  p_resource_id TEXT DEFAULT NULL,
  p_old_value JSONB DEFAULT NULL,
  p_new_value JSONB DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO audit_log (user_id, action, resource, resource_id, old_value, new_value, ip_address, user_agent)
  VALUES (p_user_id, p_action, p_resource, p_resource_id, p_old_value, p_new_value, p_ip_address, p_user_agent)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
