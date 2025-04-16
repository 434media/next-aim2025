"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { RiFilePdf2Line, RiCalendarLine, RiDownloadLine, RiCloseLine, RiSearchLine } from "@remixicon/react"
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

// Archive data with sample PDFs
const archiveItems: ArchiveItem[] = [
  {
    id: "surf-2023",
    year: "2023",
    title: "SURF 2023",
    description: "San Antonio Military Health and Universities Research Forum 2023 proceedings and abstracts.",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf", // Using a reliable sample PDF
    thumbnailUrl: "/images/surf-2023-thumb.jpg",
    isAvailable: true,
    pageCount: 13,
    fileSize: "3.2 MB",
    tags: ["proceedings", "abstracts", "2023"],
  },
  {
    id: "surf-2024",
    year: "2024",
    title: "SURF 2024",
    description: "San Antonio Military Health and Universities Research Forum 2024 proceedings and abstracts.",
    pdfUrl: "",
    thumbnailUrl: "/images/surf-2024-thumb.jpg",
    isAvailable: false,
    tags: ["proceedings", "abstracts", "2024"],
  },
  {
    id: "surf-2022",
    year: "2022",
    title: "SURF 2022",
    description: "San Antonio Military Health and Universities Research Forum 2022 proceedings and abstracts.",
    pdfUrl: "",
    thumbnailUrl: "/images/surf-2022-thumb.jpg",
    isAvailable: false,
    tags: ["proceedings", "abstracts", "2022"],
  },
  {
    id: "surf-2021",
    year: "2021",
    title: "SURF 2021",
    description: "San Antonio Military Health and Universities Research Forum 2021 proceedings and abstracts.",
    pdfUrl: "",
    thumbnailUrl: "/images/surf-2021-thumb.jpg",
    isAvailable: false,
    tags: ["proceedings", "abstracts", "2021"],
  },
]

export default function PdfArchive() {
  const [selectedPdf, setSelectedPdf] = useState<ArchiveItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const openPdfModal = (item: ArchiveItem) => {
    if (item.isAvailable) {
      setSelectedPdf(item)
      setIsModalOpen(true)
      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden"
    }
  }

  const closePdfModal = () => {
    setIsModalOpen(false)
    setSelectedPdf(null)
    // Restore body scroll
    document.body.style.overflow = ""
  }

  // Filter items based on search query
  const filteredItems = archiveItems.filter((item) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.year.includes(query) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)))
    )
  })

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
          />
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Archive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                item.isAvailable ? "hover:shadow-lg cursor-pointer" : "opacity-70 cursor-not-allowed"
              }`}
              whileHover={item.isAvailable ? { y: -5 } : {}}
              onClick={() => openPdfModal(item)}
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
                    <RiFilePdf2Line className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    SURF {item.year}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <RiFilePdf2Line className={`h-5 w-5 ${item.isAvailable ? "text-red-600" : "text-gray-400"}`} />
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
                    <RiCalendarLine className="mr-1 h-3 w-3" />
                    <span>{item.year}</span>
                  </div>

                  {item.isAvailable && (
                    <button
                      className="text-xs font-medium text-[#548cac] hover:text-[#366A79] transition-colors"
                      aria-label={`View ${item.title} PDF`}
                    >
                      View PDF
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[#548cac] hover:text-[#366A79] transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {isModalOpen && selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{selectedPdf.title}</h3>
              <div className="flex items-center space-x-2">
                <a
                  href={selectedPdf.pdfUrl}
                  download={`${selectedPdf.title}.pdf`}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Download PDF"
                >
                  <RiDownloadLine className="h-6 w-6" />
                </a>
                <button
                  onClick={closePdfModal}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <RiCloseLine className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="h-[calc(90vh-70px)] overflow-auto p-4">
              <PdfViewer pdfUrl={selectedPdf.pdfUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
