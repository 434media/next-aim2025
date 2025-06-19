"use client"

import { motion } from "motion/react"
import { RiPlayCircleLine, RiTimerLine } from "@remixicon/react"
import { useState, useEffect } from "react"

interface ComingSoonVideoProps {
  title: string
  fullPage?: boolean
}

export const ComingSoonVideo = ({ title, fullPage = false }: ComingSoonVideoProps) => {
  const [particles, setParticles] = useState<
    Array<{ id: number; width: number; height: number; x: string; y: string }>
  >([])

  // Generate particles only on the client side after component mounts
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center text-center p-6 ${
        fullPage ? "aspect-video w-full min-h-[400px]" : "aspect-video w-full"
      }`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101310]/80 via-[#366A79]/50 to-[#4f4f2c]/30" />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.width,
              height: particle.height,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className={`${fullPage ? "scale-125" : ""} transition-transform duration-300`}>
        <RiPlayCircleLine className="text-[#548cac] w-16 h-16 mb-4 animate-pulse mx-auto" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-white mb-2">Video Coming Soon</h3>
        <p className="text-gray-300 max-w-md">
          The recording for <span className="text-white font-medium">{title}</span> is currently being processed and
          will be available shortly.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-[#548cac]">
          <RiTimerLine className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Check back soon</span>
        </div>
      </div>

      {fullPage && (
        <div className="absolute bottom-4 right-4 bg-black/30 px-3 py-1.5 rounded-full text-xs text-white/80">
          Coming June 2025
        </div>
      )}
    </div>
  )
}
