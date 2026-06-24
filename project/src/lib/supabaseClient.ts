import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xawemvuralsgwvypiufl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhd2VtdnVyYWxzZ3d2eXBpdWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODg5NDUsImV4cCI6MjA5NjA2NDk0NX0.KfJ94SAE6RStG8XH3d4h2sMcsZDwJBFGkCvafItHs_U';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient;

if (supabaseUrl && supabaseUrl.startsWith('http') && !supabaseUrl.includes('your_supabase_url_here')) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase non configurato. Inizializzazione client mock.');
  supabaseInstance = createMockSupabase() as unknown as SupabaseClient;
}

function createMockSupabase() {
  const chainable = () => chainable;
  chainable.select = () => chainable;
  chainable.insert = () => Promise.resolve({ data: null, error: null });
  chainable.update = () => Promise.resolve({ data: null, error: null });
  chainable.delete = () => Promise.resolve({ data: null, error: null });
  chainable.order = () => chainable;
  chainable.range = () => Promise.resolve({ data: [], error: null });
  chainable.eq = () => chainable;
  chainable.ilike = () => chainable;
  chainable.single = () => Promise.resolve({ data: null, error: null });
  chainable.maybeSingle = () => Promise.resolve({ data: null, error: null });
  chainable.limit = () => chainable;

  return {
    from: () => chainable,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
    rpc: () => Promise.resolve({ data: null, error: null }),
    functions: {
      invoke: () => Promise.resolve({ data: null, error: null }),
    },
  };
}

export const supabase = supabaseInstance;
