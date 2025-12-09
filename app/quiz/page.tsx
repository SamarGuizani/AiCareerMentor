"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/icon-dark-32x32.png" alt="AI Career Mentor" width={40} height={40} className="rounded-lg" />
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

function QuizQuestion({ question, selectedAnswer, onAnswer }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h3>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onAnswer(option)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedAnswer === option
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-400"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selectedAnswer === option ? "border-blue-600 bg-blue-600" : "border-gray-300"
                }`}
              >
                {selectedAnswer === option && <span className="text-white">✓</span>}
              </div>
              <span className="text-lg text-gray-900">{option}</span>
            </div>
          </div>
        ))}
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

export default function QuizPage() {
  const quizData = [
    {
      question: "What type of work environment do you prefer?",
      options: ["Fast-paced startup", "Structured corporate", "Remote and flexible", "Collaborative team"],
    },
    {
      question: "Which skill area interests you most?",
      options: ["Problem-solving", "Communication", "Technical expertise", "Leadership"],
    },
    {
      question: "What is your primary career goal?",
      options: ["Higher salary", "Work-life balance", "Career advancement", "Creative fulfillment"],
    },
    {
      question: "How do you prefer to learn?",
      options: ["Hands-on experience", "Formal education", "Self-study", "Mentorship"],
    },
    {
      question: "What level of responsibility do you want?",
      options: ["Individual contributor", "Team lead", "Manager", "Executive level"],
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
      }
    }

    checkAuth()
  }, [router])

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    })
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleComplete = async () => {
    // Validate that all questions are answered
    const allQuestionsAnswered = quizData.every((_, index) => answers[index] !== undefined && answers[index] !== null)
    
    if (!allQuestionsAnswered) {
      setError("Please answer all questions before completing the quiz.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizAnswers: answers,
          userId: user?.id || null,
          userEmail: user?.email || null,
        }),
      })

      const data = await response.json()
      console.log("[v0] Quiz response:", data)

      if (!response.ok) {
        setError(data?.error || data?.aiResult || "Failed to generate recommendations")
        return
      }

      if (data.aiResult) {
        sessionStorage.setItem("aiResult", data.aiResult)
      }

      setShowResults(true)
    } catch (err) {
      console.error("[v0] Error in quiz submission:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Your AI Career Recommendations</h1>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Generating your personalized recommendations...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <p className="text-red-700 font-semibold">Error</p>
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-8">
                <div className="prose max-w-none">
                  {sessionStorage.getItem("aiResult") && (
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {sessionStorage.getItem("aiResult")}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Link
                    href="/career-path"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Career Path →
                  </Link>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("aiResult")
                      setShowResults(false)
                      setAnswers({})
                      setCurrentQuestion(0)
                    }}
                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Career Quiz</h1>
              <span className="text-lg font-semibold text-blue-600">
                {currentQuestion + 1} / {quizData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <QuizQuestion
            question={quizData[currentQuestion]}
            selectedAnswer={answers[currentQuestion]}
            onAnswer={handleAnswer}
          />

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-700 font-semibold">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex-1"></div>
            {currentQuestion === quizData.length - 1 ? (
              <button
                onClick={handleComplete}
                disabled={isLoading || !answers[currentQuestion]}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Generating AI Response..." : "Complete Quiz"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
