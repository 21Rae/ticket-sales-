import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // Basic validation to catch "your_supabase_project_url" placeholders
  if (supabaseUrl.includes('your_supabase') || !supabaseUrl.startsWith('https://')) {
    console.error('SUPABASE ERROR: VITE_SUPABASE_URL is not configured correctly. Currently:', supabaseUrl);
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
