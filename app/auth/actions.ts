"use server"

export async function autoConfirmUser(email: string) {
  // Email confirmation is handled by Supabase automatically
  // No need for server-side confirmation in this setup
  return { success: true }
}
