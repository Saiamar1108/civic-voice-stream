// Centralized Supabase client initialization
// Reads Vite env vars and exports a singleton client

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // We throw a soft error message in dev; real auth calls will also surface errors
  // This helps you notice misconfiguration early.
  // eslint-disable-next-line no-console
  console.warn("Supabase env vars missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
);


