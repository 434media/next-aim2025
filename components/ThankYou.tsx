"use client"

import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { RiMailLine, RiSparklingLine, RiHeartLine } from "@remixicon/react"
import { AnimatedText } from "./shared/AnimatedText"
import { ParticleField } from "./shared/ParticleField"
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.9, 0.7])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mouse tracking for interactive effects - disabled on mobile
  useEffect(() => {
    if (!prefersReducedMotion && !isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [prefersReducedMotion, isMobile])

  // Updated stats with only 3 cards
  const stats = [
    {
      label: "Attendees",
      value: "600+",
      icon: "👥",
      color: "from-cyan-300 to-blue-400",
      bgColor: "rgba(6, 182, 212, 0.1)",
      glowColor: "rgba(6, 182, 212, 0.3)",
      description: "Healthcare professionals and military leaders",
    },
    {
      label: "Speakers",
      value: "60+",
      icon: "🎤",
      color: "from-emerald-300 to-teal-400",
      bgColor: "rgba(16, 185, 129, 0.1)",
      glowColor: "rgba(16, 185, 129, 0.3)",
      description: "Industry experts and thought leaders",
    },
    {
      label: "Sessions",
      value: "70+",
      icon: "📋",
      color: "from-amber-300 to-orange-400",
      bgColor: "rgba(245, 158, 11, 0.1)",
      glowColor: "rgba(245, 158, 11, 0.3)",
      description: "Presentations, panels, and workshops",
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black scroll-mt-20"
      style={{ marginTop: "5rem" }}
    >
      {/* Enhanced Background with Accessible Overlays */}
      <motion.div className="absolute inset-0" style={!isMobile ? { y: backgroundY } : {}}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/80 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>
      </motion.div>

      {/* Enhanced Particle Field - Reduced on mobile */}
      <ParticleField
        particleCount={isMobile ? 20 : 80}
        color="rgba(6, 182, 212, 0.7)"
        size={4}
        speed={isMobile ? 0.1 : 0.3}
        prefersReducedMotion={prefersReducedMotion || isMobile}
      />

      {/* Interactive Mouse Glow Effect - Desktop only */}
      {!prefersReducedMotion && !isMobile && (
        <motion.div
          className="fixed pointer-events-none z-5"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            width: 600,
            height: 600,
            background: `radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        style={!isMobile ? { opacity: contentOpacity } : {}}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
          {/* Hero Thank You Message */}
          <motion.div variants={itemVariants} className="text-center space-y-8 lg:space-y-12">
            <motion.div
              className="inline-block"
              whileHover={
                !isMobile ? { scale: prefersReducedMotion ? 1 : 1.05, rotate: prefersReducedMotion ? 0 : 1 } : {}
              }
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            >
              <span className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-300/30 text-cyan-100 text-sm sm:text-base font-semibold backdrop-blur-md shadow-2xl">
                <RiSparklingLine className="mr-2 size-4 sm:size-5 text-cyan-300" />
                AIM {year} • Mission Accomplished
                <RiHeartLine className="ml-2 size-4 sm:size-5 text-rose-400" />
              </span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-6">
              {isMobile ? (
                <motion.h1
                  className="font-black text-white leading-[0.85] tracking-tight"
                  style={{
                    fontSize: "clamp(4rem, 18vw, 12rem)",
                    textShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3,
                  }}
                >
                  Thank You
                </motion.h1>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-emerald-400/20 to-blue-400/30 blur-3xl scale-150 opacity-80" />
                    <AnimatedText
                      text="Thank You"
                      className="relative font-black text-white drop-shadow-2xl text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]"
                      variant="glow"
                      prefersReducedMotion={prefersReducedMotion}
                      duration={2}
                    />
                </motion.div>
              )}

              {/* Subtitle */}
              <motion.p
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-200 leading-relaxed font-light max-w-4xl mx-auto"
                style={{
                  textShadow: "0 4px 25px rgba(0,0,0,0.9)",
                }}
                initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Together, we&apos;ve advanced the future of military medicine and healthcare innovation. Your
                participation made AIM {year} an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-bold">
                  unprecedented success
                </span>
                .
              </motion.p>
            </div>
          </motion.div>

          {/* Event Recap Carousel */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Relive the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                  Moments
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Relive the groundbreaking moments and innovative breakthroughs that defined AIM 2025. Access exclusive content and behind-the-scenes insights.
              </p>
            </motion.div>
            <EventRecapCarousel />
          </motion.div>

          {/* Smooth Stats Grid - Removed scale hover animation */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden h-full flex flex-col justify-center items-center text-center group"
                  style={{
                    backgroundColor: stat.bgColor,
                    borderColor: stat.glowColor,
                  }}
                >
                  {/* Static background gradient - no animation */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl`}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Static icon - subtle hover effect only */}
                    <div className="text-5xl lg:text-6xl xl:text-7xl mb-6 transition-transform duration-300 group-hover:scale-105">
                      {stat.icon}
                    </div>

                    {/* Static value with subtle hover effect */}
                    <div
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} ${
                        isMobile ? "text-4xl" : "text-5xl lg:text-6xl xl:text-7xl"
                      } mb-3 transition-all duration-300 group-hover:brightness-110`}
                      style={{
                        textShadow: `0 0 30px ${stat.glowColor}`,
                      }}
                    >
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-white text-xl lg:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-gray-100">
                      {stat.label}
                    </div>

                    {/* Description */}
                    <div className="text-gray-300 text-sm lg:text-base font-medium leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
                      {stat.description}
                    </div>
                  </div>
                </div>

                {/* Simplified hover glow effect - Desktop only, no complex animations */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 blur-2xl scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${stat.glowColor}, transparent)`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-8">
            <motion.p
              className="text-2xl italic font-light text-gray-100 max-w-3xl mx-auto"
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.9)",
              }}
            >
              &quot;The future of military medicine starts here, and it continues with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-semibold">
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
                  } text-xl py-6 px-12 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-cyan-400/40 font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 border-2 border-cyan-300/40 hover:border-cyan-200/60 text-white`}
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
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-gray-900/90 to-transparent pointer-events-none" />
    </section>
  )
})

ThankYou.displayName = "ThankYou"
