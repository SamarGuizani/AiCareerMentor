import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("quiz_results")
      .select("id, ai_result, quiz_answers, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ history: data || [] })
  } catch (error) {
    console.error("[v0] Error fetching quiz history:", error)
    return NextResponse.json({ error: "Failed to fetch quiz history" }, { status: 500 })
  }
}

