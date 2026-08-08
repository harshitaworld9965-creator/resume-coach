import { useState, useEffect, useRef } from "react"
import { useResumeAnalysis } from "./hooks/useResumeAnalysis"
import { FeedbackPanel } from "./components/FeedbackPanel"
import { SkeletonLoader } from "./components/SkeletonLoader"
import { EmptyState } from "./components/EmptyState"
import { ResumeInput } from "./components/ResumeInput"

function App() {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const { feedback, isLoading, error, analyze } = useResumeAnalysis()
  const feedbackRef = useRef(null)

  useEffect(() => {
    if (feedback && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [feedback])

  function handleAnalyze() {
    analyze(jobDescription, resumeText)
  }

  const canAnalyze = jobDescription.trim() && resumeText.trim() && !isLoading

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f5f5f7" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #2a2a35" }} className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #6e6eff, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16
            }}>
              ✦
            </div>
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>
              Resume Coach
            </span>
          </div>
          <span style={{ fontSize: 12, color: "#6b6b80", letterSpacing: "0.05em" }}>
            POWERED BY AI
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
          color: "#6e6eff", textTransform: "uppercase", marginBottom: 12
        }}>
          AI Resume Analysis
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#f5f5f7",
          maxWidth: 600,
          marginBottom: 8
        }}>
          Know exactly how well<br />
          <span style={{ color: "#6e6eff", fontWeight: 500 }}>your resume fits</span> the role.
        </h2>
        <p style={{ fontSize: 15, color: "#6b6b80", fontWeight: 400, lineHeight: 1.6 }}>
          Paste a job description and upload your resume — get a fit score,<br />
          skill gap analysis, and rewrite suggestions in seconds.
        </p>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT */}
        <section className="flex flex-col gap-5">

          {/* JD Input */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: 12, fontWeight: 500, color: "#6b6b80", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Job Description
            </label>
            <textarea
              style={{
                width: "100%", height: 192,
                background: "#1c1c22",
                border: "1px solid #2a2a35",
                borderRadius: 14,
                padding: "16px",
                fontSize: 14,
                color: "#f5f5f7",
                resize: "none",
                outline: "none",
                lineHeight: 1.6,
                transition: "border-color 0.2s",
                fontFamily: "inherit",
              }}
              onFocus={e => e.target.style.borderColor = "#6e6eff"}
              onBlur={e => e.target.style.borderColor = "#2a2a35"}
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Resume Input */}
          <ResumeInput value={resumeText} onChange={(t) => setResumeText(t)} />

          {/* Button */}
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              background: canAnalyze
                ? "linear-gradient(135deg, #6e6eff, #a78bfa)"
                : "#1c1c22",
              color: canAnalyze ? "#fff" : "#3a3a4a",
              border: canAnalyze ? "none" : "1px solid #2a2a35",
              cursor: canAnalyze ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: "inherit",
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin" style={{ width: 16, height: 16 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Analyzing your resume…
              </>
            ) : (
              "Analyze My Resume →"
            )}
          </button>

          {error && (
            <div style={{
              background: "#1a0f0f", border: "1px solid #3a1a1a",
              borderRadius: 12, padding: "12px 16px",
              fontSize: 13, color: "#ff453a"
            }}>
              {error}
            </div>
          )}

        </section>

        {/* RIGHT */}
        <section ref={feedbackRef}>
          {isLoading ? (
            <SkeletonLoader />
          ) : feedback ? (
            <FeedbackPanel feedback={feedback} />
          ) : (
            <EmptyState />
          )}
        </section>

      </main>
    </div>
  )
}

export default App