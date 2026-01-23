"use client"

import { Heart, Sparkles } from "lucide-react"
import { motion } from "motion/react"

export function MissionAccomplishedBadge() {
  return (
    <div className="text-center">
      <motion.div
        className="inline-block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="inline-flex items-center px-6 py-4 sm:px-8 sm:py-5 text-black text-lg sm:text-xl font-bold transition-all duration-300">
          <Sparkles className="mr-2 md:mr-3 size-5 sm:size-6 text-cyan-600" />
          AIM 2025 • Mission Accomplished
          <Heart className="ml-2 md:ml-3 size-5 sm:size-6 text-rose-500" />
        </span>
      </motion.div>
    </div>
  )
}
