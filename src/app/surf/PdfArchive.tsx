"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  RiFilePdf2Line,
  RiCalendarLine,
  RiDownloadLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiErrorWarningLine,
} from "@remixicon/react"
import PdfViewer from "./PdfViewer"
import Image from "next/image"

// Archive item type
interface ArchiveItem {
  id: string
  year: string
  title: string
  description: string
  pdfUrl: string
  thumbnailUrl: string
  isAvailable: boolean
  pageCount?: number
  fileSize?: string
  tags?: string[]
}

// Archive data with PDFs
const archiveItems: ArchiveItem[] = [
  {
    id: "surf-2024",
    year: "2024",
    title: "SURF 2024",
    description: "San Antonio Military Health and Universities Research Forum 2024 proceedings and abstracts.",
    pdfUrl: "",
    thumbnailUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/SURF_Logo-NoYear.png",
    isAvailable: false,
    tags: ["proceedings", "abstracts", "2024"],
  },
  {
    id: "surf-2023",
    year: "2023",
    title: "SURF 2023",
    description: "San Antonio Military Health and Universities Research Forum 2023 proceedings and abstracts.",
    pdfUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/SURF-Program_2023_Final_6.1.23_v1.pdf",
    thumbnailUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/SURF_Logo-NoYear.png",
    isAvailable: true,
    pageCount: 42,
    fileSize: "2.4 MB",
    tags: ["proceedings", "abstracts", "2023"],
  },
  {
    id: "surf-2022",
    year: "2022",
    title: "SURF 2022",
    description: "San Antonio Military Health and Universities Research Forum 2022 proceedings and abstracts.",
    pdfUrl: "",
    thumbnailUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/SURF_Logo-NoYear.png",
    isAvailable: false,
    tags: ["proceedings", "abstracts", "2022"],
  },
  {
    id: "surf-2021",
    year: "2021",
    title: "SURF 2021",
    description: "San Antonio Military Health and Universities Research Forum 2021 proceedings and abstracts.",
    pdfUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/SURF-2021_Program.pdf",
    thumbnailUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/SURF_Logo-NoYear.png",
    isAvailable: true,
    pageCount: 38,
    fileSize: "1.8 MB",
    tags: ["proceedings", "abstracts", "2021"],
  },
]

export default function PdfArchive() {
  const [selectedPdf, setSelectedPdf] = useState<ArchiveItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pdfError, setPdfError] = useState<Error | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  // Handle PDF errors
  const handlePdfError = useCallback((error: Error) => {
    console.error("PDF error:", error)
    setPdfError(error)
  }, [])

  // Open PDF modal with proper focus management
  const openPdfModal = useCallback((item: ArchiveItem) => {
    if (item.isAvailable) {
      // Store the currently focused element to restore focus later
      lastFocusedElementRef.current = document.activeElement as HTMLElement
      setSelectedPdf(item)
      setPdfError(null)
      setIsModalOpen(true)
      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden"
    }
  }, [])

  // Close modal with proper cleanup
  const closePdfModal = useCallback(() => {
    setIsModalOpen(false)
    // Restore body scroll
    document.body.style.overflow = ""

    // Return focus to the element that was focused before the modal was opened
    setTimeout(() => {
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus()
      }
    }, 0)
  }, [])

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closePdfModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isModalOpen, closePdfModal])

  // Focus trap for modal
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return

    // Focus the modal when it opens
    modalRef.current.focus()

    // Set up focus trap
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    modalRef.current.addEventListener("keydown", handleTabKey)
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("keydown", handleTabKey)
      }
    }
  }, [isModalOpen])

  return (
    <div>
      {/* Archive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {archiveItems.map((item) => (
          <motion.div
            key={item.id}
            className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
              item.isAvailable ? "hover:shadow-lg cursor-pointer" : "opacity-70 cursor-not-allowed"
            }`}
            whileHover={item.isAvailable ? { y: -5 } : {}}
            onClick={() => item.isAvailable && openPdfModal(item)}
            tabIndex={item.isAvailable ? 0 : -1}
            onKeyDown={(e) => {
              if (item.isAvailable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault()
                openPdfModal(item)
              }
            }}
            role={item.isAvailable ? "button" : "presentation"}
            aria-label={item.isAvailable ? `View ${item.title} PDF` : `${item.title} - Coming soon`}
          >
            {/* Thumbnail preview */}
            <div className="relative h-40 bg-gray-100">
              {item.thumbnailUrl ? (
                <Image
                  src={item.thumbnailUrl || "/placeholder.svg"}
                  alt={`${item.title} thumbnail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <RiFilePdf2Line className="h-16 w-16 text-gray-400" aria-hidden="true" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <RiFilePdf2Line
                    className={`h-5 w-5 ${item.isAvailable ? "text-red-600" : "text-gray-400"}`}
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">{item.title}</span>
                </div>
                {!item.isAvailable && (
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

              {/* Metadata display */}
              {item.isAvailable && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.pageCount && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.pageCount} pages
                    </span>
                  )}
                  {item.fileSize && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.fileSize}</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <RiCalendarLine className="mr-1 h-3 w-3" aria-hidden="true" />
                  <span>{item.year}</span>
                </div>

                {item.isAvailable && (
                  <span className="text-xs font-medium text-[#548cac] hover:text-[#366A79] transition-colors">
                    View PDF
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPdf && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              // Close modal when clicking the backdrop (outside the modal content)
              if (e.target === e.currentTarget) {
                closePdfModal()
              }
            }}
          >
            <motion.div
              ref={modalRef}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${selectedPdf.id}`}
              tabIndex={-1}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 id={`modal-title-${selectedPdf.id}`} className="text-xl font-semibold text-gray-900">
                  {selectedPdf.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={selectedPdf.pdfUrl}
                    download={`${selectedPdf.title}.pdf`}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                    aria-label="Download PDF"
                  >
                    <RiDownloadLine className="h-6 w-6" aria-hidden="true" />
                  </a>
                  <button
                    onClick={closePdfModal}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                    aria-label="Close modal"
                  >
                    <RiCloseLine className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="h-[calc(90vh-70px)] overflow-auto p-4">
                {/* Conditional rendering based on PDF availability and errors */}
                {selectedPdf.isAvailable && selectedPdf.pdfUrl ? (
                  pdfError ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <RiErrorWarningLine className="h-16 w-16 text-red-500 mb-4" aria-hidden="true" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Unable to display PDF</h4>
                      <p className="text-gray-600 mb-6 text-center max-w-md">
                        We encountered an error while trying to display this PDF. You can try downloading it or opening
                        it in a new tab.
                      </p>

                      {/* Fallback image preview */}
                      <div className="relative w-full max-w-md h-auto mb-8 border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <Image
                          src={selectedPdf.thumbnailUrl || "/placeholder.svg"}
                          alt={`${selectedPdf.title} preview`}
                          width={800}
                          height={1100}
                          className="w-full h-auto object-contain"
                          priority
                        />
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={selectedPdf.pdfUrl}
                          download={`${selectedPdf.title}.pdf`}
                          className="flex items-center justify-center px-6 py-3 bg-[#548cac] text-white rounded-md hover:bg-[#366A79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                        >
                          <RiDownloadLine className="mr-2" aria-hidden="true" />
                          Download PDF
                        </a>
                        <a
                          href={selectedPdf.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                          <RiExternalLinkLine className="mr-2" aria-hidden="true" />
                          Open in New Tab
                        </a>
                      </div>
                    </div>
                  ) : (
                    <PdfViewer pdfUrl={selectedPdf.pdfUrl} onError={handlePdfError} />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    {/* Preview image of first page */}
                    <div className="relative w-full max-w-md h-auto mb-8 border border-gray-200 shadow-md rounded-lg overflow-hidden">
                      <Image
                        src={selectedPdf.thumbnailUrl || "/placeholder.svg"}
                        alt={`${selectedPdf.title} preview`}
                        width={800}
                        height={1100}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>

                    {/* Message for unavailable PDFs */}
                    <div className="text-center mb-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedPdf.isAvailable ? "PDF Currently Unavailable" : "Coming Soon"}
                      </h4>
                      <p className="text-gray-600 max-w-md">
                        {selectedPdf.isAvailable
                          ? "This PDF is currently unavailable. Please try again later or contact us for assistance."
                          : "This document will be available soon. Check back later for updates."}
                      </p>
                    </div>

                    {/* Action buttons */}
                    {selectedPdf.isAvailable && selectedPdf.pdfUrl && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={selectedPdf.pdfUrl}
                          download={`${selectedPdf.title}.pdf`}
                          className="flex items-center justify-center px-6 py-3 bg-[#548cac] text-white rounded-md hover:bg-[#366A79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                        >
                          <RiDownloadLine className="mr-2" aria-hidden="true" />
                          Download PDF
                        </a>
                        <a
                          href={selectedPdf.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                          <RiExternalLinkLine className="mr-2" aria-hidden="true" />
                          Open in New Tab
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
