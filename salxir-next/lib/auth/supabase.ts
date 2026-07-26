import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Browser Supabase client for customer authentication and profiles. Points at
 * the dedicated "Salxir Global" Supabase project (accounts live separately from
 * the read-only catalog). Override with NEXT_PUBLIC_AUTH_SUPABASE_* if needed.
 * The anon key below is a public client key (safe to ship, protected by RLS).
 *
 * Requires (in that project's Supabase dashboard, one-time):
 *   • Auth → URL configuration: Site URL https://salxir.com and add
 *     https://salxir.com/** to the redirect allow-list
 *   • Auth → Providers: Email is on by default; enable Google/Facebook to use
 *     the social buttons
 */
const AUTH_URL = 'https://cvjqbufogzsnncihjoki.supabase.co';
const AUTH_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2anFidWZvZ3pzbm5jaWhqb2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NTA4MzQsImV4cCI6MjA5OTMyNjgzNH0.3-VjjLfSDjKYahP91zvGQupMGIQdt91kjGRpFbvIx_M';

const url = process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL ?? AUTH_URL;
const key = process.env.NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY ?? AUTH_ANON_KEY;

/**
 * Per-provider toggles for the social sign-in buttons. Only enable a provider
 * here once its OAuth app is created AND enabled in the Supabase project
 * (Auth → Providers). A button for a provider that isn't configured in Supabase
 * will error, so keep these in sync with the dashboard.
 */
export const OAUTH_PROVIDERS = {
  // Google is configured but its Client Secret still needs to be saved in
  // Supabase (Auth → Providers → Google). Flip to true once that's done.
  google: false,
  facebook: false,
} as const;

/** True when at least one social provider is enabled. */
export const OAUTH_ANY_ENABLED = OAUTH_PROVIDERS.google || OAUTH_PROVIDERS.facebook;

let client: SupabaseClient | null = null;

export function supabaseBrowser(): SupabaseClient {
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}
