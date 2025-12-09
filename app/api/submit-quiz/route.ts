import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export const runtime = "nodejs"

// Helper function to call Ollama API (open-source AI)
async function callOllama(prompt: string): Promise<string> {
  const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434"
  const model = process.env.OLLAMA_MODEL || "llama3.2" // Default to llama3.2, can be changed to mistral, qwen, etc.

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
          temperature: 0.9, // slightly higher for more variety
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

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { quizAnswers, userId, userEmail } = body || {}

    if (!quizAnswers || Object.keys(quizAnswers).length === 0) {
      return NextResponse.json({ error: "Please complete the quiz first.", aiResult: "" }, { status: 400 })
    }

    // Validate that we have at least some answers
    const answerCount = Object.keys(quizAnswers).filter(key => quizAnswers[key] !== undefined && quizAnswers[key] !== null).length
    if (answerCount === 0) {
      return NextResponse.json({ error: "No valid answers provided.", aiResult: "" }, { status: 400 })
    }

    // Format quiz answers for the AI prompt
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

    const variationSeed = randomUUID()

    const systemPrompt = `Tu es un assistant AI de carrière expert en informatique et ingénierie.
Analyse les réponses du quiz de l'utilisateur et fournis des recommandations de carrière détaillées.

Format de sortie EXACT (JSON valide):
{
  "career_path": "Description claire du chemin de carrière recommandé basé sur les réponses (travail individuel, en groupe, en entreprise, freelance...)",
  "job_offers": ["Liste de 5-8 postes ou opportunités spécifiques adaptées (PFE, stages, CDI) en Tunisie et Europe"],
  "resources": ["Liste de 5-10 sites et ressources pour trouver ces opportunités (LinkedIn, GitHub Jobs, sites d'emploi tunisiens, sites européens)"]
}

Sois spécifique, pratique et adapté au marché du travail tunisien et européen.`

    const userPrompt = `Réponses du quiz de l'utilisateur:
${formattedAnswers}

Génère mes recommandations de carrière personnalisées en JSON valide basé sur ces réponses.
Pour éviter toute réponse générique, introduis des nuances liées au contexte des réponses. Utilise cette graine de variation pour personnaliser l'angle d'analyse: ${variationSeed}. Ne mentionne jamais cette graine dans la sortie.`

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`

    // Call open-source AI (Ollama or Hugging Face)
    const content = await callOllama(fullPrompt)

    // Clean and format the AI response
    let aiResult = content.trim()
    
    // Check if response is empty
    if (!aiResult || aiResult.length === 0) {
      throw new Error("AI service returned an empty response. Please try again.")
    }
    
    // Try to extract JSON if the response contains JSON
    try {
      // Look for JSON in the response (might be wrapped in markdown code blocks)
      const jsonMatch = aiResult.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || aiResult.match(/(\{[\s\S]*\})/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1])
        aiResult = JSON.stringify(parsed, null, 2)
      } else {
        // Try parsing the entire response as JSON
        const parsed = JSON.parse(aiResult)
        aiResult = JSON.stringify(parsed, null, 2)
      }
    } catch (e) {
      // If not JSON, return as formatted text
      console.log("[v0] Response is not JSON, returning as text")
      // Format the text response nicely - keep the original content
      aiResult = aiResult
    }

    if (userId) {
      try {
        // Use Supabase server client with proper authentication
        const { createClient } = await import("@/lib/supabase/server")
        const supabase = await createClient()

        const { error: dbError } = await supabase.from("quiz_results").insert([
          {
            user_id: userId,
            quiz_answers: quizAnswers,
            ai_result: aiResult,
          },
        ])

        if (dbError) {
          console.error("[v0] Database save error:", dbError)
          // Don't fail the request if DB save fails, AI result is already generated
        }
      } catch (dbError) {
        console.error("[v0] Database save error:", dbError)
        // Don't fail the request if DB save fails
      }
    }

    return NextResponse.json({ aiResult })
  } catch (err) {
    console.error("[v0] Quiz submit error:", err)
    const errorMessage = err instanceof Error ? err.message : "Server error"
    return NextResponse.json(
      {
        error: errorMessage,
        aiResult: errorMessage.includes("Open-source AI service unavailable")
          ? "Please configure Ollama or Hugging Face to generate AI recommendations. See setup instructions in the README."
          : "Unable to generate recommendations. Please try again.",
      },
      { status: 500 },
    )
  }
}
