"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import GameOfLife from "./HeroBackground"

export function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const logoY = useTransform(scrollYProgress, [0, 0.5], ["50%", "0%"])

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white/5 pt-8 sm:pt-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y: logoY }} className="">
          <Image
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-surf-color.png"
            alt="AIM Health R&D Summit 2025 Logo"
            width={800}
            height={400}
            className="h-auto w-full max-w-2xl mx-auto"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 flex items-start justify-start">
          <GameOfLife />
        </div>
      </div>
    </section>
  )
}

