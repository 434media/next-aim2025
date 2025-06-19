"use client"

import React, { useState, useEffect } from "react"
import { motion, type MotionValue } from "motion/react"

interface AnimatedHeroTextProps {
  animationProgress: MotionValue<number>
  prefersReducedMotion: boolean
}

export const AnimatedHeroText = React.memo(({ animationProgress, prefersReducedMotion }: AnimatedHeroTextProps) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      size: number
      left: number
      top: number
      opacity: number
      xOffset: number
      yOffset: number
      duration: number
      delay: number
    }>
  >([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.8 + 0.2,
        xOffset: Math.random() * 40 - 20,
        yOffset: Math.random() * 40 - 20,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 1,
      })),
    )
  }, [])

  const [showNow, setShowNow] = useState(false)

  useEffect(() => {
    const unsubscribe = animationProgress.on("change", (latest: number) => {
      setShowNow(latest > 0.1)
    })
    return unsubscribe
  }, [animationProgress])

  const currentText = showNow ? "Now" : "Here"
  const currentGradient = showNow
    ? "bg-gradient-to-r from-[#f97316] via-[#f59e0b] to-[#fbbf24]"
    : "bg-gradient-to-l from-[#548cac] to-[#4f4f2c]"
  const particleColor = showNow ? "#f97316" : "#548cac"
  const secondaryParticleColor = showNow ? "#fbbf24" : "#4f4f2c"

  return (
    <span className="relative inline font-extrabold overflow-hidden">
      {/* Enhanced particle system */}
      {!prefersReducedMotion && isClient && particles.length > 0 && (
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ transform: "scale(1.4)" }}
        >
          {particles.map((particle, index) => (
            <motion.div
              key={`hero-particle-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: index % 3 === 0 ? secondaryParticleColor : particleColor,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 3}px ${index % 3 === 0 ? secondaryParticleColor : particleColor}`,
                filter: `blur(${particle.size * 0.15}px)`,
              }}
              animate={{
                x: [0, particle.xOffset, -particle.xOffset * 0.6, 0],
                y: [0, particle.yOffset, -particle.yOffset * 0.6, 0],
                opacity: [particle.opacity, particle.opacity * 0.2, particle.opacity, particle.opacity],
                scale: [1, 2, 0.4, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Orbiting particles for extra wow */}
      {!prefersReducedMotion && isClient && (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`orbit-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: 3,
                height: 3,
                backgroundColor: i % 2 === 0 ? particleColor : secondaryParticleColor,
                boxShadow: `0 0 10px ${i % 2 === 0 ? particleColor : secondaryParticleColor}`,
                left: "50%",
                top: "50%",
                filter: "blur(0.2px)",
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 45],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 45],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Main text with enhanced effects */}
      <motion.span
        className={`relative z-10 text-transparent bg-clip-text ${currentGradient} font-extrabold`}
        style={{
          verticalAlign: "baseline",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
        }}
        animate={{
          scale: showNow ? [1, 1.08, 1] : 1,
          filter: showNow
            ? [
                "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                "drop-shadow(0 8px 20px rgba(249,115,22,0.4))",
                "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
              ]
            : "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {currentText}
      </motion.span>

      {/* Enhanced underline animation */}
      {!prefersReducedMotion && isClient && showNow && (
        <motion.div
          key={`hero-text-underline-${currentText}`}
          className="absolute bottom-0 left-0 right-0 h-1.5 overflow-hidden"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${
              showNow ? "rgba(249,115,22,1)" : "rgba(84,140,172,1)"
            } 50%, transparent 100%)`,
            boxShadow: `0 0 20px ${showNow ? "rgba(249,115,22,0.8)" : "rgba(84,140,172,0.8)"}, 
                        0 0 40px ${showNow ? "rgba(249,115,22,0.6)" : "rgba(84,140,172,0.6)"}`,
            borderRadius: "3px",
          }}
          initial={{ x: "-120%", scaleX: 0.3 }}
          animate={{ x: "120%", scaleX: [0.3, 1.2, 0.3] }}
          transition={{
            duration: 2.2,
            ease: [0.25, 0.46, 0.36, 0.94],
          }}
        />
      )}

      <span className="invisible font-extrabold" aria-hidden="true">
        Here
      </span>
    </span>
  )
})

AnimatedHeroText.displayName = "AnimatedHeroText"
