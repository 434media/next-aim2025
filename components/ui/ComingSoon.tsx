"use client"

import type React from "react"
import { motion } from "motion/react"
import { AIMLogo } from "../../public/AIMLogo"

const ComingSoon: React.FC = () => {
  return (
    <div className="mt-10 md:mt-16 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#101310] via-[#366A79] to-[#4f4f2c] overflow-hidden">
      <div className="relative">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
            }}
            animate={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* AIM Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex justify-center items-center"
        >
          <AIMLogo className="w-64 h-64 md:w-80 md:h-80" variant="white" />
        </motion.div>

        {/* Coming Soon text */}
        <motion.h1
          className="mt-8 text-3xl md:text-4xl font-bold text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {"Coming Soon".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Accessibility enhancement */}
        <div className="sr-only" aria-live="polite">
          AIM Summit Coming Soon page loaded
        </div>
      </div>
    </div>
  )
}

export default ComingSoon

