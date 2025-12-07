import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    const errorMsg = "Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    console.error("[Supabase] Missing environment variables:", {
      hasUrl: !!url,
      hasKey: !!key,
    })
    // Don't throw in browser - just log and return a client that will fail gracefully
    if (typeof window !== "undefined") {
      console.error(errorMsg)
    }
  }

  return createBrowserClient(
    url || "",
    key || "",
    {
      cookies: {
        getAll() {
          return document.cookie.split("; ").map((cookie) => {
            const [name, ...rest] = cookie.split("=")
            return { name, value: decodeURIComponent(rest.join("=")) }
          })
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            let cookieString = `${name}=${encodeURIComponent(value)}`
            if (options?.path) cookieString += `; path=${options.path}`
            if (options?.maxAge) cookieString += `; max-age=${options.maxAge}`
            if (options?.domain) cookieString += `; domain=${options.domain}`
            if (options?.sameSite) cookieString += `; samesite=${options.sameSite}`
            if (options?.secure) cookieString += `; secure`
            document.cookie = cookieString
          })
        },
      },
    }
  )
}
