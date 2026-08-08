function ScoreBadge({ score, verdict }) {
  const color =
    verdict === "strong"
      ? "text-emerald-400 border-emerald-500 bg-emerald-950"
      : verdict === "moderate"
      ? "text-yellow-400 border-yellow-500 bg-yellow-950"
      : "text-red-400 border-red-500 bg-red-950"

  return (
    <div className={`flex items-center gap-4 border rounded-2xl px-6 py-5 ${color}`}>
      <span className="text-5xl font-black">{score}%</span>
      <div>
        <p className="text-xs uppercase tracking-widest font-semibold opacity-70">
          Fit Score
        </p>
        <p className="text-lg font-bold capitalize">{verdict} Match</p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs uppercase tracking-widest font-semibold text-gray-400">
        {title}
      </h3>
      {children}
    </div>
  )
}

function SkillTag({ label, type }) {
  const style =
    type === "match"
      ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
      : "bg-red-950 text-red-300 border border-red-700"

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${style}`}>
      {label}
    </span>
  )
}

function RewriteCard({ section, issue, suggestion }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-violet-400 bg-violet-950 border border-violet-700 px-2 py-0.5 rounded-full">
          {section}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Issue
        </p>
        <p className="text-sm text-gray-300">{issue}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide">
          Suggestion
        </p>
        <p className="text-sm text-gray-100">{suggestion}</p>
      </div>
    </div>
  )
}

export function FeedbackPanel({ feedback }) {
  return (
    <div className="flex flex-col gap-7">

      {/* Score */}
      <ScoreBadge score={feedback.fitScore} verdict={feedback.verdict} />

      {/* Summary */}
      <Section title="Overall Summary">
        <p className="text-sm text-gray-300 leading-relaxed">{feedback.summary}</p>
      </Section>

      {/* Matched Skills */}
      <Section title={`Matched Skills (${feedback.matchedSkills.length})`}>
        <div className="flex flex-wrap gap-2">
          {feedback.matchedSkills.map((skill) => (
            <SkillTag key={skill} label={skill} type="match" />
          ))}
        </div>
      </Section>

      {/* Missing Skills */}
      <Section title={`Missing Skills (${feedback.missingSkills.length})`}>
        <div className="flex flex-wrap gap-2">
          {feedback.missingSkills.map((skill) => (
            <SkillTag key={skill} label={skill} type="missing" />
          ))}
        </div>
      </Section>

      {/* Rewrite Suggestions */}
      <Section title={`Rewrite Suggestions (${feedback.rewriteSuggestions.length})`}>
        <div className="flex flex-col gap-3">
          {feedback.rewriteSuggestions.map((item, i) => (
            <RewriteCard
              key={i}
              section={item.section}
              issue={item.issue}
              suggestion={item.suggestion}
            />
          ))}
        </div>
      </Section>

    </div>
  )
}