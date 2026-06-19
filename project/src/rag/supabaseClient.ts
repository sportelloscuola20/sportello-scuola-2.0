import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabaseClientInstance: any;

try {
  if (supabaseUrl && supabaseUrl.startsWith('http') && !supabaseUrl.includes('your_supabase_url_here')) {
    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn("Supabase is not configured or URL is invalid. Initializing mock client.");
    supabaseClientInstance = createMockSupabase();
  }
} catch (e) {
  console.error("Failed to initialize Supabase client:", e);
  supabaseClientInstance = createMockSupabase();
}

function createMockSupabase() {
  const mockDb: any = {
    select: () => mockDb,
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    order: () => mockDb,
    range: () => Promise.resolve({ data: [], error: null }),
    eq: () => mockDb,
    ilike: () => mockDb,
  };

  return {
    from: () => mockDb,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
}

export const supabase = supabaseClientInstance;