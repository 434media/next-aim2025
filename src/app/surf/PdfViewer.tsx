"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import {
  RiDownloadLine,
  RiExternalLinkLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiZoomInLine,
  RiZoomOutLine,
  RiErrorWarningLine,
} from "@remixicon/react"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

interface PdfViewerProps {
  pdfUrl: string
  onError?: (error: Error) => void
}

export default function PdfViewer({ pdfUrl, onError }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.0)
  const [workerInitialized, setWorkerInitialized] = useState<boolean>(false)
  const [renderError, setRenderError] = useState<boolean>(false)
  const documentRef = useRef<HTMLDivElement>(null)
  const workerInitRef = useRef<boolean>(false)

  // Initialize PDF.js worker only once
  useEffect(() => {
    if (workerInitRef.current) return

    const initializeWorker = async () => {
      try {
        // Only set worker source if it's not already set
        if (!pdfjs.GlobalWorkerOptions.workerSrc) {
          const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
          pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
        }

        workerInitRef.current = true
        setWorkerInitialized(true)
      } catch (error) {
        console.error("Error initializing PDF.js worker:", error)
        setError(true)
        setLoading(false)
        if (onError && error instanceof Error) onError(error)
      }
    }

    initializeWorker()
  }, [onError])

  // Reset state when pdfUrl changes
  useEffect(() => {
    setPageNumber(1)
    setLoading(true)
    setError(false)
    setRenderError(false)
  }, [pdfUrl])

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setLoading(false)
    setError(false)
    setRenderError(false)
  }, [])

  const onDocumentLoadError = useCallback(
    (error: Error) => {
      console.error("Error loading PDF:", error)
      setError(true)
      setLoading(false)
      if (onError) onError(error)
    },
    [onError],
  )

  const onPageRenderError = useCallback(
    (error: Error) => {
      console.error("Error rendering PDF page:", error)
      setRenderError(true)
      if (onError) onError(error)
    },
    [onError],
  )

  const changePage = useCallback(
    (offset: number) => {
      setPageNumber((prevPageNumber) => {
        const newPageNumber = prevPageNumber + offset
        return numPages ? Math.min(Math.max(1, newPageNumber), numPages) : 1
      })
    },
    [numPages],
  )

  const previousPage = useCallback(() => changePage(-1), [changePage])
  const nextPage = useCallback(() => changePage(1), [changePage])

  const zoomIn = useCallback(() => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6))
  }, [])

  // Fallback viewer when PDF.js fails
  const FallbackViewer = useCallback(
    () => (
      <div className="w-full h-full min-h-[70vh] border border-gray-200 rounded-lg overflow-hidden">
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="w-full h-full min-h-[70vh]"
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          aria-label="PDF document viewer"
        />
      </div>
    ),
    [pdfUrl],
  )

  // Error message component
  const ErrorMessage = useCallback(
    () => (
      <div className="flex flex-col items-center justify-center h-64 w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
        <RiErrorWarningLine className="h-12 w-12 text-red-500 mb-4" aria-hidden="true" />
        <p className="text-red-500 text-lg font-medium mb-2">Unable to display PDF</p>
        <p className="text-gray-600 mb-4 text-center max-w-md">
          The PDF viewer encountered an error. You can try downloading the file or opening it in a new tab.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href={pdfUrl}
            download
            className="flex items-center justify-center px-4 py-2 bg-[#548cac] text-white rounded-md hover:bg-[#366A79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
            aria-label="Download PDF file"
          >
            <RiDownloadLine className="mr-2" aria-hidden="true" />
            Download PDF
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label="Open PDF in new tab"
          >
            <RiExternalLinkLine className="mr-2" aria-hidden="true" />
            Open in New Tab
          </a>
        </div>
      </div>
    ),
    [pdfUrl],
  )

  // Loading indicator component
  const LoadingIndicator = useCallback(
    () => (
      <div className="flex flex-col items-center justify-center h-64 w-full">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#548cac] mb-4"
          aria-hidden="true"
        ></div>
        <p className="text-gray-600">Loading PDF...</p>
      </div>
    ),
    [],
  )

  // Render the content based on the current state
  const renderContent = useCallback(() => {
    // Don't try to render the PDF until the worker is initialized
    if (!workerInitialized) {
      return <LoadingIndicator />
    }

    // Show loading indicator while the PDF is loading
    if (loading && !error && !renderError) {
      return <LoadingIndicator />
    }

    // Show error message if there's an error
    if (error || renderError) {
      // Try using the browser's native PDF viewer as fallback
      return <FallbackViewer />
    }

    // Render the PDF viewer
    return (
      <>
        <div className="flex justify-center mb-4" ref={documentRef}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<LoadingIndicator />}
            error={<ErrorMessage />}
            className="border border-gray-200 shadow-md"
            externalLinkTarget="_blank"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="pdf-page"
              error={<ErrorMessage />}
              onRenderError={onPageRenderError}
              loading={
                <div className="flex items-center justify-center h-[600px] w-[450px] bg-gray-50">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#548cac]"></div>
                </div>
              }
            />
          </Document>
        </div>

        {numPages && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.6}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Zoom out"
              >
                <RiZoomOutLine className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
              <button
                onClick={zoomIn}
                disabled={scale >= 2.0}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Zoom in"
              >
                <RiZoomInLine className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={previousPage}
                disabled={pageNumber <= 1}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Previous page"
              >
                <RiArrowLeftLine className="mr-1" aria-hidden="true" />
                Previous
              </button>
              <p className="text-sm text-gray-600" aria-live="polite">
                Page {pageNumber} of {numPages}
              </p>
              <button
                onClick={nextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Next page"
              >
                Next
                <RiArrowRightLine className="ml-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }, [
    workerInitialized,
    loading,
    error,
    renderError,
    pdfUrl,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    onPageRenderError,
    pageNumber,
    scale,
    numPages,
    zoomIn,
    zoomOut,
    previousPage,
    nextPage,
    LoadingIndicator,
    ErrorMessage,
    FallbackViewer,
  ])

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Main content area */}
      <div className="w-full">{renderContent()}</div>

      {/* Download/Open buttons - always visible */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 mb-8 w-full sm:w-auto">
        <a
          href={pdfUrl}
          download
          className="flex items-center justify-center px-4 py-2 bg-[#548cac] text-white rounded-md hover:bg-[#366A79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
          aria-label="Download PDF file"
        >
          <RiDownloadLine className="mr-2" aria-hidden="true" />
          Download PDF
        </a>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Open PDF in new tab"
        >
          <RiExternalLinkLine className="mr-2" aria-hidden="true" />
          Open in New Tab
        </a>
      </div>
    </div>
  )
}
