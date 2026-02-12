"use client"

import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import { useRef } from "react"

export default function ProPELPage() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <main className="relative min-h-screen bg-[#000] text-white overflow-hidden pt-10 md:pt-16">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#000] via-[#050a0f] to-[#0a1520]" />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#548cac]/5 blur-[120px]" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#548cac]/5 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-16 py-32">
              {/* Title */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-4"
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
                  <span className="text-white">
                    Pro
                  </span>
                  <span className="bg-gradient-to-r from-[#548cac] via-cyan-400 to-[#548cac] bg-clip-text text-transparent">
                    PEL
                  </span>
                </h1>
                 {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="w-24 h-px bg-gradient-to-r from-transparent via-[#548cac] to-transparent mx-auto"
                />
                <p className="text-base md:text-lg text-white/70">
                  More information about ProPEL will be coming soon. In the meantime, if you have any questions or would like to get involved, please don't hesitate to reach out to us.
                </p>
                  
              </motion.div>

             

              {/* Details Section */}
              <motion.div
                  ref={sectionRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className=""
              >
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-xl shadow-blue-500/20 transition-all duration-300 flex items-center gap-2"
                    >
                        Register for AIM 2026
                        <ArrowUpRight className="size-4" />
                    </motion.button>
                  </Link>
                  <Link href="/contact-us">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-3.5 border border-white/15 hover:border-[#548cac]/40 hover:bg-[#548cac]/10 text-white/80 hover:text-white font-medium rounded-lg transition-all duration-300"
                    >
                        Contact Us
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Event Info */}
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="pt-8"
              >
                  <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-white/40 font-medium tracking-wide">
                      <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#548cac]/60" />
                          May 19, 2026
                      </span>
                      <span className="hidden sm:block w-px h-4 bg-white/10" />
                      <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#548cac]/60" />
                          Henry B. González Convention Center
                      </span>
                      <span className="hidden sm:block w-px h-4 bg-white/10" />
                      <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#548cac]/60" />
                          San Antonio, TX
                      </span>
                  </div>
              </motion.div>
            </div>
          </div>
        </main>
    )
}
