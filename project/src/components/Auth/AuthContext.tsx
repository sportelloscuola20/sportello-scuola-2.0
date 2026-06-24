import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { sendAdminNotification } from '../../lib/emailService';
const CREATOR_EMAIL = import.meta.env.VITE_CREATOR_EMAIL || 'sportelloscuola2.0@gmail.com';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  ruolo: 'docente' | 'ata' | 'aspirante';
  is_premium: boolean;
  is_admin: boolean;
  onboarded?: boolean;
  preferences?: Record<string, unknown>;
  notification_targets?: Record<string, unknown>;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null; needsEmailConfirmation?: boolean }>;
  signup: (email: string, password: string, firstName: string, lastName: string, ruolo: UserProfile['ruolo']) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem('ss2_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistUser(p: UserProfile) {
  localStorage.setItem('ss2_user', JSON.stringify(p));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(getStoredUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('ss2_user');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (!session?.user) return;

        const existing = getStoredUser();
        if (existing && existing.id === session.user.id) {
          setUser(existing);
          return;
        }

        const email = session.user.email || '';
        const full_name = session.user.user_metadata?.full_name as string | undefined;

        const { data: profile } = await supabase
          .from('profiles')
          .select('id, email, full_name, ruolo, is_premium')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            full_name: profile.full_name || full_name || null,
            ruolo: profile.ruolo,
            is_premium: profile.is_premium,
            is_admin: profile.email === CREATOR_EMAIL,
          });
          return;
        }

        const newProfile: UserProfile = {
          id: session.user.id,
          email,
          full_name: full_name || null,
          ruolo: (session.user.user_metadata?.ruolo as UserProfile['ruolo']) || 'aspirante',
          is_premium: false,
          is_admin: email === CREATOR_EMAIL,
        };
        setUser(newProfile);
        persistUser(newProfile);

        await supabase.from('profiles').insert({
          id: session.user.id,
          email,
          full_name: full_name || null,
          ruolo: newProfile.ruolo,
          is_premium: false,
        }).maybeSingle();

        if (full_name) {
          sendAdminNotification({
            uuid: session.user.id,
            fullName: full_name,
            email,
            ruolo: newProfile.ruolo,
          }).catch(() => {});
        }
      }
    });
    return () => subscription?.unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, full_name, ruolo, is_premium')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      const updated: UserProfile = {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        ruolo: profile.ruolo,
        is_premium: profile.is_premium,
        is_admin: profile.email === CREATOR_EMAIL,
      };
      setUser(updated);
      persistUser(updated);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };

      if (!data.user?.email_confirmed_at) {
        return { error: 'Email non ancora verificata. Controlla la tua casella di posta e clicca sul link di conferma.' };
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, email, full_name, ruolo, is_premium')
          .eq('id', data.user.id)
          .single();

        const userEmail = data.user.email || email;
        const p: UserProfile = {
          id: data.user.id,
          email: userEmail,
          full_name: profile?.full_name || data.user.user_metadata?.full_name || null,
          ruolo: profile?.ruolo || data.user.user_metadata?.ruolo || 'aspirante',
          is_premium: profile?.is_premium || false,
          is_admin: userEmail === CREATOR_EMAIL,
        };
        setUser(p);
        persistUser(p);
      }
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Errore di connessione' };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, firstName: string, lastName: string, ruolo: UserProfile['ruolo']) => {
    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, ruolo, is_premium: false },
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Errore di connessione' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('ss2_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
