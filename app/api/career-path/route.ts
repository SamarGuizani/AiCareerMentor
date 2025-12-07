import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Helper function to call Ollama API (open-source AI)
async function callOllama(prompt: string): Promise<string> {
  const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434"
  const model = process.env.OLLAMA_MODEL || "llama3.2"

  try {
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 3000,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.response || ""
  } catch (error) {
    console.error("[v0] Ollama API error:", error)
    throw error
  }
}

// Generate career path with AI
async function generateCareerPathWithAI(quizAnswers: any): Promise<any> {
  const quizQuestions = [
    "What type of work environment do you prefer?",
    "Which skill area interests you most?",
    "What is your primary career goal?",
    "How do you prefer to learn?",
    "What level of responsibility do you want?",
  ]

  const formattedAnswers = Object.entries(quizAnswers)
    .map(([key, value]) => {
      const questionIndex = Number.parseInt(key)
      const question = quizQuestions[questionIndex] || `Question ${questionIndex + 1}`
      return `${question}\nAnswer: ${value}`
    })
    .join("\n\n")

  const prompt = `Based on these quiz answers, generate a detailed 4-phase career path in JSON format.

Quiz Answers:
${formattedAnswers}

Generate a career path with exactly 4 phases. Each phase must have:
- title: Phase name (e.g., "Foundation", "Core Skills", "Advanced", "Professional")
- phase: Same as title
- duration: Time estimate (e.g., "3-6 months", "6-12 months")
- skills: Array of 5-7 specific skills to learn
- resources: Array of 5-7 learning resources (websites, courses, platforms)
- actionable_steps: Array of 3-5 specific action steps

Return ONLY valid JSON in this exact format:
{
  "phase_1": {
    "title": "Foundation",
    "phase": "Foundation",
    "duration": "3-6 months",
    "skills": ["skill1", "skill2", "skill3"],
    "resources": ["resource1", "resource2", "resource3"],
    "actionable_steps": ["step1", "step2", "step3"]
  },
  "phase_2": { ... },
  "phase_3": { ... },
  "phase_4": { ... }
}

Make it specific, practical, and tailored to the user's answers. Focus on IT/Engineering careers in Tunisia and Europe.`

  const aiResponse = await callOllama(prompt)
  let cleanedResponse = aiResponse.trim()

  // Extract JSON from response
  try {
    const jsonMatch = cleanedResponse.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || cleanedResponse.match(/(\{[\s\S]*\})/)
    if (jsonMatch) {
      cleanedResponse = jsonMatch[1]
    }
    const parsed = JSON.parse(cleanedResponse)
    
    // Ensure we have all 4 phases
    if (!parsed.phase_1 || !parsed.phase_2 || !parsed.phase_3 || !parsed.phase_4) {
      throw new Error("Invalid career path structure")
    }
    
    return parsed
  } catch (error) {
    console.error("[v0] Error parsing AI response:", error)
    // Return default structure if parsing fails
    return {
      phase_1: {
        title: "Foundation",
        phase: "Foundation",
        duration: "3-6 months",
        skills: ["Basic Programming", "Version Control", "Problem Solving"],
        resources: ["FreeCodeCamp", "MDN Web Docs", "GitHub"],
        actionable_steps: ["Learn fundamentals", "Build first project", "Join community"]
      },
      phase_2: {
        title: "Core Skills",
        phase: "Core Skills",
        duration: "6-12 months",
        skills: ["Framework Mastery", "Database Design", "API Development"],
        resources: ["Official Documentation", "Online Courses", "Practice Projects"],
        actionable_steps: ["Master a framework", "Build full-stack app", "Contribute to open source"]
      },
      phase_3: {
        title: "Advanced",
        phase: "Advanced",
        duration: "12-18 months",
        skills: ["System Design", "Cloud Services", "DevOps"],
        resources: ["AWS/Azure Certifications", "System Design Courses", "Industry Best Practices"],
        actionable_steps: ["Design scalable systems", "Deploy to cloud", "Optimize performance"]
      },
      phase_4: {
        title: "Professional",
        phase: "Professional",
        duration: "Ongoing",
        skills: ["Leadership", "Architecture", "Mentorship"],
        resources: ["Industry Conferences", "Advanced Certifications", "Continuous Learning"],
        actionable_steps: ["Lead projects", "Mentor others", "Stay updated with trends"]
      }
    }
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user's latest career path
    let { data, error } = await supabase
      .from("career_paths")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)

    if (error) {
      // If table doesn't exist, try to create it or return error
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        console.error("[v0] Table career_paths does not exist. Please run the SQL script in Supabase.")
        return NextResponse.json({ 
          error: "Database table not found. Please run the SQL setup script in Supabase SQL Editor." 
        }, { status: 500 })
      }
      throw error
    }

    // If no career path exists, generate one with AI using quiz answers
    if (!data || data.length === 0) {
      // Get user's latest quiz answers
      const { data: quizData, error: quizError } = await supabase
        .from("quiz_results")
        .select("quiz_answers")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)

      if (quizError || !quizData || quizData.length === 0) {
        return NextResponse.json({ error: "No career path found. Please complete the quiz first." }, { status: 404 })
      }

      // Generate career path with AI
      const generatedPath = await generateCareerPathWithAI(quizData[0].quiz_answers)

      // Save generated career path
      const { data: savedPath, error: saveError } = await supabase
        .from("career_paths")
        .insert({
          user_id: user.id,
          phase_1: generatedPath.phase_1,
          phase_2: generatedPath.phase_2,
          phase_3: generatedPath.phase_3,
          phase_4: generatedPath.phase_4,
        })
        .select()
        .single()

      if (saveError) {
        console.error("[v0] Error saving career path:", saveError)
        // Return the generated path even if save fails
        return NextResponse.json({
          phase_1: generatedPath.phase_1,
          phase_2: generatedPath.phase_2,
          phase_3: generatedPath.phase_3,
          phase_4: generatedPath.phase_4,
        })
      }

      return NextResponse.json(savedPath)
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("[v0] Error fetching career path:", error)
    return NextResponse.json({ error: "Failed to fetch career path" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's latest quiz answers
    const { data: quizData, error: quizError } = await supabase
      .from("quiz_results")
      .select("quiz_answers")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)

    if (quizError || !quizData || quizData.length === 0) {
      return NextResponse.json({ error: "No quiz answers found. Please complete the quiz first." }, { status: 404 })
    }

    // Generate new career path with AI
    const generatedPath = await generateCareerPathWithAI(quizData[0].quiz_answers)

    // Delete old career paths and insert new one
    await supabase.from("career_paths").delete().eq("user_id", user.id)

    // Save generated career path
    const { data: savedPath, error: saveError } = await supabase
      .from("career_paths")
      .insert({
        user_id: user.id,
        phase_1: generatedPath.phase_1,
        phase_2: generatedPath.phase_2,
        phase_3: generatedPath.phase_3,
        phase_4: generatedPath.phase_4,
      })
      .select()
      .single()

    if (saveError) {
      console.error("[v0] Error saving career path:", saveError)
      // Return the generated path even if save fails
      return NextResponse.json({
        phase_1: generatedPath.phase_1,
        phase_2: generatedPath.phase_2,
        phase_3: generatedPath.phase_3,
        phase_4: generatedPath.phase_4,
      })
    }

    return NextResponse.json(savedPath)
  } catch (error) {
    console.error("[v0] Error regenerating career path:", error)
    return NextResponse.json({ error: "Failed to regenerate career path" }, { status: 500 })
  }
}
