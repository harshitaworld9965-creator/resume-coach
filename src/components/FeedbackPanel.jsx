import { useEffect, useRef } from "react"

function ScoreRing({ score, verdict }) {
  const canvasRef = useRef(null)
  const color = verdict === "strong" ? "#30d158" : verdict === "moderate" ? "#ffd60a" : "#ff453a"
  const label = verdict === "strong" ? "Strong Match" : verdict === "moderate" ? "Moderate Match" : "Weak Match"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const cx = 90, cy = 90, r = 70
    const start = -Math.PI / 2
    const end = start + (2 * Math.PI * score) / 100

    ctx.clearRect(0, 0, 180, 180)

    // Track
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, 2 * Math.PI)
    ctx.strokeStyle = "#2a2a35"
    ctx.lineWidth = 10
    ctx.stroke()

    // Arc
    ctx.beginPath()
    ctx.arc(cx, cy, r, start, end)
    ctx.strokeStyle = color
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.stroke()
  }, [score, color])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24,
      background: "#1c1c22", border: "1px solid #2a2a35",
      borderRadius: 18, padding: "24px 28px"
    }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <canvas ref={canvasRef} width={180} height={180} style={{ width: 90, height: 90 }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column"
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color }}>{score}</span>
          <span style={{ fontSize: 9, color: "#6b6b80", letterSpacing: "0.08em" }}>/ 100</span>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
          Fit Score
        </p>
        <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color, marginBottom: 6 }}>
          {label}
        </p>
        <div style={{
          display: "inline-block",
          fontSize: 11, fontWeight: 500,
          padding: "3px 10px", borderRadius: 999,
          background: color + "22", color, border: `1px solid ${color}44`
        }}>
          {score}% match
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 500,
      letterSpacing: "0.1em", textTransform: "uppercase",
      color: "#6b6b80", marginBottom: 10
    }}>
      {children}
    </p>
  )
}

function Chip({ label, type }) {
  const color = type === "match" ? "#30d158" : "#ff453a"
  return (
    <span style={{
      fontSize: 12, fontWeight: 500,
      padding: "5px 12px", borderRadius: 999,
      background: color + "15",
      color: color,
      border: `1px solid ${color}30`
    }}>
      {label}
    </span>
  )
}

function RewriteCard({ section, issue, suggestion }) {
  return (
    <div style={{
      background: "#1c1c22", border: "1px solid #2a2a35",
      borderRadius: 14, padding: "18px", display: "flex", flexDirection: "column", gap: 12
    }}>
      <span style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
        color: "#6e6eff", textTransform: "uppercase",
        background: "#6e6eff18", border: "1px solid #6e6eff30",
        padding: "3px 10px", borderRadius: 999,
        alignSelf: "flex-start"
      }}>
        {section}
      </span>
      <div>
        <p style={{ fontSize: 11, color: "#ff453a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4, fontWeight: 500 }}>
          Issue
        </p>
        <p style={{ fontSize: 13, color: "#9a9aaa", lineHeight: 1.6 }}>{issue}</p>
      </div>
      <div style={{ borderTop: "1px solid #2a2a35", paddingTop: 12 }}>
        <p style={{ fontSize: 11, color: "#30d158", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4, fontWeight: 500 }}>
          Suggestion
        </p>
        <p style={{ fontSize: 13, color: "#f5f5f7", lineHeight: 1.6 }}>{suggestion}</p>
      </div>
    </div>
  )
}

export function FeedbackPanel({ feedback }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <ScoreRing score={feedback.fitScore} verdict={feedback.verdict} />

      <div style={{ background: "#1c1c22", border: "1px solid #2a2a35", borderRadius: 14, padding: "20px" }}>
        <SectionLabel>Summary</SectionLabel>
        <p style={{ fontSize: 14, color: "#c0c0cc", lineHeight: 1.7 }}>{feedback.summary}</p>
      </div>

      <div style={{ background: "#1c1c22", border: "1px solid #2a2a35", borderRadius: 14, padding: "20px" }}>
        <SectionLabel>Matched Skills — {feedback.matchedSkills.length} found</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {feedback.matchedSkills.map(s => <Chip key={s} label={s} type="match" />)}
        </div>
      </div>

      <div style={{ background: "#1c1c22", border: "1px solid #2a2a35", borderRadius: 14, padding: "20px" }}>
        <SectionLabel>Skill Gaps — {feedback.missingSkills.length} missing</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {feedback.missingSkills.map(s => <Chip key={s} label={s} type="missing" />)}
        </div>
      </div>

      <div>
        <SectionLabel>Rewrite Suggestions</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {feedback.rewriteSuggestions.map((item, i) => (
            <RewriteCard key={i} section={item.section} issue={item.issue} suggestion={item.suggestion} />
          ))}
        </div>
      </div>

    </div>
  )
}