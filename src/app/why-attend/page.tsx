"use client"

import { motion, useReducedMotion } from "motion/react"
import { useInView } from "react-intersection-observer"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { MilitaryHealthCity } from "@/components/ui/MilitaryHealthCity"

// Highlight component to spotlight key terms
const Highlight = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <span className={cn("relative inline text-[#366A79] font-semibold", className)}>
      <motion.span
        className="relative z-10"
        initial={prefersReducedMotion ? {} : { opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-x-0 bottom-0 h-[0.2em] bg-gradient-to-r from-[#366A79]/30 to-[#548cac]/30 rounded-sm"
        initial={prefersReducedMotion ? { width: "100%" } : { width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 0.6,
          delay: Math.random() * 0.2 + 0.1,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
    </span>
  )
}

export default function WhyAttend() {
  const prefersReducedMotion = useReducedMotion()
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
    threshold: 0.1,
  })

  return (
    <>
      <div ref={ref} className="relative">
        {inView && (
          <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24">
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

            <section id="why-attend" aria-labelledby="why-attend-heading" className="relative w-full overflow-hidden">
              <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-4xl">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.8 }}
                  >
                    <div className="text-center">
                      <h1
                        id="why-attend-heading"
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101310] mb-10"
                      >
                        <motion.div
                          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          <span className="block text-[#366A79] drop-shadow-sm">Why Attend</span>
                        </motion.div>

                        <motion.div
                          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <span className="relative inline-block">
                            AIM Health R&D Summit
                            <motion.span
                              className="absolute -bottom-3 left-0 h-1.5 bg-gradient-to-r from-[#366A79] to-[#548cac] w-full rounded-full"
                              initial={prefersReducedMotion ? { width: "100%" } : { width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: prefersReducedMotion ? 0.1 : 1.2, delay: 0.8 }}
                              aria-hidden="true"
                            />
                          </span>
                        </motion.div>
                      </h1>

                      <div className="mt-12 space-y-6 text-left">
                        <motion.div
                          className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <p className="mb-6">
                            The AIM Health R&D Summit is a <Highlight>premier</Highlight>,{" "}
                            <Highlight>community-led</Highlight>, and <Highlight>partner-driven</Highlight> event,
                            hosted by VelocityTX, UTSA, and UT Health San Antonio, aimed at{" "}
                            <Highlight>accelerating</Highlight> the research, development, and commercialization of{" "}
                            <Highlight>transformative medical technologies</Highlight>.
                          </p>

                          <p className="mb-6">
                            Building on over <Highlight>15 years</Highlight> of foundational efforts, this{" "}
                            <Highlight>unique two-day summit</Highlight> unites leaders from{" "}
                            <Highlight>academia, industry, and the military</Highlight> to foster{" "}
                            <Highlight>innovation</Highlight>, <Highlight>cross-sector collaboration</Highlight>, and
                            the advancement of <Highlight>dual-use technologies</Highlight>.
                          </p>

                          <p>
                            Supported by nonprofit and public entities committed to growing the bioscience and
                            technology sectors, AIM serves as a <Highlight>catalyst for partnerships</Highlight> that
                            not only enhance <Highlight>military medical readiness</Highlight> but also create{" "}
                            <Highlight>pathways to commercialization</Highlight>, driving healthcare advancements with{" "}
                            <Highlight>global impact</Highlight>.
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <MilitaryHealthCity />
    </>
  )
}

WhyAttend.meta = {
  title: "Why Attend AIM Health R&D Summit",
  description:
    "Discover the top reasons to attend the AIM Health R&D Summit and shape the future of military medicine.",
}

