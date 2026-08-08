import { useState, useRef } from "react"
import { extractTextFromPdf } from "../utils/parsePdf"

export function ResumeInput({ value, onChange }) {
  const [mode, setMode] = useState("upload") // "upload" | "paste"
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
      onChange(text) // send extracted text up to App
    } catch (err) {
      setParseError("Couldn't read this PDF. Try pasting your resume as text instead.")
    } finally {
      setIsParsing(false)
    }
  }

  function handleFileInput(e) {
    handleFile(e.target.files[0])
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  return (
    <div className="flex flex-col gap-2">

      {/* Label + mode toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          Your Resume
        </label>
        <div className="flex bg-gray-900 border border-gray-700 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setMode("upload")}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              mode === "upload"
                ? "bg-violet-600 text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Upload PDF
          </button>
          <button
            onClick={() => setMode("paste")}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              mode === "paste"
                ? "bg-violet-600 text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Upload mode */}
      {mode === "upload" && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
            isDragging
              ? "border-violet-400 bg-violet-950"
              : value
              ? "border-emerald-600 bg-emerald-950"
              : "border-gray-700 bg-gray-900 hover:border-gray-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />

          {isParsing ? (
            <>
              <svg className="animate-spin h-6 w-6 text-violet-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-sm text-gray-400">Reading PDF...</p>
            </>
          ) : value && fileName ? (
            <>
              <span className="text-3xl">✅</span>
              <p className="text-sm text-emerald-400 font-medium">{fileName}</p>
              <p className="text-xs text-gray-500">Click to replace</p>
            </>
          ) : (
            <>
              <span className="text-3xl">📄</span>
              <div className="text-center">
                <p className="text-sm text-gray-300 font-medium">
                  Drop your PDF here
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  or click to browse
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Paste mode */}
      {mode === "paste" && (
        <textarea
          className="w-full h-48 bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:border-violet-500 transition-colors"
          placeholder="Paste your resume text here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {/* Parse error */}
      {parseError && (
        <p className="text-xs text-red-400">{parseError}</p>
      )}

    </div>
  )
}