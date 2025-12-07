module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/aicareermentor/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/aicareermentor/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/aicareermentor/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/aicareermentor/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hqxbvyqyzudkpglcwqjw.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeGJ2eXF5enVka3BnbGN3cWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzQxMjQsImV4cCI6MjA3OTkxMDEyNH0.JnXYijg3gHkH5qF-mTuNEtaQ5zzteNteOl2S5tL_AzU"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The "setAll" method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/Downloads/aicareermentor/app/api/career-path/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/aicareermentor/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/aicareermentor/node_modules/next/server.js [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
// Helper function to call Ollama API (open-source AI)
async function callOllama(prompt) {
    const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL || "llama3.2";
    try {
        const response = await fetch(`${ollamaUrl}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    num_predict: 3000
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.response || "";
    } catch (error) {
        console.error("[v0] Ollama API error:", error);
        throw error;
    }
}
// Generate career path with AI
async function generateCareerPathWithAI(quizAnswers) {
    const quizQuestions = [
        "What type of work environment do you prefer?",
        "Which skill area interests you most?",
        "What is your primary career goal?",
        "How do you prefer to learn?",
        "What level of responsibility do you want?"
    ];
    const formattedAnswers = Object.entries(quizAnswers).map(([key, value])=>{
        const questionIndex = Number.parseInt(key);
        const question = quizQuestions[questionIndex] || `Question ${questionIndex + 1}`;
        return `${question}\nAnswer: ${value}`;
    }).join("\n\n");
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

Make it specific, practical, and tailored to the user's answers. Focus on IT/Engineering careers in Tunisia and Europe.`;
    const aiResponse = await callOllama(prompt);
    let cleanedResponse = aiResponse.trim();
    // Extract JSON from response
    try {
        const jsonMatch = cleanedResponse.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || cleanedResponse.match(/(\{[\s\S]*\})/);
        if (jsonMatch) {
            cleanedResponse = jsonMatch[1];
        }
        const parsed = JSON.parse(cleanedResponse);
        // Ensure we have all 4 phases
        if (!parsed.phase_1 || !parsed.phase_2 || !parsed.phase_3 || !parsed.phase_4) {
            throw new Error("Invalid career path structure");
        }
        return parsed;
    } catch (error) {
        console.error("[v0] Error parsing AI response:", error);
        // Return default structure if parsing fails
        return {
            phase_1: {
                title: "Foundation",
                phase: "Foundation",
                duration: "3-6 months",
                skills: [
                    "Basic Programming",
                    "Version Control",
                    "Problem Solving"
                ],
                resources: [
                    "FreeCodeCamp",
                    "MDN Web Docs",
                    "GitHub"
                ],
                actionable_steps: [
                    "Learn fundamentals",
                    "Build first project",
                    "Join community"
                ]
            },
            phase_2: {
                title: "Core Skills",
                phase: "Core Skills",
                duration: "6-12 months",
                skills: [
                    "Framework Mastery",
                    "Database Design",
                    "API Development"
                ],
                resources: [
                    "Official Documentation",
                    "Online Courses",
                    "Practice Projects"
                ],
                actionable_steps: [
                    "Master a framework",
                    "Build full-stack app",
                    "Contribute to open source"
                ]
            },
            phase_3: {
                title: "Advanced",
                phase: "Advanced",
                duration: "12-18 months",
                skills: [
                    "System Design",
                    "Cloud Services",
                    "DevOps"
                ],
                resources: [
                    "AWS/Azure Certifications",
                    "System Design Courses",
                    "Industry Best Practices"
                ],
                actionable_steps: [
                    "Design scalable systems",
                    "Deploy to cloud",
                    "Optimize performance"
                ]
            },
            phase_4: {
                title: "Professional",
                phase: "Professional",
                duration: "Ongoing",
                skills: [
                    "Leadership",
                    "Architecture",
                    "Mentorship"
                ],
                resources: [
                    "Industry Conferences",
                    "Advanced Certifications",
                    "Continuous Learning"
                ],
                actionable_steps: [
                    "Lead projects",
                    "Mentor others",
                    "Stay updated with trends"
                ]
            }
        };
    }
}
async function GET() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        // Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        // Fetch user's latest career path
        let { data, error } = await supabase.from("career_paths").select("*").eq("user_id", user.id).order("created_at", {
            ascending: false
        }).limit(1);
        if (error) throw error;
        // If no career path exists, generate one with AI using quiz answers
        if (!data || data.length === 0) {
            // Get user's latest quiz answers
            const { data: quizData, error: quizError } = await supabase.from("quiz_results").select("quiz_answers").eq("user_id", user.id).order("created_at", {
                ascending: false
            }).limit(1);
            if (quizError || !quizData || quizData.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "No career path found. Please complete the quiz first."
                }, {
                    status: 404
                });
            }
            // Generate career path with AI
            const generatedPath = await generateCareerPathWithAI(quizData[0].quiz_answers);
            // Save generated career path
            const { data: savedPath, error: saveError } = await supabase.from("career_paths").insert({
                user_id: user.id,
                phase_1: generatedPath.phase_1,
                phase_2: generatedPath.phase_2,
                phase_3: generatedPath.phase_3,
                phase_4: generatedPath.phase_4
            }).select().single();
            if (saveError) {
                console.error("[v0] Error saving career path:", saveError);
                // Return the generated path even if save fails
                return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    phase_1: generatedPath.phase_1,
                    phase_2: generatedPath.phase_2,
                    phase_3: generatedPath.phase_3,
                    phase_4: generatedPath.phase_4
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(savedPath);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data[0]);
    } catch (error) {
        console.error("[v0] Error fetching career path:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$aicareermentor$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch career path"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d29976cf._.js.map