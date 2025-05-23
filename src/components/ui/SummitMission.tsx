"use client"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "../Button"
import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeDiv } from "../Fade"
import { useInView } from "react-intersection-observer"
import ParticleBackground from "../ParticleBackground"

/**
 * A component that showcases the AIM Summit mission with animated content
 */
export function SummitMission() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
    threshold: 0.1,
  })

  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="relative">
      {inView && (
        <ParticleBackground
          gradientFrom="#0F1419"
          gradientVia="#1A2B3D"
          gradientTo="#2D4A5C"
          particleCount={45}
          className="py-24 sm:py-32"
        >
          <section
            id="summit-mission"
            aria-labelledby="summit-mission-heading"
            className="relative w-full overflow-hidden"
          >
            {/* Enhanced decorative elements with subtle animations */}
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#366A79]/15 to-[#548cac]/20 blur-2xl"
              aria-hidden="true"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.div
              className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-tl from-[#366A79]/15 to-[#548cac]/20 blur-2xl"
              aria-hidden="true"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            ></motion.div>

            {/* Additional subtle background elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#366A79]/8 to-[#548cac]/12 blur-3xl transform -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            ></motion.div>

            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  className="text-center"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.8 }}
                >
                  <h2
                    id="summit-mission-heading"
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-10"
                  >
                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <span className="block text-[#7DD3FC] drop-shadow-lg filter brightness-110">From The Bench</span>
                    </motion.div>

                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className="relative inline-block">
                        To The Battlefield
                        <motion.span
                          className="absolute -bottom-3 left-0 h-1.5 bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#0EA5E9] w-full rounded-full shadow-lg"
                          initial={prefersReducedMotion ? { width: "100%" } : { width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: prefersReducedMotion ? 0.1 : 1.2, delay: 0.8 }}
                          aria-hidden="true"
                        />
                      </span>
                    </motion.div>
                  </h2>

                  <div className="mt-12 space-y-6 text-left">
                    <motion.div
                      className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <p className="mb-6">
                        Designed to advance emerging technologies from the bench to the battlefield, the
                        <span className="text-[#7DD3FC] font-semibold"> AIM Health R&D Summit </span>
                        brings together academia, industry, and the military in a unified forum to promote cross-sector
                        partnership in the development of
                        <span className="text-white font-semibold"> life-saving medical innovations</span>.
                      </p>

                      <p className="mb-6">
                        By connecting top innovators across sectors,
                        <span className="text-[#7DD3FC] font-semibold"> AIM </span>
                        creates pathways to discovery and commercialization while addressing common critical challenges
                        in military and civilian healthcare, encouraging the
                        <span className="text-white font-semibold"> cross-pollination of ideas and expertise </span>
                        to drive forward the next generation of breakthroughs.
                      </p>

                      <p>
                        The collaboration between researchers, innovators, and military leaders serves as a
                        <span className="text-white font-semibold"> catalyst for medical advancements </span>
                        that not only enhance military readiness but also have the potential to
                        <span className="text-[#7DD3FC] font-semibold">
                          {" "}
                          improve healthcare outcomes on a global scale
                        </span>
                        .
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <FadeDiv>
                      <Button
                        variant="primary"
                        href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#548cac] focus-visible:outline-none transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                        aria-label="Register to Attend the AIM Health R&D Summit (opens in new tab)"
                      >
                        <span className="flex items-center justify-center">
                          Register to Attend
                          <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                        </span>
                      </Button>
                    </FadeDiv>

                    <FadeDiv>
                      <Button
                        variant="secondary"
                        href="https://support.velocitytx.org/campaign/642575/donate"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#548cac] focus-visible:outline-none transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                        aria-label="Become a Sponsor for the AIM Health R&D Summit (opens in new tab)"
                      >
                        <span className="flex items-center justify-center">
                          Become a Sponsor
                          <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                        </span>
                      </Button>
                    </FadeDiv>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </ParticleBackground>
      )}
    </div>
  )
}
