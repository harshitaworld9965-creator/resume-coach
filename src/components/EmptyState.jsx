export function EmptyState() {
  return (
    <div className="h-full min-h-96 flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-4 max-w-xs">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center text-3xl">
          📋
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-200 font-semibold">No analysis yet</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Paste a job description and your resume on the left, then click Analyze.
          </p>
        </div>

        {/* Steps hint */}
        <div className="flex flex-col gap-2 w-full mt-2">
          {["Paste the job description", "Paste your resume", "Click Analyze"].map(
            (step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3"
              >
                <span className="w-5 h-5 rounded-full bg-violet-900 border border-violet-600 text-violet-300 text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-400">{step}</p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  )
}