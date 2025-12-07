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
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
            {["📚", "💻", "📈", "💼"][index]}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-gray-900">
              Phase {index + 1}: {phase.title || phase.phase}
            </h3>
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
              {phase.duration}
            </span>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Skills to Learn:</h4>
            <div className="flex flex-wrap gap-2">
              {(phase.skills || []).map((skill, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Recommended Resources:</h4>
            <ul className="space-y-1">
              {(phase.resources || []).map((resource, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>

          {phase.actionable_steps && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Action Steps:</h4>
              <ul className="space-y-1">
                {phase.actionable_steps.map((step, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-blue-500 mr-2">→</span>
                    {step}
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
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        const response = await fetch("/api/career-path")
        if (!response.ok) {
          if (response.status === 404) {
            setError("No career path found. Please complete the quiz first.")
            return
          }
          throw new Error("Failed to fetch career path")
        }

        const data = await response.json()
        console.log("[v0] Career path loaded:", data)
        setCareerPath(data)
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg font-semibold">Generating your personalized career path with AI...</p>
          <p className="mt-2 text-gray-500 text-sm">This may take a few moments</p>
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

  if (!careerPath) return null

  const roadmap = [careerPath.phase_1, careerPath.phase_2, careerPath.phase_3, careerPath.phase_4]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Career Path</h1>
            <p className="text-gray-600">This path was generated based on your unique answers and preferences</p>
          </div>

          <div className="space-y-6">
            {roadmap.map((phase, index) => (
              <CareerCard key={index} phase={phase} index={index} />
            ))}
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-6">Track your progress and update your profile</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/profile"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                Go to Profile →
              </Link>
              <Link
                href="/quiz"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
              >
                Retake Quiz
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
