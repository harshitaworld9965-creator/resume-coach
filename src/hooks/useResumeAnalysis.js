import { useState } from "react"

const SYSTEM_PROMPT = `You are an expert resume coach and hiring manager with 15 years of experience across tech companies.

When given a job description and a resume, you analyze the fit and return ONLY a valid JSON object — no explanation, no markdown, no backticks. Just the raw JSON.

The JSON must follow this exact shape:
{
  "fitScore": 74,
  "summary": "A 2-3 sentence honest summary of overall fit.",
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "rewriteSuggestions": [
    {
      "section": "Work Experience",
      "issue": "What's wrong or weak",
      "suggestion": "Specific rewrite or improvement"
    }
  ],
  "verdict": "strong" | "moderate" | "weak"
}`

export function useResumeAnalysis() {
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function analyze(jobDescription, resumeText) {
    setFeedback(null)
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT
            },
            {
              role: "user",
              content: `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resumeText}`
            }
          ]
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData?.error?.message || "API request failed")
      }

      const data = await response.json()

      // Groq uses the exact same response shape as OpenAI
      const rawText = data.choices[0].message.content

      // Strip backticks just in case
      const cleaned = rawText.replace(/```json|```/g, "").trim()

      const parsed = JSON.parse(cleaned)
      setFeedback(parsed)

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return { feedback, isLoading, error, analyze }
}