import { createClient } from "@supabase/supabase-js"

/**
 * Creates an admin Supabase client with the SERVICE_ROLE_KEY
 * This is used for admin operations like confirming emails
 * WARNING: Never expose this to the client side
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient(supabaseUrl, serviceRoleKey)
}
