"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const ADMIN_EMAIL = "admin@aimentor.com" // Set your admin email here

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        // Simple admin check - replace with proper role-based access in production
        if (user.email !== ADMIN_EMAIL) {
          router.push("/")
          return
        }

        setUser(user)

        // Fetch all quiz submissions
        const { data, error } = await supabase
          .from("quiz_answers")
          .select(
            `
            *,
            profiles (full_name, email),
            career_paths (phase_1, phase_2, phase_3, phase_4)
          `,
          )
          .order("created_at", { ascending: false })

        if (error) throw error
        setSubmissions(data || [])
      } catch (err) {
        console.error("[v0] Admin error:", err)
        setError(err instanceof Error ? err.message : "Access denied")
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium">
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 text-red-700">{error}</div>}

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Quiz Submissions ({submissions.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Q1 Answer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Q2 Answer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {submission.profiles?.full_name || submission.user_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{submission.q1_answer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{submission.q2_answer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {submissions.length === 0 && <div className="px-6 py-12 text-center text-gray-600">No submissions yet</div>}
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
