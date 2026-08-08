export function EmptyState() {
  return (
    <div style={{ minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 300 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: "linear-gradient(135deg, #6e6eff22, #a78bfa22)",
          border: "1px solid #6e6eff33",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, margin: "0 auto 20px"
        }}>
          ✦
        </div>
        <p style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 8 }}>
          Ready to analyze
        </p>
        <p style={{ fontSize: 14, color: "#6b6b80", lineHeight: 1.6, marginBottom: 28 }}>
          Fill in the job description and upload your resume to get your fit score and actionable feedback.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {["Paste the job description", "Upload your resume PDF", "Click Analyze"].map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#1c1c22", border: "1px solid #2a2a35",
              borderRadius: 12, padding: "10px 14px", textAlign: "left"
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "#6e6eff18", border: "1px solid #6e6eff44",
                color: "#6e6eff", fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 13, color: "#9a9aaa" }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}