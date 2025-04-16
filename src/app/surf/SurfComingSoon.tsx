"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

export default function SurfComingSoon() {
  const [isMounted, setIsMounted] = useState(false)

  // Only run animations after component is mounted on the client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#101310] via-[#0a3b4d] to-[#8b0000] overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Particles - only rendered on client side after mount */}
        <AnimatePresence>
          {isMounted && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: Math.random() * 0.5 + 0.1,
                    x: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
                    y: [Math.random() * 1200 - 600, Math.random() * 1200 - 600],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center justify-center space-y-12 sm:space-y-16">
          {/* AIM SURF Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg sm:max-w-xl md:max-w-2xl"
          >
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/SURF_Logo-NoYear.png"
              alt="AIM SURF MMID Logo"
              width={800}
              height={300}
              className="w-full h-auto"
              priority
            />
          </motion.div>
          
          {/* Coming Soon text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Coming Soon</h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
              The San Antonio Military Health and Universities Research Forum (SURF) will be returning in 2025 as part
              of the AIM Health R&D Summit.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
