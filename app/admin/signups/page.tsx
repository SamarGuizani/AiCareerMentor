"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Signup {
  email: string
  created_at: string
  email_confirmed_at: string | null
  quiz_response: any
}

export default function SignupsPage() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSignups = async () => {
      try {
        const res = await fetch("/api/admin/signups")
        const data = await res.json()
        setSignups(data)
      } catch (error) {
        console.error("Failed to fetch signups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSignups()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>User Signups Dashboard</CardTitle>
          <CardDescription>View all registered users and their quiz responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Signup Date</th>
                  <th className="text-left p-3">Email Confirmed</th>
                  <th className="text-left p-3">Quiz Completed</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{signup.email}</td>
                    <td className="p-3">{new Date(signup.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      {signup.email_confirmed_at ? (
                        <span className="text-green-600">✓ Confirmed</span>
                      ) : (
                        <span className="text-red-600">✗ Pending</span>
                      )}
                    </td>
                    <td className="p-3">
                      {signup.quiz_response ? (
                        <span className="text-green-600">✓ Yes</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {signups.length === 0 && <p className="text-center text-gray-500 py-6">No signups yet</p>}
        </CardContent>
      </Card>
    </div>
  )
}
