"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"

interface ParticleBackgroundProps {
  prefersReducedMotion: boolean
}

export const ParticleBackground = React.memo(({ prefersReducedMotion }: ParticleBackgroundProps) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      size: number
      color: string
      left: number
      top: number
      opacity: number
      duration: number
      xOffset: number
      yOffset: number
    }>
  >([])

  useEffect(() => {
    if (prefersReducedMotion) return

    setParticles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        color: ["#548cac", "#4f4f2c", "#f97316", "#101310"][Math.floor(Math.random() * 4)], // Updated colors for light background
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1, // Reduced opacity for light background
        duration: Math.random() * 12 + 8,
        xOffset: Math.random() * 30 - 15,
        yOffset: Math.random() * 30 - 15,
      })),
    )
  }, [prefersReducedMotion])

  if (prefersReducedMotion || particles.length === 0) return null

  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={`sticky-particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            willChange: "transform",
            filter: `blur(${particle.size * 0.2}px)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            x: [0, particle.xOffset, -particle.xOffset * 0.5, 0],
            y: [0, particle.yOffset, -particle.yOffset * 0.5, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [particle.opacity, particle.opacity * 0.4, particle.opacity * 0.9, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
})

ParticleBackground.displayName = "ParticleBackground"
