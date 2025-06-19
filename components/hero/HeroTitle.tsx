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
      <div
        className={`md:mt-10 relative overflow-hidden bg-[#101310]/95 backdrop-blur-md py-4 px-4 sm:px-6 shadow-2xl ${className}`}
        style={style}
      >
        <ParticleBackground prefersReducedMotion={prefersReducedMotion} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#101310] via-transparent to-transparent opacity-70" />
        <motion.h1
          className={`relative z-10 ${
            isMobile ? "text-3xl md:text-4xl" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          } font-bold text-white tracking-tight text-balance overflow-hidden`}
          style={{
            textShadow: isMobile
              ? "0 6px 30px rgba(0,0,0,0.9), 0 12px 60px rgba(0,0,0,0.6)"
              : "0 8px 40px rgba(0,0,0,0.9), 0 16px 80px rgba(0,0,0,0.6)",
            lineHeight: "0.85",
          }}
        >
          <span className={`block ${isMobile ? "mb-1" : "mb-2 sm:mb-0"}`}>AIM2025:</span>
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
