import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"

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
          temperature: 0.9, // slightly higher for variety
          num_predict: 2000,
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
    // Fallback: Try using Hugging Face Inference API as alternative open-source option
    try {
      return await callHuggingFace(prompt)
    } catch (hfError) {
      console.error("[v0] Both Ollama and Hugging Face failed:", hfError)
      throw new Error(
        "Open-source AI service unavailable. Please ensure Ollama is running (http://localhost:11434) or configure Hugging Face API key."
      )
    }
  }
}

// Fallback: Hugging Face Inference API (open-source alternative)
async function callHuggingFace(prompt: string): Promise<string> {
  const hfModel = process.env.HUGGINGFACE_MODEL || "mistralai/Mistral-7B-Instruct-v0.2"
  const hfApiKey = process.env.HUGGINGFACE_API_KEY

  if (!hfApiKey) {
    throw new Error("No open-source AI service configured. Please set up Ollama or Hugging Face API key.")
  }

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${hfModel}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hfApiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          temperature: 0.7,
          max_new_tokens: 2000,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`)
    }

    const data = await response.json()
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text
    }
    return JSON.stringify(data)
  } catch (error) {
    console.error("[v0] Hugging Face API error:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { q1, q2, q3, q4, q5 } = body

    // Prepare quiz answers for storage
    const quizAnswersData = {
      q1,
      q2,
      q3,
      q4,
      q5,
    }

    const variationSeed = randomUUID()

    const aiPrompt = `Based on these career assessment answers, generate personalized career suggestions for someone in Europe and Tunisia.

User Profile:
- Work environment preference: ${q1}
- Skill area interest: ${q2}
- Primary career goal: ${q3}
- Learning preference: ${q4}
- Responsibility level wanted: ${q5}

Please provide ONLY a structured response with these sections:

**JOBS IN EUROPE & TUNISIA:**
- List 5-7 specific job titles that match this profile, with 1-2 sentence descriptions

**PFE TOPICS (Final Project/Internship):**
- List 5-7 project ideas suitable for a final year internship, with brief descriptions

**MASTER PROGRAMS IN EUROPE & TUNISIA:**
- List 4-6 relevant master's programs with university names (Europe or Tunisia)

**DOCTORATE OPTIONS:**
- List 3-4 PhD program areas with brief descriptions

Make the response specific, practical, and actionable based on the user's answers.`

    // Call open-source AI (Ollama or Hugging Face)
    let aiResult = await callOllama(aiPrompt)
    
    // Clean and validate the response
    aiResult = aiResult.trim()
    if (!aiResult || aiResult.length === 0) {
      throw new Error("AI service returned an empty response. Please try again.")
    }

    // Save to quiz_results table with both quiz answers and AI result
    const { data: quizResultData, error: quizResultError } = await supabase
      .from("quiz_results")
      .insert({
        user_id: user.id,
        quiz_answers: quizAnswersData,
        ai_result: aiResult,
      })
      .select()
      .single()

    if (quizResultError) {
      console.error("[v0] Error saving quiz results:", quizResultError)
    }

    // Return immediate response with aiResult key
    return NextResponse.json({
      success: true,
      aiResult: aiResult,
    })
  } catch (error) {
    console.error("[v0] Error in quiz submission:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to process quiz submission"
    return NextResponse.json(
      {
        error: errorMessage,
        aiResult: errorMessage.includes("Open-source AI service unavailable")
          ? "Please configure Ollama or Hugging Face to generate AI recommendations. See setup instructions in the README."
          : "Failed to process quiz submission",
      },
      { status: 500 },
    )
  }
}
