"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { RiPlayFill } from "@remixicon/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { motion, useInView } from "motion/react"

const stats = [
  {
    name: "Total Registered 2024",
    value: "977",
  },
  {
    name: "Total Registered 2023",
    value: "347",
  },
  {
    name: "Increase YoY",
    value: "2.8x",
  },
]

export default function CatchupBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#101310]/30"
      aria-label="AIM Summit 2024 Highlights"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#101310] via-[#366A79] to-[#4f4f2c]" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 lg:p-16">
        <div className="md:w-1/2 lg:w-3/5 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 text-shadow-lg">
            Help Drive Military Medical Innovation
          </h2>
          <p className="text-xl text-white/90 mb-8 text-balance tracking-tight">
            <strong>AIM Health R&D Summit</strong> provides an unparalleled epicenter for the convergence of
            professionals from academia, industry, and the military
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Button onClick={() => setIsOpen(true)} variant="primary">
              <span className="flex items-center">
                <RiPlayFill className="mr-2 size-5" aria-hidden="true" />
                Watch highlights
              </span>
            </Button>
            <Button href="https://support.velocitytx.org/campaign/642575/donate" variant="secondary">
              Become a Sponsor
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-y-8 border-t border-[#548cac]/20 pt-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <motion.dd
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.dd>
                <dt className="mt-1 text-sm text-white/80 font-medium">{stat.name}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:w-1/2 lg:w-2/5 relative">
          <div className="aspect-square w-full max-w-md mx-auto relative">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/med2.png"
              alt="AIM Summit 2024 visual"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-xl object-cover shadow-lg grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black border-0">
          <DialogTitle>
            <VisuallyHidden>AIM Summit 2024 Highlights Video</VisuallyHidden>
          </DialogTitle>
          <div className="relative aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={isOpen ? "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM2025_V3.mp4" : ""}
              title="AIM Summit 2024 Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </DialogContent>
      </Dialog>
    </section>
  )
}

