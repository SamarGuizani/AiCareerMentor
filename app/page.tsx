"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

          <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/quiz" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">
              Quiz
            </Link>
            <Link href="/career-path" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">
              Career Path
            </Link>
            <Link href="/profile" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">
              Profile
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

// Hero Component
function Hero() {
  const router = useRouter()

  const handleStartQuiz = async () => {
    const supabase = createClient()
    // Always sign out so the login/signup screen appears before the quiz
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Perfect Career Path</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Let AI guide you to a fulfilling career based on your unique skills, interests, and aspirations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartQuiz}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Start Your Career Quiz →
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Component
function Features() {
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your skills and preferences to provide personalized recommendations",
    },
    {
      icon: "🎯",
      title: "Career Roadmap",
      description: "Get a detailed step-by-step plan to achieve your career goals with milestones and resources",
    },
    {
      icon: "👥",
      title: "Expert Guidance",
      description: "Access insights from industry professionals and career mentors to make informed decisions",
    },
    {
      icon: "📈",
      title: "Growth Tracking",
      description: "Monitor your progress and adjust your career path as you develop new skills and interests",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AI Career Mentor?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to unlock your career potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Take Quiz
                </Link>
              </li>
              <li>
                <Link href="/career-path" className="hover:text-white transition-colors">
                  Career Paths
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@aicareermentor.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AI Career Mentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
