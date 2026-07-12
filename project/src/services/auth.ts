/**
 * ============================================================================
 *  CAP-07 — RBAC SERVICE (EMA §7.4, §8.3)
 *  Role-based access control and audit logging.
 * ============================================================================
 */

import { supabase } from '../lib/supabaseClient';

export type Role = 'admin' | 'editor' | 'viewer' | 'operator';
export type Permission = 'read' | 'write' | 'delete' | 'admin';

export interface UserRole {
  id: string;
  user_id: string;
  role: Role;
  granted_by: string | null;
  granted_at: string;
  expires_at: string | null;
}

export interface AuditEntry {
  id: string;
  user_id: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

/**
 * Check if a user has a specific permission on a resource.
 * Uses the database function check_permission() for authoritative check.
 */
export async function checkPermission(
  userId: string,
  resource: string,
  action: Permission
): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('check_permission', {
      p_user_id: userId,
      p_resource: resource,
      p_action: action,
    });
    if (error) return false;
    return data === true;
  } catch {
    return false;
  }
}

/**
 * Get all roles for a user.
 */
export async function getUserRoles(userId: string): Promise<UserRole[]> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .or('expires_at.is.null,expires_at.gt.now()');
    if (error || !data) return [];
    return data as UserRole[];
  } catch {
    return [];
  }
}

/**
 * Assign a role to a user (admin only).
 */
export async function assignRole(
  userId: string,
  role: Role,
  grantedBy: string,
  expiresAt?: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userId,
        role,
        granted_by: grantedBy,
        expires_at: expiresAt || null,
      }, { onConflict: 'user_id,role' });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Revoke a role from a user.
 */
export async function revokeRole(userId: string, role: Role): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Log an audit event (immutable append-only).
 */
export async function logAuditEvent(params: {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}): Promise<string | null> {
  try {
    const { data, error } = await supabase.rpc('log_audit_event', {
      p_user_id: params.userId || null,
      p_action: params.action,
      p_resource: params.resource,
      p_resource_id: params.resourceId || null,
      p_old_value: params.oldValue || null,
      p_new_value: params.newValue || null,
      p_ip_address: params.ipAddress || null,
      p_user_agent: params.userAgent || navigator?.userAgent || null,
    });
    if (error) return null;
    return data as string;
  } catch {
    return null;
  }
}

/**
 * Fetch audit log entries (admin or own entries).
 */
export async function fetchAuditLog(options?: {
  userId?: string;
  resource?: string;
  limit?: number;
  offset?: number;
}): Promise<AuditEntry[]> {
  try {
    let query = supabase
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(options?.limit || 50);

    if (options?.userId) query = query.eq('user_id', options.userId);
    if (options?.resource) query = query.eq('resource', options.resource);
    if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 50) - 1);

    const { data, error } = await query;
    if (error || !data) return [];
    return data as AuditEntry[];
  } catch {
    return [];
  }
}
