"use client"

import { Suspense } from "react"
import { motion } from "motion/react"
import { RiShieldStarLine } from "@remixicon/react"
import WhovaSponsorEmbed from "@/components/WhovaSponsorEmbed"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SponsorsExhibitorsClient() {
  return (
    <div className="bg-white min-h-screen pt-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {/* Header Section */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.div className="flex justify-center mb-3" variants={fadeInUp}>
            <span className="text-sm font-medium text-[#548cac] bg-[#548cac]/10 px-3 py-1 rounded-full inline-flex items-center">
              <RiShieldStarLine className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Our Partners
            </span>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#101310] mb-6 text-center"
            variants={fadeInUp}
          >
            Sponsors & Exhibitors
          </motion.h1>
          <motion.p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto" variants={fadeInUp}>
            Meet the innovative companies and organizations supporting the AIM Health R&D Summit.
          </motion.p>
        </div>

        {/* Sponsors Widget */}
        <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 shadow-lg">
          <Suspense
            fallback={
              <div className="w-full h-64 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#548cac]"></div>
                <p className="mt-4 text-gray-500 text-sm">Loading sponsors...</p>
              </div>
            }
          >
            <WhovaSponsorEmbed />
          </Suspense>
        </motion.div>
      </motion.div>
    </div>
  )
}

