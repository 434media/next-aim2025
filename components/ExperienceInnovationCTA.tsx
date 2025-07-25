"use client"

import type React from "react"
import { motion } from "motion/react"
import { useInView } from "react-intersection-observer"
import { Button } from "./Button"
import { useReducedMotion } from "../hooks/useReducedMotion"

interface ExperienceInnovationCTAProps {
  className?: string
}

export const ExperienceInnovationCTA: React.FC<ExperienceInnovationCTAProps> = ({ className = "" }) => {
  const prefersReducedMotion = useReducedMotion()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px 0px",
  })

  return (
    <section
      ref={ref}
      className={`relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #548cac 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #4f4f2c 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#548cac]/20 to-neutral-500/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#4f4f2c]/20 to-[#548cac]/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Title */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-[#548cac] via-neutral-900 to-[#4f4f2c] bg-clip-text text-transparent">
                Experience Innovation
              </span>
            </motion.h2>

            {/* Decorative Line */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[#548cac] to-neutral-600 mx-auto rounded-full mb-8"
              initial={prefersReducedMotion ? { width: 96 } : { width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* Description */}
            <motion.p
              className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-12 leading-relaxed font-medium max-w-3xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join leaders from academia, industry, and military sectors in meaningful discussions that shape the future
              of healthcare technology.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }
              }
            >
              <Button
                href="/contact-us"
                variant="primary"
                className="group relative px-8 py-4 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Button Background Effect */}
                <span className="relative z-10 flex items-center gap-3">
                  Get in Touch
                  <motion.span
                    className="inline-block"
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            x: [0, 4, 0],
                          }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              className="text-sm sm:text-base text-gray-600 mt-6 max-w-2xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Ready to be part of the future of military health innovation? Contact us to learn more about participation
              opportunities.
            </motion.p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-12 border-t border-gray-200"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { number: "600+", label: "Attendees" },
              { number: "60+", label: "Speakers" },
              { number: "70+", label: "Sessions" },
              { number: "100%", label: "Innovation" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -4,
                        transition: { duration: 0.2 },
                      }
                }
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-[#548cac] transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
