"use client"

import { motion } from "motion/react"
import Link from "next/link"
import type { EventInfo } from "./types"

interface TopBannerProps {
  eventInfo: EventInfo
}

export default function TopBanner({ eventInfo }: TopBannerProps) {
  return (
    <motion.div
      className="bg-gradient-to-r from-[#101310] via-[#101310] to-[#0f1f0f] relative overflow-hidden"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(84, 140, 172, 0.3) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-12 text-sm text-white">
          <div className="hidden md:flex items-center space-x-6">
            <span className="flex items-center">
              <Link href="/" className="group flex items-center" aria-label="AIM Health R&D Summit Home">
                <motion.span
                  className="relative flex items-center justify-center p-2 rounded-lg group-hover:bg-white/5 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {eventInfo.aim.name}
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </motion.span>
                <span className="mx-3 text-white/60">|</span>
                <motion.span className="text-white font-medium" whileHover={{ color: "#548cac" }}>
                  {eventInfo.aim.date}
                </motion.span>
              </Link>
            </span>
          </div>

          {/* Enhanced Desktop Venue Info */}
          <motion.div
            className="hidden md:flex items-center space-x-3 text-white/90"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="hover:text-[#548cac] transition-colors cursor-default">{eventInfo.venue}</span>
            <span className="text-white/40">|</span>
            <span className="hover:text-[#548cac] transition-colors cursor-default">{eventInfo.location}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
