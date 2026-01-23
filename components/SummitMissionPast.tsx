"use client"

import { motion, useReducedMotion } from "motion/react"
import { useInView } from "react-intersection-observer"
import { EditableText } from "./admin/EditableText"
import { MissionAccomplishedBadge } from "./MissionAccomplishedBadge"
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation"

export function SummitMissionPast() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
    threshold: 0.1,
  })

  const prefersReducedMotion = useReducedMotion()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const heroTextVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
  }

  const blackContainerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.6,
      },
    },
  }

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-white overflow-hidden"
    >
      {/* Background Gradient Animation */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(240, 253, 244)"
        gradientBackgroundEnd="rgb(224, 242, 254)"
        firstColor="34, 197, 94"
        secondColor="59, 130, 246"
        thirdColor="14, 165, 233"
        fourthColor="16, 185, 129"
        fifthColor="125, 211, 252"
        pointerColor="34, 197, 94"
        size="30%"
        blendingValue="normal"
        interactive={true}
        containerClassName="absolute inset-0 opacity-30"
      />

      {inView && (
        <motion.section
          className="relative z-10 min-h-screen flex flex-col pt-24 md:pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="region"
          aria-labelledby="summit-mission-heading"
        >
          {/* Mission Accomplished Badge */}
          <motion.div
            className="pt-8 pb-4 flex justify-center"
            variants={itemVariants}
          >
            <MissionAccomplishedBadge />
          </motion.div>

          {/* Hero Title Section */}
          <motion.div
            className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pb-8"
            variants={heroTextVariants}
          >
            <div className="text-center max-w-5xl mx-auto">
              {/* Main Hero Text */}
              <motion.h1
                id="summit-mission-heading"
                className="font-black tracking-tighter text-gray-900 leading-[0.85] mb-6"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <EditableText textId="aim2025-hero-title-1">FROM THE</EditableText>
                </motion.div>
                <motion.div
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] text-[#0369A1]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <EditableText textId="aim2025-hero-title-2">BENCH</EditableText>
                </motion.div>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <EditableText textId="aim2025-hero-subtitle">TO THE BATTLEFIELD</EditableText>
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="w-32 sm:w-48 md:w-64 h-1 bg-gradient-to-r from-[#0369A1] to-[#0EA5E9] rounded-full mx-auto"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Black Container with Mission Content */}
          <motion.div
            className="relative"
            variants={blackContainerVariants}
          >
            {/* Background shape with subtle animation */}
            <motion.div
              className="absolute inset-0 bg-neutral-950 rounded-t-3xl sm:rounded-t-[2rem] md:rounded-t-[3rem] max-w-7xl mx-auto"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ transformOrigin: "bottom" }}
            />

            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  className="grid gap-8 sm:gap-12 md:gap-16 lg:gap-20"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.3,
                        delayChildren: 1.2,
                      },
                    },
                  }}
                >
                  {/* Mission Statement 1 */}
                  <motion.div
                    className="group"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                  >
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <motion.div
                        className="flex-shrink-0 mt-2"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-2 h-16 sm:h-20 bg-gradient-to-b from-[#0EA5E9] to-[#0369A1] rounded-full" />
                      </motion.div>
                      <motion.p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light"
                        whileHover={prefersReducedMotion ? {} : { x: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        Designed to advance emerging technologies from the bench to the battlefield, the{" "}
                        <span className="text-[#0EA5E9] font-semibold">AIM Health R&D Summit</span> brought together
                        academia, industry, and the military in a unified forum to promote cross-sector partnership in
                        the development of{" "}
                        <span className="text-white font-semibold">life-saving medical innovations</span>.
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Mission Statement 2 */}
                  <motion.div
                    className="group"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                  >
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <motion.div
                        className="flex-shrink-0 mt-2"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-2 h-16 sm:h-20 bg-gradient-to-b from-[#0EA5E9] to-[#0369A1] rounded-full" />
                      </motion.div>
                      <motion.p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light"
                        whileHover={prefersReducedMotion ? {} : { x: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        By connecting top innovators across sectors,{" "}
                        <span className="text-[#0EA5E9] font-semibold">AIM</span> created pathways to discovery and
                        commercialization while addressing common critical challenges in military and civilian
                        healthcare, encouraging the{" "}
                        <span className="text-white font-semibold">cross-pollination of ideas and expertise</span> to
                        drive forward the next generation of breakthroughs.
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Mission Statement 3 */}
                  <motion.div
                    className="group"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                  >
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <motion.div
                        className="flex-shrink-0 mt-2"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-2 h-16 sm:h-20 bg-gradient-to-b from-[#0EA5E9] to-[#0369A1] rounded-full" />
                      </motion.div>
                      <motion.p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light"
                        whileHover={prefersReducedMotion ? {} : { x: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        The collaboration between researchers, innovators, and military leaders served as a{" "}
                        <span className="text-white font-semibold">catalyst for medical advancements</span> that not
                        only enhanced military readiness but also had the potential to{" "}
                        <span className="text-[#0EA5E9] font-semibold">
                          improve healthcare outcomes on a global scale
                        </span>
                        .
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Bottom decorative element */}
                <motion.div
                  className="flex justify-center mt-12 sm:mt-16 md:mt-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 2 }}
                >
                  <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#0369A1] to-[#0EA5E9] rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      )}
    </div>
  )
}
