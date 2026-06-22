import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../../lib/supabaseClient';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  ruolo: 'docente' | 'ata' | 'aspirante';
  is_premium: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, fullName: string, ruolo: UserProfile['ruolo']) => Promise<{ error: string | null }>;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(getStoredUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || null,
          ruolo: session.user.user_metadata?.ruolo || 'aspirante',
          is_premium: session.user.user_metadata?.is_premium || false,
        });
      } else {
        setUser(null);
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
      };
      setUser(updated);
      localStorage.setItem('ss2_user', JSON.stringify(updated));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return { error: error.message };
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, email, full_name, ruolo, is_premium')
        .eq('id', data.user.id)
        .single();

      const p: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        full_name: profile?.full_name || data.user.user_metadata?.full_name || null,
        ruolo: profile?.ruolo || data.user.user_metadata?.ruolo || 'aspirante',
        is_premium: profile?.is_premium || false,
      };
      setUser(p);
      localStorage.setItem('ss2_user', JSON.stringify(p));
    }
    return { error: null };
  }, []);

  const signup = useCallback(async (email: string, password: string, fullName: string, ruolo: UserProfile['ruolo']) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, ruolo, is_premium: false },
      },
    });
    setLoading(false);
    if (error) return { error: error.message };
    if (data.user) {
      const profile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        full_name: fullName,
        ruolo,
        is_premium: false,
      };
      setUser(profile);
      localStorage.setItem('ss2_user', JSON.stringify(profile));

      await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email || email,
        full_name: fullName,
        ruolo,
        is_premium: false,
      }).maybeSingle();
    }
    return { error: null };
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
