import { useState, useRef } from "react"
import { extractTextFromPdf } from "../utils/parsePdf"

export function ResumeInput({ value, onChange }) {
  const [mode, setMode] = useState("upload")
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [isParsing, setIsParsing] = useState(false)
  const [parseError, setParseError] = useState(null)
  const fileInputRef = useRef(null)

  async function handleFile(file) {
    if (!file || file.type !== "application/pdf") {
      setParseError("Please upload a PDF file.")
      return
    }
    setParseError(null)
    setIsParsing(true)
    setFileName(file.name)
    try {
      const text = await extractTextFromPdf(file)
      onChange(text)
    } catch {
      setParseError("Couldn't read this PDF. Try pasting your resume as text instead.")
    } finally {
      setIsParsing(false)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

      {/* Label + toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: "#6b6b80", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Resume
        </label>
        <div style={{
          display: "flex", background: "#1c1c22",
          border: "1px solid #2a2a35", borderRadius: 10, padding: 3, gap: 2
        }}>
          {["upload", "paste"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "4px 12px", borderRadius: 7, fontSize: 12, fontWeight: 500,
              background: mode === m ? "#6e6eff" : "transparent",
              color: mode === m ? "#fff" : "#6b6b80",
              border: "none", cursor: "pointer", transition: "all 0.15s",
              fontFamily: "inherit"
            }}>
              {m === "upload" ? "Upload PDF" : "Paste Text"}
            </button>
          ))}
        </div>
      </div>

      {/* Upload zone */}
      {mode === "upload" && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          style={{
            height: 192, border: `1.5px dashed ${isDragging ? "#6e6eff" : value ? "#30d158" : "#2a2a35"}`,
            borderRadius: 14, background: isDragging ? "#6e6eff0a" : value ? "#30d1580a" : "#1c1c22",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 10, cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
          {isParsing ? (
            <>
              <svg className="animate-spin" style={{ width: 24, height: 24, color: "#6e6eff" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span style={{ fontSize: 13, color: "#6b6b80" }}>Reading PDF…</span>
            </>
          ) : value && fileName ? (
            <>
              <span style={{ fontSize: 28 }}>✅</span>
              <span style={{ fontSize: 13, color: "#30d158", fontWeight: 500 }}>{fileName}</span>
              <span style={{ fontSize: 11, color: "#6b6b80" }}>Click to replace</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 28 }}>📄</span>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 14, color: "#f5f5f7", fontWeight: 500, marginBottom: 4 }}>Drop your PDF here</p>
                <p style={{ fontSize: 12, color: "#6b6b80" }}>or click to browse</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Paste zone */}
      {mode === "paste" && (
        <textarea
          style={{
            width: "100%", height: 192,
            background: "#1c1c22", border: "1px solid #2a2a35",
            borderRadius: 14, padding: 16, fontSize: 14,
            color: "#f5f5f7", resize: "none", outline: "none",
            lineHeight: 1.6, fontFamily: "inherit", transition: "border-color 0.2s"
          }}
          onFocus={e => e.target.style.borderColor = "#6e6eff"}
          onBlur={e => e.target.style.borderColor = "#2a2a35"}
          placeholder="Paste your resume text here..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}

      {parseError && (
        <p style={{ fontSize: 12, color: "#ff453a" }}>{parseError}</p>
      )}
    </div>
  )
}