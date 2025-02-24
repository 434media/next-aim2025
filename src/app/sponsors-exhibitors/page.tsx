"use client"

import { motion } from "motion/react"
import { RiFileDownloadLine } from "@remixicon/react"
import { Button } from "@/components/Button"
import { SponsorShowcase } from "@/components/ui/SponsorShowcase"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SponsorsExhibitors() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
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
        <motion.h1 className="text-4xl font-bold text-gray-900 mb-8 text-center" variants={fadeInUp}>
          Sponsors & Exhibitors
        </motion.h1>
        <motion.p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
          Meet the innovative companies and organizations supporting the AIM Health R&D Summit.
        </motion.p>

        <SponsorShowcase />

        <motion.div className="mt-16 text-center" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Become a Sponsor</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading organizations in supporting innovation in military medicine. Showcase your brand and connect
            with key decision-makers in the field.
          </p>
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="primary"
              className="py-3 px-8 text-lg inline-flex items-center"
              href="/sponsor-prospectus.pdf"
              download
              aria-label="Download Sponsor Prospectus PDF"
            >
              Download Sponsor Prospectus
              <RiFileDownloadLine className="ml-2" />
            </Button>
            <p className="text-sm text-gray-500">
              <RiFileDownloadLine className="inline-block mr-1" />
              PDF document will download
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

SponsorsExhibitors.layout = "L1"
SponsorsExhibitors.layoutProps = {
  title: "Sponsors & Exhibitors",
  description: "Meet the innovative companies and organizations supporting the AIM Health R&D Summit.",
}

