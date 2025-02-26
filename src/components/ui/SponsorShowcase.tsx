"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import GameOfLife from "./HeroBackground"

const platinumSponsors = [
  {
    name: "Southwest Research Institute",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Southwest_Research_Institute_SwRi.png",
  },
  {
    name: "The Metis Foundation",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/High+resolution%2C+no+background+logo.png",
  },
  { name: "Articulate Labs", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/al-logo.png" },
  { name: "DesignPlex", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/designplex.webp" },
  { name: "SATOP", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/satop+(1).png" },
  { name: "SBIR Advisors", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/sbiradvisors.png" },
]

export function SponsorShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.4], ["50%", "0%"])
  const platinumSponsorsY = useTransform(scrollYProgress, [0.2, 0.6], ["50%", "0%"])

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-gray-50 py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY }}
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            AIM Health R&D Summit <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Sponsors
            </span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-orange-500 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </motion.div>

        <motion.div style={{ y: platinumSponsorsY }} className="">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Shaping the Future of Battlefield Medicine
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 justify-items-center">
            {platinumSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                className="relative w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  src={sponsor.src || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transition-transform hover:scale-105 hover:opacity-80"
                  aria-label={`${sponsor.name} - Platinum Sponsor`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-start justify-start">
        <GameOfLife />
      </div>
    </section>
  )
}

