import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Browser/client Supabase client. Use in Client Components.
 * Add your Supabase URL and anon key to .env.local to connect.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
