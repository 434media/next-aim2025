"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"

// Move to a separate data file for better organization
const platinumSponsors = [
  {
    name: "Southwest Research Institute",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Southwest_Research_Institute_SwRi.png",
    website: "https://www.swri.org/",
    description: "A premier R&D organization serving government and industry",
  },
  {
    name: "The Metis Foundation",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/High+resolution%2C+no+background+logo.png",
    website: "https://metisfoundation.org/",
    description: "Advancing military medicine through research and education",
  },
  {
    name: "Articulate Labs",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/al-logo.png",
    website: "https://articulatelabs.com/",
    description: "Innovative medical device company focused on rehabilitation",
  },
  {
    name: "DesignPlex",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/designplex.webp",
    website: "https://www.designplexarchitects.com/",
    description: "Architecture and design firm specializing in healthcare facilities",
  },
  {
    name: "SATOP",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/satop+(1).png",
    website: "https://spacetechsolutions.com/",
    description: "Space technology solutions for commercial applications",
  },
  {
    name: "SBIR Advisors",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/sbiradvisors.png",
    website: "https://www.sbiradvisors.com/",
    description: "Helping companies navigate SBIR/STTR funding opportunities",
  },
  {
    name: "TRC4",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/TRC4+UT+System+Logo.png",
    website: "https://www.trc4.org/",
    description: "Transforming research into commercial success",
  },
  {
    name: "StemBioSys",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/stembiosys.png",
    website: "https://www.stembiosys.com/",
    description: "Innovative cell culture solutions for regenerative medicine",
  },
  {
    name: "San Antonio Medical Foundation",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/sa-med-foundation-logo.svg",
    website: "https://www.samedfoundation.org/",
    description: "Supporting medical research and education in San Antonio",
  },
  {
    name: "Audicin",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Icon_Audicin-04.png",
    website: "https://audicin.com/",
    description: "Audicin is a neurowellness technology company delivering audio solutions to enhance focus, recovery, and sleep for active duty service members and veterans.",
  },
  {
    name: "Documation",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/DOCUmation+logo.png",
    website: "https://www.mation.com/",
    description: "Simplify How Your Team Connects and Collaborates",
  }
]

type Sponsor = (typeof platinumSponsors)[0]

interface MarqueeProps {
  items: Sponsor[]
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

const SponsorMarquee = ({ items, speed = 50, direction = "left", pauseOnHover = true }: MarqueeProps) => {
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Calculate the total width needed for animation
  const totalWidth = useMemo(() => {
    // Approximate width calculation based on items
    return items.length * 200 // 200px per item including gap
  }, [items.length])

  const marqueeVariants = {
    animate: {
      x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: prefersReducedMotion ? speed * 3 : speed,
          ease: "linear",
          ...(isPaused && pauseOnHover ? { duration: 0 } : {}),
        },
      },
    },
  }

  // If user prefers reduced motion, show static grid instead of marquee
  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-6">
        {items.map((sponsor, idx) => (
          <SponsorItem key={`${sponsor.name}-${idx}`} sponsor={sponsor} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="overflow-hidden py-6"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      aria-label="Sponsor showcase"
    >
      <motion.div className="flex gap-8 whitespace-nowrap" variants={marqueeVariants} animate="animate">
        {[...items, ...items].map((sponsor, idx) => (
          <SponsorItem key={`${sponsor.name}-${idx}`} sponsor={sponsor} />
        ))}
      </motion.div>
    </div>
  )
}

interface SponsorItemProps {
  sponsor: Sponsor
}

const SponsorItem = ({ sponsor }: SponsorItemProps) => {
  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 transition-opacity duration-300"
      aria-label={`${sponsor.name} - ${sponsor.description}`}
    >
      <div className="relative h-16 w-32 sm:h-24 sm:w-48 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <Image
          src={sponsor.src || "/placeholder.svg"}
          alt={`${sponsor.name} logo`}
          fill
          sizes="(max-width: 640px) 128px, 192px"
          className="object-contain p-2"
        />
      </div>
      <span className="sr-only">
        {sponsor.name} - {sponsor.description}
      </span>
    </a>
  )
}

export function SponsorShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-16 sm:py-24" aria-labelledby="sponsors-title">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="sponsors-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#101310] tracking-tight mb-6"
          >
            AIM Health R&D Summit <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#548cac] to-[#4f4f2c] bg-clip-text text-transparent">
              2025 Sponsors
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Our sponsors make this event possible. We&apos;re grateful for their support in advancing military health
            innovation.
          </p>
          <div className="h-1 w-24 bg-[#548cac] mx-auto mt-6" />
        </div>

        <div className="mt-12 space-y-8">
          <SponsorMarquee items={platinumSponsors} direction="left" speed={60} />
        </div>
      </div>
    </section>
  )
}

