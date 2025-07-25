"use client"

import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { RiMailLine, RiSparklingLine, RiHeartLine } from "@remixicon/react"
import { EventRecapCarousel } from "./EventRecapCarousel"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { Button } from "./Button"

interface ThankYouProps {
  year?: number
}

export const ThankYou = React.memo(({ year = 2025 }: ThankYouProps) => {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.9, 0.7])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Enhanced stats with better descriptions - removed icons
  const stats = [
    {
      label: "Attendees",
      value: "600+",
      color: "from-cyan-600 to-blue-700",
      bgColor: "rgba(6, 182, 212, 0.1)",
      glowColor: "rgba(6, 182, 212, 0.3)",
      description: "Healthcare professionals and military leaders united",
    },
    {
      label: "Speakers",
      value: "60+",
      color: "from-emerald-600 to-teal-700",
      bgColor: "rgba(16, 185, 129, 0.1)",
      glowColor: "rgba(16, 185, 129, 0.3)",
      description: "Visionary experts sharing breakthrough insights",
    },
    {
      label: "Sessions",
      value: "70+",
      color: "from-amber-600 to-orange-700",
      bgColor: "rgba(245, 158, 11, 0.1)",
      glowColor: "rgba(245, 158, 11, 0.3)",
      description: "Transformative presentations and collaborative workshops",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.1 : 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion || isMobile ? 0 : 40,
      scale: prefersReducedMotion || isMobile ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion || isMobile ? 0.2 : 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="thank-you"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 scroll-mt-20"
    >
      {/* Enhanced Background with Accessible Overlays */}
      <motion.div className="absolute inset-0" style={!isMobile ? { y: backgroundY } : {}}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-50/80 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/40 via-transparent to-gray-100/40" />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        style={!isMobile ? { opacity: contentOpacity } : {}}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-16 mt-10 md:mt-6">
          {/* Mission Accomplished Badge - removed white background and shadow */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div className="inline-block" transition={{ duration: 0.5, type: "spring", stiffness: 300 }}>
              <span className="inline-flex items-center px-6 py-4 sm:px-8 sm:py-5 text-black text-lg sm:text-xl font-bold transition-all duration-300">
                <RiSparklingLine className="mr-3 size-5 sm:size-6 text-cyan-600" />
                AIM {year} • Mission Accomplished
                <RiHeartLine className="ml-3 size-5 sm:size-6 text-rose-500" />
              </span>
            </motion.div>
          </motion.div>

          {/* Hero: Relive the Moments */}
          <motion.div variants={itemVariants} className="text-center space-y-12 lg:space-y-16">
            {/* Main Title */}
            <div className="space-y-8">
              {isMobile ? (
                <motion.h1
                  className="font-black leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800"
                  style={{
                    fontSize: "clamp(3.5rem, 16vw, 10rem)",
                    textShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3,
                  }}
                >
                  Relive the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
                    Moments
                  </span>
                </motion.h1>
              ) : (
                <motion.h1
                  className="font-black leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800"
                  style={{
                    fontSize: "clamp(3.5rem, 16vw, 10rem)",
                    textShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3,
                  }}
                >
                  Relive the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
                    Moments
                  </span>
                </motion.h1>
              )}

              {/* Enhanced Subtitle - fixed to show transformative insights */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-700 leading-relaxed font-light max-w-6xl mx-auto"
                  style={{
                    textShadow: "0 4px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  Experience the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 font-semibold">
                    breakthrough innovations
                  </span>{" "}
                  and{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-800 font-semibold">
                    transformative insights
                  </span>{" "}
                  that defined AIM&nbsp;{year}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Event Recap Carousel - Enhanced */}
          <motion.div variants={itemVariants} className="space-y-8">
            <EventRecapCarousel />
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="bg-white backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 border-2 hover:border-gray-300/80 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden h-full flex flex-col justify-center items-center text-center group hover:scale-105 bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20"
                  style={{
                    borderColor: stat.glowColor,
                  }}
                >
                  {/* Enhanced background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />

                  <div className="relative z-10 space-y-6">
                    {/* Enhanced value - removed blur effect */}
                    <div
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} ${
                        isMobile ? "text-5xl" : "text-6xl lg:text-7xl xl:text-8xl"
                      } mb-4 transition-all duration-500 group-hover:brightness-125`}
                    >
                      {stat.value}
                    </div>

                    {/* Enhanced label */}
                    <div className="text-gray-900 text-2xl lg:text-3xl font-bold mb-3 transition-colors duration-300 group-hover:text-gray-800">
                      {stat.label}
                    </div>

                    {/* Enhanced description */}
                    <div className="text-gray-600 text-base lg:text-lg font-medium leading-relaxed transition-colors duration-300 group-hover:text-gray-700 max-w-xs mx-auto">
                      {stat.description}
                    </div>
                  </div>
                </div>

                {/* Enhanced hover glow effect - Desktop only */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-3xl scale-125"
                    style={{
                      background: `linear-gradient(135deg, ${stat.glowColor}, transparent, ${stat.glowColor})`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-10">
            <motion.p
              className="text-xl sm:text-2xl lg:text-3xl italic font-light text-gray-800 max-w-5xl mx-auto leading-relaxed"
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              &quot;The future of military medicine starts here, and it continues with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 font-semibold">
                you
              </span>
              .&quot;
            </motion.p>

            <div className="flex justify-center">
              <motion.div
                whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.05 } : {}}
                whileTap={!isMobile ? { scale: prefersReducedMotion ? 1 : 0.95 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="primary"
                  href="/contact-us"
                  className={`${
                    isMobile ? "w-full" : "w-auto"
                  } text-xl py-6 px-12 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 border-2 border-cyan-300/40 hover:border-cyan-200/60 text-white`}
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="flex items-center justify-center">
                    <RiMailLine className="mr-3 size-6" />
                    Stay Connected
                    <motion.div
                      className="ml-3"
                      animate={
                        prefersReducedMotion || isMobile
                          ? {}
                          : {
                              x: [0, 5, 0],
                              rotate: [0, 15, 0],
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      ✨
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-100 via-gray-50/95 to-transparent pointer-events-none" />
    </section>
  )
})

ThankYou.displayName = "ThankYou"
