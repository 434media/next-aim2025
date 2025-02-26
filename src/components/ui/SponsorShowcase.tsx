"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Image from "next/image"
import GameOfLife from "./HeroBackground"

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

const ScrollDrivenMarquee = ({
  items,
  reverse = false,
}: {
  items: typeof platinumSponsors
  reverse?: boolean
}) => {
  const marqueeVariants = {
    animate: {
      x: reverse ? [0, -1035] : [-1035, 0],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    },
  }

  return (
    <div className="overflow-hidden py-6">
      <motion.div className="flex gap-8 whitespace-nowrap" variants={marqueeVariants} animate="animate">
        {[...items, ...items].map((sponsor, idx) => (
          <a
            key={`${sponsor.name}-${idx}`}
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 transition-opacity duration-300"
          >
            <div className="relative h-16 w-32 sm:h-24 sm:w-48 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src={sponsor.src || "/placeholder.svg"}
                alt={`${sponsor.name} logo`}
                fill
                sizes="(max-width: 640px) 128px, 192px"
                className="object-contain"
              />
            </div>
            <span className="sr-only">{sponsor.name}</span>
          </a>
        ))}
      </motion.div>
    </div>
  )
}

export function SponsorShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.4], ["50%", "0%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1])
  const spring = useSpring(textY, { damping: 15, stiffness: 100 })

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gray-50 py-16 sm:py-24"
      aria-labelledby="sponsors-title"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: spring, opacity: textOpacity }}
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
            <span className="bg-gradient-to-r from-[#548cac] to-[#4f4f2c] bg-clip-text text-transparent">
              2025 Sponsors
            </span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-[#548cac] mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </motion.div>

        <motion.div style={{ y: spring }} className="space-y-12">
          <div className="mt-12 space-y-8">
            <h3 className="sr-only">Our Platinum Sponsors</h3>
            <ScrollDrivenMarquee items={platinumSponsors} />
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GameOfLife />
      </div>
    </section>
  )
}

