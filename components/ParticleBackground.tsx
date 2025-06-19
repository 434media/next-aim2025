"use client"

import { motion } from "motion/react"
import { type ReactNode, useId, useMemo } from "react"

interface ParticleBackgroundProps {
  children?: ReactNode
  className?: string
  particleCount?: number
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
}

// Generate deterministic "random" values based on a seed
function seededRandom(seed: number): () => number {
  return () => {
    // Simple xorshift algorithm
    seed ^= seed << 13
    seed ^= seed >> 17
    seed ^= seed << 5
    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
  }
}

const ParticleBackground = ({
  children,
  className = "",
  particleCount = 20,
  gradientFrom = "[#101310]",
  gradientVia = "[#366A79]",
  gradientTo = "[#4f4f2c]",
}: ParticleBackgroundProps) => {
  // Use a stable ID as seed for the random generator
  const id = useId()
  const seed = useMemo(() => {
    // Create a numeric seed from the ID string
    return Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  }, [id])

  // Create a deterministic random function
  const getRandom = useMemo(() => seededRandom(seed), [seed])

  // Pre-generate all particle properties
  const particles = useMemo(() => {
    // Explicitly type random as a function that returns a number
    const random: () => number = getRandom

    return Array.from({ length: particleCount }).map(() => {
      // Generate stable values for each particle
      const size = random() * 6 + 2
      const x = random() * 1200 - 600
      const y = random() * 1200 - 600
      const opacity = random() * 0.5 + 0.2
      const duration = random() * 20 + 15

      // Target position for animation
      const targetX = random() * 1200 - 600
      const targetY = random() * 1200 - 600

      return { size, x, y, opacity, duration, targetX, targetY }
    })
  }, [particleCount, getRandom])

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-${gradientFrom} via-${gradientVia} to-${gradientTo} ${className}`}
      aria-hidden="true"
    >
      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
          }}
          animate={{
            x: particle.targetX,
            y: particle.targetY,
            opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Content container */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default ParticleBackground

