"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import GameOfLife from "./HeroBackground"

const militaryBranches = [
  { name: "Army", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealArmy.png" },
  { name: "Navy", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealNavy.png" },
  { name: "Air Force", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/airforce.png" },
  { name: "Marine Corps", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealMarineCorps.png" },
  { name: "Coast Guard", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealCoastGuard.png" },
  { name: "Space Force", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/space-force-logo.png" },
]

export function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

 /*  const logoY = useTransform(scrollYProgress, [0.5, 0.9], ["50%", "0%"]) */
  const textY = useTransform(scrollYProgress, [0, 0.4], ["50%", "0%"])
  const branchesY = useTransform(scrollYProgress, [0.2, 0.6], ["50%", "0%"])

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white/5 py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY }}
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#10131d] tracking-tight mb-2">
            We&apos;re Military City, USA
          </h2>
          <motion.div
            className="h-1 w-24 bg-orange-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </motion.div>

        <motion.div
          style={{ y: branchesY }}
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center mb-12 sm:mb-16"
        >
          {militaryBranches.map((branch) => (
            <div key={branch.name} className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
              <Image
                src={branch.src || "/placeholder.svg"}
                alt={`${branch.name} logo`}
                fill
                className="object-contain transition-transform hover:scale-105"
              />
            </div>
          ))}
        </motion.div>

        {/* <motion.div style={{ y: logoY }} className="mb-8 sm:mb-12">
          <Image
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-surf-color.png"
            alt="AIM Health R&D Summit 2025 Logo"
            width={800}
            height={400}
            className="h-auto w-full max-w-2xl mx-auto"
            priority
          />
        </motion.div> */}
      </div>

      <div className="absolute inset-0 -z-10 flex items-start justify-start">
        <GameOfLife />
      </div>
    </section>
  )
}

