"use client"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "../Button"
import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeDiv } from "../Fade"
import { useInView } from "react-intersection-observer"

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
        <section
          id="summit-mission"
          aria-labelledby="summit-mission-heading"
          className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
        >
          {/* Decorative elements - aria-hidden ensures they're ignored by screen readers */}
          <div
            className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent"
            aria-hidden="true"
          ></div>
          <div
            className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#366A79]/5 to-[#548cac]/10 blur-xl"
            aria-hidden="true"
          ></div>
          <div
            className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gradient-to-tl from-[#366A79]/5 to-[#548cac]/10 blur-xl"
            aria-hidden="true"
          ></div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <motion.div
                className="text-center"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.8 }}
              >
                <h2
                  id="summit-mission-heading"
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101310] mb-10"
                >
                  <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="block text-[#366A79] drop-shadow-sm">From The Bench</span>
                  </motion.div>

                  <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="relative inline-block">
                      To The Battlefield
                      <motion.span
                        className="absolute -bottom-3 left-0 h-1.5 bg-gradient-to-r from-[#366A79] to-[#548cac] w-full rounded-full"
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
                    className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <p className="mb-6">
                      Designed to advance emerging technologies from the bench to the battlefield, the
                      <span className="text-[#366A79] font-semibold"> AIM Health R&D Summit </span>
                      brings together academia, industry, and the military in a unified forum to promote cross-sector
                      partnership in the development of
                      <span className="text-[#101310] font-semibold"> life-saving medical innovations</span>.
                    </p>

                    <p className="mb-6">
                      By connecting top innovators across sectors,
                      <span className="text-[#366A79] font-semibold"> AIM </span>
                      creates pathways to discovery and commercialization while addressing common critical challenges in
                      military and civilian healthcare, encouraging the
                      <span className="text-[#101310] font-semibold"> cross-pollination of ideas and expertise </span>
                      to drive forward the next generation of breakthroughs.
                    </p>

                    <p>
                      The collaboration between researchers, innovators, and military leaders serves as a
                      <span className="text-[#101310] font-semibold"> catalyst for medical advancements </span>
                      that not only enhance military readiness but also have the potential to
                      <span className="text-[#366A79] font-semibold">
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
      )}
    </div>
  )
}

