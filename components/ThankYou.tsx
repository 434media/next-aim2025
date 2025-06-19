"use client"

import { RiCalendarLine, RiHeartLine, RiMailLine, RiSparklingLine } from "@remixicon/react"
import { motion, useScroll, useTransform } from "motion/react"
import React, { useEffect, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { Button } from "./Button"
import { AnimatedText } from "./shared/AnimatedText"
import { ParticleField } from "./shared/ParticleField"

interface ThankYouProps {
  year?: number
}

export const ThankYou = React.memo(({ year = 2025 }: ThankYouProps) => {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [colorPhase, setColorPhase] = useState(0)

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.9, 0.7])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Color cycling animation - disabled on mobile
  useEffect(() => {
    if (!prefersReducedMotion && !isMobile) {
      const interval = setInterval(() => {
        setColorPhase((prev) => (prev + 1) % 4)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [prefersReducedMotion, isMobile])

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

  // Accessible color palette with high contrast ratios
  const colorThemes = [
    {
      primary: "from-cyan-300 to-blue-400", // High contrast against dark bg
      secondary: "from-emerald-300 to-teal-400",
      accent: "from-amber-300 to-orange-400",
      highlight: "from-pink-300 to-rose-400",
    },
    {
      primary: "from-violet-300 to-purple-400",
      secondary: "from-sky-300 to-cyan-400",
      accent: "from-lime-300 to-green-400",
      highlight: "from-rose-300 to-pink-400",
    },
    {
      primary: "from-blue-300 to-indigo-400",
      secondary: "from-teal-300 to-emerald-400",
      accent: "from-yellow-300 to-amber-400",
      highlight: "from-fuchsia-300 to-purple-400",
    },
    {
      primary: "from-emerald-300 to-green-400",
      secondary: "from-cyan-300 to-blue-400",
      accent: "from-orange-300 to-red-400",
      highlight: "from-violet-300 to-purple-400",
    },
  ]

  const currentTheme = colorThemes[colorPhase]

  const stats = [
    {
      label: "Attendees",
      value: "600+",
      icon: "👥",
      color: currentTheme.primary,
      bgColor: "rgba(6, 182, 212, 0.1)", // Cyan with transparency
      glowColor: "rgba(6, 182, 212, 0.3)",
    },
    {
      label: "Speakers",
      value: "60+",
      icon: "🎤",
      color: currentTheme.secondary,
      bgColor: "rgba(16, 185, 129, 0.1)", // Emerald with transparency
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
    {
      label: "Sessions",
      value: "70+",
      icon: "📋",
      color: currentTheme.accent,
      bgColor: "rgba(245, 158, 11, 0.1)", // Amber with transparency
      glowColor: "rgba(245, 158, 11, 0.3)",
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      id="thank-you"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black scroll-mt-20"
      style={{ marginTop: "5rem" }} // Account for navbar
    >
      {/* Enhanced Video Background with Accessible Overlays */}
      <motion.div className="absolute inset-0" style={!isMobile ? { y: backgroundY } : {}}>
        <div className="absolute inset-0">
          {/* High contrast overlays for accessibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/80 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>
      </motion.div>

      {/* Enhanced Particle Field with Accessible Colors - Reduced on mobile */}
      <ParticleField
        particleCount={isMobile ? 20 : 80}
        color="rgba(6, 182, 212, 0.7)" // High contrast cyan
        size={4}
        speed={isMobile ? 0.1 : 0.3}
        prefersReducedMotion={prefersReducedMotion || isMobile}
      />

      {/* Secondary particle layer with complementary color - Disabled on mobile */}
      {!isMobile && (
        <ParticleField
          particleCount={40}
          color="rgba(16, 185, 129, 0.5)" // High contrast emerald
          size={2}
          speed={0.7}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {/* Interactive Mouse Glow Effect with Dynamic Colors - Desktop only */}
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

      {/* Ambient Color Orbs for Atmosphere - Desktop only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                  scale: [1, 1.2, 1],
                  x: [-20, 20, -20],
                  y: [-10, 10, -10],
                }
            }
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                  scale: [1.2, 1, 1.2],
                  x: [20, -20, 20],
                  y: [10, -10, 10],
                }
            }
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}

      {/* Main Content with Enhanced Spacing */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        style={!isMobile ? { opacity: contentOpacity } : {}}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto text-center space-y-12 lg:space-y-16">
          {/* Enhanced Hero Thank You Message */}
          <motion.div variants={itemVariants} className="space-y-6 lg:space-y-10">
            <motion.div
              className="inline-block"
              whileHover={
                !isMobile ? { scale: prefersReducedMotion ? 1 : 1.05, rotate: prefersReducedMotion ? 0 : 1 } : {}
              }
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              variants={!isMobile ? floatingVariants : {}}
              animate={prefersReducedMotion || isMobile ? {} : "animate"}
            >
              <span className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-300/30 text-cyan-100 text-sm sm:text-base font-semibold backdrop-blur-md shadow-2xl">
                <RiSparklingLine className="mr-2 size-4 sm:size-5 text-cyan-300" />
                AIM {year} • Mission Accomplished
                <RiHeartLine className="ml-2 size-4 sm:size-5 text-rose-400" />
              </span>
            </motion.div>

            <div className="space-y-4 lg:space-y-8">
              {/* Mobile-specific Thank You text */}
              {isMobile ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <motion.h1
                    className="font-black text-white leading-[0.85] tracking-tight"
                    style={{
                      fontSize: "clamp(4rem, 18vw, 12rem)", // Responsive scaling from 64px to 192px
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
                </motion.div>
              ) : (
                // Desktop version with all effects
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Enhanced background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-emerald-400/20 to-blue-400/30 blur-3xl scale-150 opacity-80" />

                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                          filter: [
                            "brightness(1.1) contrast(1.05)",
                            "brightness(1.2) contrast(1.1)",
                            "brightness(1.1) contrast(1.05)",
                          ],
                        }
                    }
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{
                      filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                    }}
                  >
                    <div
                      style={{
                        WebkitTextStroke: "3px transparent",
                        WebkitTextFillColor: "white",
                        textShadow: `
          0 0 20px rgba(6, 182, 212, 0.8),
          0 0 40px rgba(16, 185, 129, 0.6),
          0 0 60px rgba(59, 130, 246, 0.4),
          0 8px 16px rgba(0, 0, 0, 0.9)
        `,
                        background: `
          linear-gradient(45deg, 
            rgba(6, 182, 212, 0.9) 0%, 
            rgba(16, 185, 129, 0.9) 25%, 
            rgba(59, 130, 246, 0.9) 50%, 
            rgba(16, 185, 129, 0.9) 75%, 
            rgba(6, 182, 212, 0.9) 100%
          )
        `,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextStrokeColor: "transparent",
                        backgroundImage: `
          linear-gradient(45deg, 
            rgba(6, 182, 212, 1) 0%, 
            rgba(16, 185, 129, 1) 25%, 
            rgba(59, 130, 246, 1) 50%, 
            rgba(16, 185, 129, 1) 75%, 
            rgba(6, 182, 212, 1) 100%
          )
        `,
                        WebkitTextStrokeWidth: "3px",
                      }}
                    >
                      <AnimatedText
                        text="Thank You"
                        className="relative font-black text-white drop-shadow-2xl text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]"
                        variant="glow"
                        prefersReducedMotion={prefersReducedMotion}
                        duration={2}
                      />
                    </div>
                  </motion.div>
                  {/* Enhanced glowing border effect */}
                  <div
                    className="absolute inset-0 blur-sm scale-105 opacity-70"
                    style={{
                      background: `
        linear-gradient(45deg, 
          rgba(6, 182, 212, 0.6) 0%, 
          rgba(16, 185, 129, 0.6) 25%, 
          rgba(59, 130, 246, 0.6) 50%, 
          rgba(16, 185, 129, 0.6) 75%, 
          rgba(6, 182, 212, 0.6) 100%
        )
      `,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      lineHeight: "inherit",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: -1,
                    }}
                  >
                    <span className="opacity-0">Thank You</span>
                  </div>
                </motion.div>
              )}

              {/* Subtitle - Mobile optimized */}
              {isMobile ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <motion.h2
                    className="font-bold text-white leading-tight tracking-tight"
                    style={{
                      fontSize: "clamp(2rem, 8vw, 5rem)", // Responsive scaling from 32px to 80px
                      textShadow: "0 4px 16px rgba(0, 0, 0, 0.8)",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 1,
                    }}
                  >
                    for Attending AIM
                  </motion.h2>
                </motion.div>
              ) : (
                // Desktop version
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{
                    textShadow: `
            0 0 20px rgba(255, 255, 255, 0.8),
            0 0 40px rgba(6, 182, 212, 0.6),
            0 8px 16px rgba(0, 0, 0, 0.9)
          `,
                    filter: "brightness(1.1) contrast(1.05)",
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.03)",
                  }}
                >
                  {/* Background glow for subtitle */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-cyan-300/30 blur-2xl scale-110 opacity-60" />

                  <AnimatedText
                    text="for Attending AIM"
                    className="relative font-bold text-white drop-shadow-xl text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                    delay={1}
                    prefersReducedMotion={prefersReducedMotion}
                    duration={1.5}
                  />
                </motion.div>
              )}
            </div>

            <motion.div variants={itemVariants} className="max-w-4xl mx-auto pt-4 lg:pt-8">
              <motion.p
                className={`text-gray-100 leading-relaxed font-medium ${isMobile ? "text-lg sm:text-xl" : "text-xl lg:text-2xl xl:text-3xl"
                  }`}
                style={{
                  textShadow: "0 4px 25px rgba(0,0,0,0.9)",
                }}
                whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.01 } : {}}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: isMobile ? 15 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                {...(isMobile && {
                  transition: { duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] },
                })}
              >
                Together, we&apos;ve advanced the future of military medicine and healthcare innovation. Your
                participation made AIM {year} an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-bold">
                  unprecedented success
                </span>
                .
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Grid with Accessible Colors */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                whileHover={
                  !isMobile
                    ? {
                      scale: prefersReducedMotion ? 1 : 1.08,
                      y: prefersReducedMotion ? 0 : -8,
                      rotateY: prefersReducedMotion ? 0 : 5,
                    }
                    : {}
                }
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: isMobile ? 20 : 50, rotateX: isMobile ? 0 : -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
              >
                <div
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden"
                  style={{
                    backgroundColor: stat.bgColor,
                    borderColor: stat.glowColor,
                  }}
                >
                  {/* Animated background gradient with accessible colors */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-25 transition-opacity duration-500 rounded-3xl`}
                    initial={false}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl lg:text-5xl mb-4"
                      animate={
                        prefersReducedMotion || isMobile
                          ? {}
                          : {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }
                      }
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.2,
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} ${isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
                        }`}
                      style={{
                        textShadow: `0 0 20px ${stat.glowColor}`,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-200 text-lg font-semibold mt-2">{stat.label}</div>
                  </div>
                </div>

                {/* Enhanced hover glow effect with accessible colors - Desktop only */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 blur-2xl scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${stat.glowColor}, transparent)`,
                    }}
                    initial={false}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Future Content Section - AIM 2025 Highlights & AIM 2026 Announcements */}
          <motion.div variants={itemVariants} className="relative mt-16 lg:mt-20">
            {/* Divider with animated glow */}
            <motion.div
              className="flex items-center justify-center mb-12 lg:mb-16"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: isMobile ? 0.8 : 1.5, delay: 0.5 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent w-full max-w-md" />
              <motion.div
                className="mx-8 text-4xl"
                animate={
                  prefersReducedMotion || isMobile
                    ? {}
                    : {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }
                }
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                ⭐
              </motion.div>
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent w-full max-w-md" />
            </motion.div>

            {/* Future Content Cards */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16 lg:mb-20">
              {/* AIM 2025 Highlights Card */}
              <motion.div
                className="relative group"
                whileHover={
                  !isMobile
                    ? {
                      scale: prefersReducedMotion ? 1 : 1.03,
                      y: prefersReducedMotion ? 0 : -10,
                    }
                    : {}
                }
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, x: isMobile ? 0 : -50, rotateY: isMobile ? 0 : -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
              >
                <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border-2 border-cyan-300/30 hover:border-cyan-200/50 transition-all duration-500 shadow-2xl hover:shadow-cyan-400/20 overflow-hidden h-full flex flex-col">
                  {/* Animated background pattern - Desktop only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), 
                                         radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
                      }}
                      animate={
                        prefersReducedMotion
                          ? {}
                          : {
                            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                          }
                      }
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div
                      className="flex items-center mb-6"
                      animate={
                        prefersReducedMotion || isMobile
                          ? {}
                          : {
                            x: [0, 5, 0],
                          }
                      }
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <RiCalendarLine className="size-8 text-cyan-300 mr-4" />
                      <span className="text-cyan-200 text-sm font-semibold uppercase tracking-wider">Coming Soon</span>
                    </motion.div>

                    <motion.h3
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200 mb-6 ${isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
                        }`}
                      style={{
                        textShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
                      }}
                      animate={
                        prefersReducedMotion || isMobile
                          ? {}
                          : {
                            filter: [
                              "brightness(1) contrast(1)",
                              "brightness(1.2) contrast(1.1)",
                              "brightness(1) contrast(1)",
                            ],
                          }
                      }
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      AIM {year} Content
                    </motion.h3>

                    <p className="text-gray-200 text-lg leading-relaxed mb-8 flex-1">
                      Relive the groundbreaking moments and innovative breakthroughs that defined AIM {year}. Access
                      exclusive content and behind-the-scenes insights.
                    </p>

                    <motion.div
                      className="flex flex-wrap gap-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {["Session Recordings", "Keynote Highlights", "Innovation Showcase"].map((item, index) => (
                        <motion.span
                          key={item}
                          className="px-4 py-2 bg-cyan-500/20 border border-cyan-300/30 rounded-full text-cyan-100 text-sm font-medium backdrop-blur-sm"
                          variants={itemVariants}
                          whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.05 } : {}}
                          animate={
                            prefersReducedMotion || isMobile
                              ? {}
                              : {
                                boxShadow: [
                                  "0 0 0 rgba(6, 182, 212, 0)",
                                  "0 0 20px rgba(6, 182, 212, 0.3)",
                                  "0 0 0 rgba(6, 182, 212, 0)",
                                ],
                              }
                          }
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.5,
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Hover glow effect - Desktop only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 blur-2xl scale-110"
                      style={{
                        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.3))",
                      }}
                      initial={false}
                    />
                  )}
                </div>
              </motion.div>

              {/* AIM 2026 Announcements Card */}
              <motion.div
                className="relative group"
                whileHover={
                  !isMobile
                    ? {
                      scale: prefersReducedMotion ? 1 : 1.03,
                      y: prefersReducedMotion ? 0 : -10,
                    }
                    : {}
                }
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, x: isMobile ? 0 : 50, rotateY: isMobile ? 0 : 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
              >
                <div className="relative bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border-2 border-emerald-300/30 hover:border-emerald-200/50 transition-all duration-500 shadow-2xl hover:shadow-emerald-400/20 overflow-hidden h-full flex flex-col">
                  {/* Animated background pattern - Desktop only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), 
                                         radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
                      }}
                      animate={
                        prefersReducedMotion
                          ? {}
                          : {
                            backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"],
                          }
                      }
                      transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div
                      className="flex items-center mb-6"
                      animate={
                        prefersReducedMotion || isMobile
                          ? {}
                          : {
                            x: [0, -5, 0],
                          }
                      }
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    >
                      <RiSparklingLine className="size-8 text-emerald-300 mr-4" />
                      <span className="text-emerald-200 text-sm font-semibold uppercase tracking-wider">
                        Next Chapter
                      </span>
                    </motion.div>

                    <motion.h3
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200 mb-6 ${isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
                        }`}
                      style={{
                        textShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
                      }}
                      animate={
                        prefersReducedMotion || isMobile
                          ? {}
                          : {
                            filter: [
                              "brightness(1) contrast(1)",
                              "brightness(1.2) contrast(1.1)",
                              "brightness(1) contrast(1)",
                            ],
                          }
                      }
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                    >
                      AIM 2026 Preview
                    </motion.h3>

                    <p className="text-gray-200 text-lg leading-relaxed mb-8 flex-1">
                      Be the first to discover what&apos;s next in military medicine innovation. Get exclusive early
                      access to AIM 2026 announcements, speaker reveals, and registration opportunities.
                    </p>

                    <motion.div
                      className="flex flex-wrap gap-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {["Early Access", "Speaker Reveals", "Exclusive Updates"].map((item, index) => (
                        <motion.span
                          key={item}
                          className="px-4 py-2 bg-emerald-500/20 border border-emerald-300/30 rounded-full text-emerald-100 text-sm font-medium backdrop-blur-sm"
                          variants={itemVariants}
                          whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.05 } : {}}
                          animate={
                            prefersReducedMotion || isMobile
                              ? {}
                              : {
                                boxShadow: [
                                  "0 0 0 rgba(16, 185, 129, 0)",
                                  "0 0 20px rgba(16, 185, 129, 0.3)",
                                  "0 0 0 rgba(16, 185, 129, 0)",
                                ],
                              }
                          }
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.5 + 1,
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Hover glow effect - Desktop only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 blur-2xl scale-110"
                      style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.3))",
                      }}
                      initial={false}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Call to Action with High Contrast */}
          <motion.div variants={itemVariants} className="space-y-10">
            <div className="flex justify-center items-center max-w-2xl mx-auto">
              <motion.div
                whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.05 } : {}}
                whileTap={!isMobile ? { scale: prefersReducedMotion ? 1 : 0.95 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="primary"
                  href="/contact-us"
                  className={`${isMobile ? "w-full" : "w-auto"
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

          {/* Enhanced Closing Message with High Contrast */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <motion.p
              className="text-gray-100 text-2xl italic font-light"
              animate={
                prefersReducedMotion || isMobile
                  ? {}
                  : {
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.02, 1],
                  }
              }
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
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
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-gray-900/90 to-transparent pointer-events-none" />

      {/* Accessible Decorative Elements - Desktop only */}
      {!isMobile && (
        <>
          <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-400 rounded-full opacity-80 animate-pulse shadow-lg shadow-cyan-400/50" />
          <div
            className="absolute top-40 right-20 w-4 h-4 bg-emerald-400 rounded-full opacity-60 animate-pulse shadow-lg shadow-emerald-400/50"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-40 left-20 w-2 h-2 bg-white rounded-full opacity-90 animate-pulse shadow-lg shadow-white/50"
            style={{ animationDelay: "2s" }}
          />
        </>
      )}
    </section>
  )
})

ThankYou.displayName = "ThankYou"
