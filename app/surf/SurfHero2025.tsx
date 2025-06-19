"use client"

import { RiBuilding4Line, RiMicroscopeLine, RiTeamLine } from "@remixicon/react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { getCategoryColor, presentersData } from "../../data/surf-presenters"

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export default function SurfHero2025() {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  // Rotate highlighted presenter every 5 seconds
  useEffect(() => {
    if (presentersData.length === 0) return

    const interval = setInterval(() => {
      setHighlightedIndex((prev) => {
        if (prev === null) return 0
        return (prev + 1) % presentersData.length
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Pre-defined particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: "15%", top: "20%" },
    { left: "25%", top: "65%" },
    { left: "35%", top: "40%" },
    { left: "45%", top: "85%" },
    { left: "55%", top: "30%" },
    { left: "65%", top: "70%" },
    { left: "75%", top: "25%" },
    { left: "85%", top: "60%" },
    { left: "95%", top: "45%" },
    { left: "5%", top: "50%" },
    { left: "20%", top: "10%" },
    { left: "40%", top: "95%" },
    { left: "60%", top: "15%" },
    { left: "80%", top: "80%" },
    { left: "10%", top: "35%" },
    { left: "30%", top: "75%" },
    { left: "50%", top: "5%" },
    { left: "70%", top: "55%" },
    { left: "90%", top: "90%" },
    { left: "28%", top: "42%" },
  ]

  return (
    <section className="relative bg-gradient-to-br from-[#101310] via-[#366A79] to-[#4f4f2c] pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      </div>

      {/* Floating particles with fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 md:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
          {/* Left column - SURF Information */}
          <div className="text-white">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#8ECAE6] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                SURF 2025
              </motion.h1>
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-white to-[#8ECAE6] mb-6"
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.h2
                className="text-2xl md:text-3xl font-semibold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                San Antonio Military Health and Universities Research Forum
              </motion.h2>
              <motion.p
                className="text-lg mb-8 text-gray-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                SURF brings together military and civilian researchers, clinicians, and students to showcase
                cutting-edge research in military medicine and healthcare innovation.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  whileHover={{
                    y: -8,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    scale: 1.05,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-white mb-2">{presentersData.length}</div>
                  <div className="text-sm text-gray-200">Presentations</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  whileHover={{
                    y: -8,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    scale: 1.05,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-white mb-2">22</div>
                  <div className="text-sm text-gray-200">Categories</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  whileHover={{
                    y: -8,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    scale: 1.05,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-sm text-gray-200">Institutions</div>
                </motion.div>
              </motion.div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-[#8ECAE6] to-[#548cac] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const presentersSection = document.getElementById("surf-presenters-section")
                    presentersSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Explore More Presenters
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Featured Research with consistent sizing */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {highlightedIndex !== null && presentersData.length > 0 && (
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl h-[500px] flex flex-col"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  key={presentersData[highlightedIndex].id}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="p-3 bg-[#8ECAE6]/20 rounded-full mr-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <RiMicroscopeLine className="h-6 w-6 text-[#8ECAE6]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Featured Poster Presenters</h3>
                  </div>

                  <motion.span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mb-4 w-fit ${getCategoryColor(presentersData[highlightedIndex].category)}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {presentersData[highlightedIndex].category}
                  </motion.span>

                  <motion.h4
                    className="text-xl font-semibold mb-4 leading-tight flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {truncateText(presentersData[highlightedIndex].title, 120)}
                  </motion.h4>

                  <motion.div
                    className="flex items-start mb-4 flex-grow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <RiTeamLine className="h-5 w-5 mr-3 mt-1 text-gray-300 flex-shrink-0" />
                    <p className="text-sm text-gray-300 leading-relaxed overflow-hidden">
                      {truncateText(presentersData[highlightedIndex].authors, 150)}
                    </p>
                  </motion.div>

                  {presentersData[highlightedIndex].institution && (
                    <motion.div
                      className="flex items-start mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <RiBuilding4Line className="h-5 w-5 mr-3 mt-1 text-gray-300 flex-shrink-0" />
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {truncateText(presentersData[highlightedIndex].institution, 100)}
                      </p>
                    </motion.div>
                  )}

                  {/* Progress indicator - fixed at bottom */}
                  <motion.div
                    className="flex space-x-2 mt-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {presentersData.slice(0, 5).map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${index === highlightedIndex % 5 ? "bg-[#8ECAE6] w-8" : "bg-white/30 w-2"
                          }`}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
