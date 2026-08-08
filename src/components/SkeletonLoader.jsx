function Pulse({ style }) {
  return (
    <div className="animate-pulse" style={{
      background: "#1c1c22", borderRadius: 10, ...style
    }} />
  )
}

export function SkeletonLoader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ background: "#1c1c22", border: "1px solid #2a2a35", borderRadius: 18, padding: "24px 28px", display: "flex", gap: 24, alignItems: "center" }}>
        <Pulse style={{ width: 90, height: 90, borderRadius: "50%" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Pulse style={{ height: 12, width: 80 }} />
          <Pulse style={{ height: 24, width: 140 }} />
          <Pulse style={{ height: 20, width: 90, borderRadius: 999 }} />
        </div>
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: "#1c1c22", border: "1px solid #2a2a35", borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column", gap: 10 }}>
          <Pulse style={{ height: 10, width: 100 }} />
          <Pulse style={{ height: 14, width: "100%" }} />
          <Pulse style={{ height: 14, width: "80%" }} />
        </div>
      ))}
    </div>
  )
}