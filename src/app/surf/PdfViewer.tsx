"use client"

import { useState, useEffect } from "react"
// Import the Document type from react-pdf
import { Document, Page, pdfjs } from "react-pdf"
import { RiDownloadLine, RiExternalLinkLine, RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

// Remove the duplicate worker initialization at the top of the file and replace it with:
// We'll initialize the worker in the useEffect hook instead
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PdfViewerProps {
  pdfUrl: string
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.0)
  const [workerInitialized, setWorkerInitialized] = useState<boolean>(false)

  // Then update the useEffect hook for worker initialization:
  // Initialize PDF.js worker
  useEffect(() => {
    const initializeWorker = async () => {
      try {
        // Only set worker source if it's not already set
        if (!pdfjs.GlobalWorkerOptions.workerSrc) {
          const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
          pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

          // Create a small delay to ensure worker is loaded
          await new Promise((resolve) => setTimeout(resolve, 500))
        }

        // Mark worker as initialized
        setWorkerInitialized(true)
      } catch (error) {
        console.error("Error initializing PDF.js worker:", error)
        setError(true)
        setLoading(false)
      }
    }

    initializeWorker()

    // Cleanup function
    return () => {
      // Any cleanup needed for the PDF viewer
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
    setError(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error)
    setError(true)
    setLoading(false)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return numPages ? Math.min(Math.max(1, newPageNumber), numPages) : 1
    })
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6))
  }

  // Fallback viewer when PDF.js fails
  const FallbackViewer = () => (
    <div className="w-full h-full min-h-[70vh] border border-gray-200 rounded-lg">
      <embed
        src={pdfUrl}
        type="application/pdf"
        className="w-full h-full min-h-[70vh]"
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
      />
    </div>
  )

  // Error message component
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center h-64 w-full">
      <p className="text-red-500 text-lg mb-2">Unable to display PDF</p>
      <p className="text-gray-600 mb-4">The PDF viewer encountered an error.</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <a
          href={pdfUrl}
          download
          className="flex items-center justify-center px-4 py-2 bg-[#548cac] text-white rounded-md hover:bg-[#366A79] transition-colors"
        >
          <RiDownloadLine className="mr-2" />
          Download PDF
        </a>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          <RiExternalLinkLine className="mr-2" />
          Open in New Tab
        </a>
      </div>
    </div>
  )

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex items-center justify-center h-64 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#548cac]"></div>
    </div>
  )

  // Also update the renderContent function to simplify the logic:
  const renderContent = () => {
    // Don't try to render the PDF until the worker is initialized
    if (!workerInitialized) {
      return <LoadingIndicator />
    }

    // Show loading indicator while the PDF is loading
    if (loading && !error) {
      return <LoadingIndicator />
    }

    // Show error message or fallback viewer if there's an error
    if (error) {
      return <FallbackViewer />
    }

    // Render the PDF viewer
    return (
      <>
        <div className="flex justify-center mb-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<LoadingIndicator />}
            error={<ErrorMessage />}
            className="border border-gray-200 shadow-md"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="pdf-page"
              error={<ErrorMessage />}
            />
          </Document>
        </div>

        {numPages && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.6}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                -
              </button>
              <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
              <button
                onClick={zoomIn}
                disabled={scale >= 2.0}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={previousPage}
                disabled={pageNumber <= 1}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <RiArrowLeftLine className="mr-1" />
                Previous
              </button>
              <p className="text-sm text-gray-600">
                Page {pageNumber} of {numPages}
              </p>
              <button
                onClick={nextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                Next
                <RiArrowRightLine className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Main content area */}
      <div className="w-full">{renderContent()}</div>

      {/* Download/Open buttons - always visible */}
      <div className="flex justify-center mt-4 mb-8">
        <a
          href={pdfUrl}
          download
          className="flex items-center justify-center px-4 py-2 bg-[#548cac] text-white rounded-md hover:bg-[#366A79] transition-colors mr-4"
        >
          <RiDownloadLine className="mr-2" />
          Download PDF
        </a>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          <RiExternalLinkLine className="mr-2" />
          Open in New Tab
        </a>
      </div>
    </div>
  )
}
