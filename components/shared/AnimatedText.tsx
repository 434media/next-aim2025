"use client"

import React from "react"
import { motion } from "motion/react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  prefersReducedMotion?: boolean
  variant?: "fadeUp" | "slideIn" | "typewriter" | "glow"
}

export const AnimatedText = React.memo(
  ({
    text,
    className = "",
    delay = 0,
    duration = 0.8,
    stagger = 0.05,
    prefersReducedMotion = false,
    variant = "fadeUp",
  }: AnimatedTextProps) => {
    const words = text.split(" ")

    const getVariantAnimation = () => {
      if (prefersReducedMotion) {
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
        }
      }

      switch (variant) {
        case "slideIn":
          return {
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration, ease: [0.22, 1, 0.36, 1] },
          }
        case "typewriter":
          return {
            initial: { width: 0 },
            animate: { width: "auto" },
            transition: { duration: duration * 2, ease: "easeInOut" },
          }
        case "glow":
          return {
            initial: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
            animate: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              textShadow: [
                "0 0 20px rgba(84, 140, 172, 0.5)",
                "0 0 40px rgba(84, 140, 172, 0.3)",
                "0 0 20px rgba(84, 140, 172, 0.5)",
              ],
            },
            transition: {
              duration,
              ease: [0.22, 1, 0.36, 1],
              textShadow: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse" as const,
              },
            },
          }
        default: // fadeUp
          return {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration, ease: [0.22, 1, 0.36, 1] },
          }
      }
    }

    if (variant === "typewriter") {
      return (
        <motion.div className={`overflow-hidden ${className}`} initial="initial" animate="animate">
          <motion.span {...getVariantAnimation()}>{text}</motion.span>
        </motion.div>
      )
    }

    return (
      <motion.div
        className={className}
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, index) => {
          const animation = getVariantAnimation();
          return (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={animation.initial}
              animate={animation.animate}
              transition={animation.transition}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    )
  },
)

AnimatedText.displayName = "AnimatedText"
