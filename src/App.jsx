import { useState, useEffect, useRef } from "react"
import { useResumeAnalysis } from "./hooks/useresumeAnalysis"
import { FeedbackPanel } from "./components/FeedbackPanel"
import { SkeletonLoader } from "./components/SkeletonLoader"
import { EmptyState } from "./components/EmptyState"
import { ResumeInput } from "./components/ResumeInput"

function App() {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const { feedback, isLoading, error, analyze } = useResumeAnalysis()

  // Ref to scroll the right panel into view on mobile when feedback arrives
  const feedbackRef = useRef(null)

  useEffect(() => {
    if (feedback && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [feedback])

  function handleAnalyze() {
    analyze(jobDescription, resumeText)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-5">
        <h1 className="text-2xl font-bold tracking-tight">
          Resume <span className="text-violet-400">Coach</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Paste a job description and your resume — get instant, actionable feedback.
        </p>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT — Inputs */}
        <section className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Job Description
            </label>
            <textarea
              className="w-full h-48 bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <ResumeInput
  value={resumeText}
  onChange={(text) => setResumeText(text)}
/>
          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || !resumeText.trim() || isLoading}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze My Resume"
            )}
          </button>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-950 border border-red-800 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

        </section>

        {/* RIGHT — Feedback */}
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