"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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

function CareerCard({ phase, index }) {
  const colors = [
    { bg: "from-blue-500 to-blue-600", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
    { bg: "from-purple-500 to-purple-600", text: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
    { bg: "from-green-500 to-green-600", text: "text-green-600", badge: "bg-green-100 text-green-700" },
    { bg: "from-orange-500 to-orange-600", text: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
  ]
  const color = colors[index % colors.length]
  const icons = ["📚", "💻", "📈", "💼"]

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className={`w-20 h-20 bg-gradient-to-br ${color.bg} rounded-xl flex items-center justify-center text-3xl shadow-md`}>
            {icons[index] || "📋"}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Phase {index + 1}: {phase.title || phase.phase || `Phase ${index + 1}`}
            </h3>
            <span className={`text-sm font-semibold ${color.badge} px-4 py-1.5 rounded-full border`}>
              {phase.duration || "Ongoing"}
            </span>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              Skills to Learn:
            </h4>
            <div className="flex flex-wrap gap-2">
              {(phase.skills || []).map((skill, idx) => (
                <span key={idx} className={`${color.badge} px-3 py-1.5 rounded-lg text-sm font-medium border`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">📚</span>
              Recommended Resources:
            </h4>
            <ul className="space-y-2">
              {(phase.resources || []).map((resource, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>

          {phase.actionable_steps && phase.actionable_steps.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">🚀</span>
                Action Steps:
              </h4>
              <ul className="space-y-2">
                {phase.actionable_steps.map((step, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className={`${color.text} mr-2 mt-1 font-bold`}>→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
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

export default function CareerPathPage() {
  const router = useRouter()
  const [careerPath, setCareerPath] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCareerPath = async () => {
      try {
        setLoading(true)
        setError(null)

        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Fetch career path - API will generate it automatically if it doesn't exist
        const response = await fetch("/api/career-path", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          if (response.status === 404) {
            setError(errorData.error || "No career path found. Please complete the quiz first.")
            return
          }
          if (response.status === 401) {
            router.push("/auth/login")
            return
          }
          throw new Error(errorData.error || "Failed to fetch career path")
        }

        const data = await response.json()
        console.log("[v0] Career path loaded:", data)
        
        // Validate that we have all required phases
        if (data && data.phase_1 && data.phase_2 && data.phase_3 && data.phase_4) {
          setCareerPath(data)
        } else {
          throw new Error("Invalid career path data received")
        }
      } catch (err) {
        console.error("[v0] Error loading career path:", err)
        setError(err instanceof Error ? err.message : "Failed to load career path")
      } finally {
        setLoading(false)
      }
    }

    loadCareerPath()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-700 text-xl font-semibold">Generating your personalized career path with AI...</p>
          <p className="mt-3 text-gray-500 text-sm">Analyzing your quiz answers and creating a custom roadmap</p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Path</h1>
            <p className="text-xl text-red-600 mb-8">{error}</p>
            <Link
              href="/quiz"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Take the Quiz →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!careerPath) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No career path data available</p>
        </div>
      </div>
    )
  }

  const roadmap = [careerPath.phase_1, careerPath.phase_2, careerPath.phase_3, careerPath.phase_4].filter(Boolean)
  
  if (roadmap.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Path</h1>
            <p className="text-xl text-red-600 mb-8">Invalid career path data. Please try again.</p>
            <Link
              href="/quiz"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Retake Quiz →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ AI Generated
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Career Path</h1>
            <p className="text-gray-600 text-lg">This path was generated by AI based on your unique quiz answers and preferences</p>
          </div>

          <div className="space-y-6">
            {roadmap.map((phase, index) => (
              <CareerCard key={index} phase={phase} index={index} />
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-6">Track your progress and update your profile</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/profile"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block shadow-lg hover:shadow-xl"
              >
                Go to Profile →
              </Link>
              <Link
                href="/quiz"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
              >
                Retake Quiz
              </Link>
              <button
                onClick={async () => {
                  setLoading(true)
                  setCareerPath(null)
                  setError(null)
                  
                  try {
                    const response = await fetch("/api/career-path", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })

                    if (!response.ok) {
                      const errorData = await response.json().catch(() => ({}))
                      throw new Error(errorData.error || "Failed to regenerate career path")
                    }

                    const data = await response.json()
                    if (data && data.phase_1 && data.phase_2 && data.phase_3 && data.phase_4) {
                      setCareerPath(data)
                    } else {
                      throw new Error("Invalid career path data received")
                    }
                  } catch (err) {
                    console.error("[v0] Error regenerating career path:", err)
                    setError(err instanceof Error ? err.message : "Failed to regenerate career path")
                  } finally {
                    setLoading(false)
                  }
                }}
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-block"
              >
                🔄 Regenerate Path
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
