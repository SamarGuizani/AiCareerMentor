"use client"

import Link from "next/link"
import { useState } from "react"

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
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">My Profile</h1>
          <ProfileForm profile={profile} onUpdate={setProfile} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
