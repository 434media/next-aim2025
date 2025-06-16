"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"

interface Particle {
  id: number
  width: number
  height: number
  left: string
  top: string
  animateX: number[]
  animateY: number[]
  duration: number
  delay: number
}

interface ParticleFieldProps {
  particleCount?: number
  className?: string
  color?: string
  size?: number
  speed?: number
  prefersReducedMotion?: boolean
}

export const ParticleField = React.memo(
  ({
    particleCount = 50,
    className = "",
    color = "rgba(84, 140, 172, 0.6)",
    size = 2,
    prefersReducedMotion = false,
  }: ParticleFieldProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [particles, setParticles] = useState<Particle[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)

      // Generate particles after hydration to avoid SSR mismatch
      const generatedParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        width: size + Math.random() * size,
        height: size + Math.random() * size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animateX: [0, Math.random() * 100 - 50],
        animateY: [0, Math.random() * 100 - 50],
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      }))

      setParticles(generatedParticles)
    }, [particleCount, size])

    if (prefersReducedMotion) {
      return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${color} 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      )
    }

    if (!isClient || particles.length === 0) {
      return <div className={`absolute inset-0 pointer-events-none ${className}`} />
    }

    return (
      <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              backgroundColor: color,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              x: particle.animateX,
              y: particle.animateY,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  },
)

ParticleField.displayName = "ParticleField"
