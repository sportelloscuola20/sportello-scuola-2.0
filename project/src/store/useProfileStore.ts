import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../components/foundation/AuthContext';

interface ProfileState {
  profile: UserProfile | null;
  preferences: Record<string, unknown>;
  onboarded: boolean;
  loading: boolean;
  setProfile: (profile: UserProfile) => void;
  fetchProfile: (userId: string) => Promise<void>;
  updatePreferences: (prefs: Record<string, unknown>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  clear: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  preferences: {},
  onboarded: false,
  loading: false,

  setProfile: (profile) => set({ profile }),

  fetchProfile: async (userId) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!error && data) {
      set({
        profile: data,
        preferences: (data.preferences as Record<string, unknown>) || {},
        onboarded: data.onboarded || false,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },

  updatePreferences: async (prefs) => {
    const current = get().preferences;
    const merged = { ...current, ...prefs };
    set({ preferences: merged });

    const profile = get().profile;
    if (!profile) return;

    await supabase
      .from('profiles')
      .update({ preferences: merged, updated_at: new Date().toISOString() })
      .eq('id', profile.id);
  },

  completeOnboarding: async () => {
    const profile = get().profile;
    if (!profile) return;

    set({ onboarded: true });
    await supabase
      .from('profiles')
      .update({ onboarded: true, updated_at: new Date().toISOString() })
      .eq('id', profile.id);
  },

  clear: () => set({ profile: null, preferences: {}, onboarded: false }),
}));
