"use client"

import React, { useMemo, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  direction: { x: number; y: number }
  color: string
  blur: number
}

interface TitleParticleEffectProps {
  scrollProgress: number
  titleOpacity: number
  prefersReducedMotion: boolean
}

export const TitleParticleEffect = React.memo(
  ({ scrollProgress, titleOpacity, prefersReducedMotion }: TitleParticleEffectProps) => {
    const [isActive, setIsActive] = useState(false)
    const particleOpacity = useMotionValue(0)
    const springOpacity = useSpring(particleOpacity, { stiffness: 100, damping: 30 })

    // Activate particles when title starts fading (around 70% scroll)
    useEffect(() => {
      const shouldActivate = scrollProgress > 0.65 && titleOpacity < 0.9
      setIsActive(shouldActivate)

      if (shouldActivate) {
        // Particles become more visible as title fades
        const intensity = Math.max(0, (0.9 - titleOpacity) * 2)
        particleOpacity.set(intensity)
      } else {
        particleOpacity.set(0)
      }
    }, [scrollProgress, titleOpacity, particleOpacity])

    const particles = useMemo(() => {
      const particleCount = 20 // Increased for more impact
      const particles: Particle[] = []

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        const radius = Math.random() * 50 + 30

        particles.push({
          id: i,
          x: 50 + Math.cos(angle) * (Math.random() * 20 - 10), // Center around title
          y: 40 + Math.sin(angle) * (Math.random() * 15 - 7.5),
          size: Math.random() * 6 + 3, // Larger particles
          delay: Math.random() * 1,
          duration: Math.random() * 2 + 1.5,
          direction: {
            x: Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
            y: Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
          },
          color: i % 3 === 0 ? "#548cac" : i % 3 === 1 ? "#101310" : "#4f4f2c", // Updated colors for light background
          blur: Math.random() * 2,
        })
      }

      return particles
    }, [])

    if (prefersReducedMotion || !isActive) return null

    return (
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: springOpacity }}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              filter: `blur(${particle.blur}px)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0.6, 0],
              scale: [0, 1.2, 1, 0.3],
              x: [0, particle.direction.x * 0.5, particle.direction.x],
              y: [0, particle.direction.y * 0.5, particle.direction.y],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 1 + 0.5,
            }}
          />
        ))}

        {/* Additional glow effect - updated for light background */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-gray-300/20 via-transparent to-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.5, 2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            ease: "easeOut",
          }}
        />
      </motion.div>
    )
  },
)

TitleParticleEffect.displayName = "TitleParticleEffect"
