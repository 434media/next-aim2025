"use client"

import React from "react"
import { motion, type MotionValue } from "motion/react"
import { AnimatedHeroText } from "./AnimatedHeroText"
import { ParticleBackground } from "./ParticleBackground"

interface HeroTitleProps {
  animationProgress: MotionValue<number>
  prefersReducedMotion: boolean
  isMobile: boolean
  className?: string
  style?: React.CSSProperties
}

export const HeroTitle = React.memo(
  ({ animationProgress, prefersReducedMotion, isMobile, className = "", style = {} }: HeroTitleProps) => {
    return (
      <div className={`md:mt-10 relative overflow-hidden ${className}`} style={style}>
        <ParticleBackground prefersReducedMotion={prefersReducedMotion} />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-70" />
        <motion.h1
          className={`relative z-10 ${
            isMobile ? "text-4xl" : "md:text-6xl lg:text-7xl md:mt-2"
          } font-bold text-gray-900 tracking-tighter text-balance overflow-hidden`}
          style={{
            lineHeight: "0.85",
          }}
        >
          <span className="overflow-hidden">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#548cac] to-[#4f4f2c]">
              The Future of Military Medicine Starts{" "}
            </span>
            <AnimatedHeroText animationProgress={animationProgress} prefersReducedMotion={prefersReducedMotion} />
          </span>
        </motion.h1>
      </div>
    )
  },
)

HeroTitle.displayName = "HeroTitle"
