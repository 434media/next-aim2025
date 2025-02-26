"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

const platinumSponsors = [
  {
    name: "Southwest Research Institute",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Southwest_Research_Institute_SwRi.png",
    website: "https://www.swri.org/",
  },
  {
    name: "The Metis Foundation",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/High+resolution%2C+no+background+logo.png",
    website: "https://metisfoundation.org/",
  },
  {
    name: "Articulate Labs",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/al-logo.png",
    website: "https://articulatelabs.com/",
  },
  {
    name: "DesignPlex",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/designplex.webp",
    website: "https://www.designplexarchitects.com/",
  },
  {
    name: "SATOP",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/satop+(1).png",
    website: "https://spacetechsolutions.com/",
  },
  {
    name: "SBIR Advisors",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/sbiradvisors.png",
    website: "https://www.sbiradvisors.com/",
  },
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
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gray-50 py-16 sm:py-24"
      aria-labelledby="sponsors-title"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY }}
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2
            id="sponsors-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#101310] tracking-tight mb-6"
          >
            AIM Health R&D Summit <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#548cac] to-[#4f4f2c] bg-clip-text text-transparent">2025 Sponsors</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-[#548cac] mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </motion.div>

        <motion.div style={{ y: platinumSponsorsY }} className="space-y-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-[#101310]">
            Shaping the Future of Battlefield Medicine
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 justify-items-center">
            {platinumSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full p-4 flex items-center justify-center transition-opacity duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-opacity-50"
                  aria-label={`Visit ${sponsor.name} website`}
                >
                  <Image
                    src={sponsor.src || "/placeholder.svg"}
                    alt={`${sponsor.name} logo`}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, 224px"
                    className="object-contain p-2"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

