"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl text-white">🎓</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">AI Career Mentor</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/quiz" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Quiz
            </Link>
            <Link href="/career-path" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Career Path
            </Link>
            <Link href="/profile" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

function ProfileForm({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>✏️</span>
            Edit
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          ) : (
            <p className="text-gray-600">{profile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          ) : (
            <p className="text-gray-600">{profile.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          ) : (
            <p className="text-gray-600">{profile.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          ) : (
            <p className="text-gray-600">{profile.location}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2025 AI Career Mentor. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfileAndHistory = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      try {
        const [profileRes, historyRes] = await Promise.all([fetch("/api/profile"), fetch("/api/quiz/history")])

        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setProfile({
            name: profileData.full_name || profileData.name || "",
            email: profileData.email || user.email || "",
            phone: profileData.phone || "",
            location: profileData.location || "",
          })
        }

        if (historyRes.ok) {
          const historyData = await historyRes.json()
          setHistory(historyData.history || [])
        } else {
          setHistory([])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileAndHistory()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold">Unable to load profile</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">My Profile</h1>
          <div className="space-y-8">
            <ProfileForm profile={profile} onUpdate={setProfile} />

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Quiz History</h2>
                <span className="text-sm text-gray-500">Latest first</span>
              </div>

              {history.length === 0 ? (
                <p className="text-gray-600">No quiz attempts yet. Complete the quiz to see your history.</p>
              ) : (
                <div className="space-y-4">
                  {history.map((entry: any) => (
                    <div key={entry.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(entry.created_at).toLocaleString()}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">AI result</span>
                      </div>
                      <pre className="whitespace-pre-wrap text-gray-800 text-sm overflow-x-auto">{entry.ai_result}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
