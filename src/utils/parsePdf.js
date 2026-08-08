import * as pdfjsLib from "pdfjs-dist"

// Point to the pdf.js worker — this runs the heavy parsing off the main thread
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export async function extractTextFromPdf(file) {
  // FileReader converts the uploaded File object into an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()

  // pdfjsLib loads the PDF from raw bytes
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ""

  // Loop through every page and extract text
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    // Each page's text comes as an array of items — join them with spaces
    const pageText = content.items
      .map((item) => item.str)
      .join(" ")

    fullText += pageText + "\n"
  }

  return fullText.trim()
}