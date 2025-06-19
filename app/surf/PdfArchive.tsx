"use client"
import { motion } from "motion/react"
import { RiFilePdf2Line, RiCalendarLine, RiExternalLinkLine } from "@remixicon/react"
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
    tags: ["proceedings", "abstracts", "2021"],
  },
]

export default function PdfArchive() {
  const handleViewPdf = (item: ArchiveItem) => {
    // Use the proxy route to hide the S3 URL
    const proxyUrl = `/api/pdf/${item.id}`
    window.open(proxyUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div>
      {/* Archive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {archiveItems.map((item) => (
          <motion.div
            key={item.id}
            className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
              item.isAvailable ? "hover:shadow-lg cursor-pointer" : "opacity-70"
            }`}
            whileHover={item.isAvailable ? { y: -5 } : {}}
            onClick={item.isAvailable ? () => handleViewPdf(item) : undefined}
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

              {/* View overlay on hover */}
              {item.isAvailable && (
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <RiExternalLinkLine className="h-6 w-6 text-gray-800" />
                  </div>
                </div>
              )}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <RiCalendarLine className="mr-1 h-3 w-3" aria-hidden="true" />
                  <span>{item.year}</span>
                </div>

                {item.isAvailable && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewPdf(item)
                    }}
                    className="flex items-center text-xs font-medium text-[#548cac] hover:text-[#366A79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-1 rounded"
                    aria-label={`View ${item.title} PDF`}
                  >
                    <RiExternalLinkLine className="mr-1 h-3 w-3" />
                    View PDF
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
