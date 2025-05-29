"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"
import type { NewsItem } from "./types"

interface NewsTickerProps {
  newsItems: NewsItem[]
  isDesktop?: boolean
  onClose?: () => void
}

export default function NewsTicker({ newsItems, isDesktop = true, onClose }: NewsTickerProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isNewsHovered, setIsNewsHovered] = useState(false)

  // Optimized news rotation with pause on hover
  useEffect(() => {
    if (isNewsHovered) return

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [newsItems.length, isNewsHovered])

  if (isDesktop) {
    return (
      <motion.div
        className="hidden md:flex flex-1 justify-center max-w-md mx-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="group relative w-full"
          whileHover={{ scale: 1.02 }}
          onMouseEnter={() => setIsNewsHovered(true)}
          onMouseLeave={() => setIsNewsHovered(false)}
        >
          {/* Main ticker content */}
          <motion.a
            aria-label={`View latest update: ${newsItems[currentNewsIndex].label}`}
            href={newsItems[currentNewsIndex].href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex w-full items-center justify-between rounded-full bg-white/95 backdrop-blur-sm px-6 py-3 text-sm font-medium text-[#101310] shadow-xl shadow-[#548cac]/20 ring-1 ring-white/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-[#548cac]/30 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310] overflow-hidden border border-[#548cac]/30"
            tabIndex={0}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                window.open(newsItems[currentNewsIndex].href, "_blank", "noopener,noreferrer")
              }
            }}
          >
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#548cac]/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />

            <span className="flex items-center relative z-10 w-full">
              <span className="sr-only">Current news:</span>
              <span className="flex items-center text-sm w-full">
                <motion.span
                  className="font-bold text-[#548cac] mr-3"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(84, 140, 172, 0)",
                      "0 0 8px rgba(84, 140, 172, 0.3)",
                      "0 0 0px rgba(84, 140, 172, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  News
                </motion.span>

                <span className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentNewsIndex}
                      className="block truncate font-medium text-[#101310] group-hover:text-[#548cac] transition-colors duration-300"
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: 90 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    >
                      {newsItems[currentNewsIndex].label}
                    </motion.span>
                  </AnimatePresence>
                </span>

                {/* Progress indicators */}
                <div className="flex space-x-1 ml-3">
                  {newsItems.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        index === currentNewsIndex ? "bg-[#548cac] shadow-sm shadow-[#548cac]/50" : "bg-gray-300"
                      }`}
                      animate={{
                        scale: index === currentNewsIndex ? 1.3 : 1,
                        opacity: index === currentNewsIndex ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>

                <motion.span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#548cac] to-[#4a7a96] text-white ml-3 shadow-lg"
                  whileHover={{
                    scale: 1.2,
                    rotate: 15,
                    boxShadow: "0 8px 25px rgba(84, 140, 172, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <RiArrowRightUpLine className="h-3.5 w-3.5" aria-hidden="true" />
                </motion.span>
              </span>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    )
  }

  // Mobile version
  return (
    <motion.div
      className="p-6 border-t border-[#548cac]/20 bg-gradient-to-r from-[#101310]/60 to-[#101310]/40"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.3 }}
    >
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#548cac] flex items-center">
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(84, 140, 172, 0)",
                "0 0 8px rgba(84, 140, 172, 0.3)",
                "0 0 0px rgba(84, 140, 172, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Latest News
          </motion.span>
        </h3>
        <div className="space-y-2">
          {newsItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                index === currentNewsIndex
                  ? "bg-[#548cac]/20 border border-[#548cac]/30"
                  : "bg-white/5 hover:bg-[#548cac]/10"
              }`}
              onClick={onClose}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-lg"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-sm font-medium text-white group-hover:text-[#548cac] transition-colors">
                  {item.label}
                </span>
                <motion.div
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#548cac]/20 text-[#548cac] group-hover:bg-[#548cac] group-hover:text-white"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <RiArrowRightUpLine className="h-3 w-3" />
                </motion.div>
              </div>
              {index === currentNewsIndex && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#548cac] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
