import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseServerConfig = !!(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));

let _client: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseServiceKey) {
  _client = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
}

export function createSupabaseServerClient(accessToken?: string) {
  if (supabaseUrl && supabaseServiceKey) {
    return createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
  }

  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
      global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
    });
  }

  return null;
}

export function getSupabaseServerClient(accessToken?: string) {
  return accessToken ? createSupabaseServerClient(accessToken) : _client;
}

export const supabaseServer = _client as any;
export default _client as any;