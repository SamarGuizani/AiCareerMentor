import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/quiz"

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(new URL(next, requestUrl.origin))
      } else {
        console.error("Auth callback error:", error)
        return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin))
      }
    } catch (error) {
      console.error("Auth callback exception:", error)
      return NextResponse.redirect(new URL("/auth/login?error=Could not authenticate user", requestUrl.origin))
    }
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL("/auth/login?error=No authentication code provided", requestUrl.origin))
}

