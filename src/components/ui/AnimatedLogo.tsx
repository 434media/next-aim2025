"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import GameOfLife from "./HeroBackground"

const mainPartners = [
  { name: "COSA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/cosa_quatrefoil_texas_k.png" },
  {
    name: "Bexar County",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Bexar+Seal+High+Res+B_W+1200.png",
  },
  { name: "UTSA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg" },
  { name: "UTHSA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg" },
]

const additionalPartners = [
  { name: "59th", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png" },
  {
    name: "VelocityTX",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+BUTTON+RGB.png",
  },
  { name: "DHA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png" },
  { name: "USAISR", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg" },
  { name: "NAMRU", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png" },
  { name: "Partner 12", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealNavy.png" },
  { name: "Partner 13", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealNavy.png" },
  { name: "Partner 14", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/sealNavy.png" },
]

export function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.4], ["50%", "0%"])
  const mainPartnersY = useTransform(scrollYProgress, [0.2, 0.6], ["50%", "0%"])
  const additionalPartnersY = useTransform(scrollYProgress, [0.4, 0.8], ["50%", "0%"])

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white/5 py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY }}
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#10131d] tracking-tight mb-2">
            Military Health City, USA
          </h2>
          <motion.div
            className="h-1 w-24 bg-orange-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </motion.div>

        <motion.div
          style={{ y: mainPartnersY }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center"
        >
          {mainPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={partner.src || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                fill
                className="object-contain transition-transform hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={{ y: additionalPartnersY }} className="mt-10 pt-16 border-t border-gray-200">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#10131d]">
            Supporting the Military&apos;s Medical Mission
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 justify-items-center">
            {additionalPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="relative w-24 h-24 sm:w-32 sm:h-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  src={partner.src || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain transition-transform hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 flex items-start justify-start">
        <GameOfLife />
      </div>
    </section>
  )
}

