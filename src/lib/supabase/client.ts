import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client or handle it gracefully to prevent crash
    // This allows the app to boot and show demo data even if Supabase isn't configured yet
    return createBrowserClient(
      "https://placeholder.supabase.co",
      "placeholder"
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
