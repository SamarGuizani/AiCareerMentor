import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  })

  try {
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
    if (usersError) throw usersError

    const { data: responses, error: responsesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
    if (responsesError) throw responsesError

    const combinedData = users.users.map((user) => ({
      email: user.email,
      created_at: user.created_at,
      email_confirmed_at: user.email_confirmed_at,
      quiz_response: responses.find((r) => r.id === user.id),
    }))

    return Response.json(combinedData)
  } catch (error) {
    console.error("Error fetching signups:", error)
    return Response.json({ error: "Failed to fetch signups" }, { status: 500 })
  }
}
