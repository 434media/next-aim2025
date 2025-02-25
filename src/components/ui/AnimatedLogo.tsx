"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import GameOfLife from "./HeroBackground"

const mainPartners = [
  { name: "COSA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/cosa_quatrefoil_texas_k.png" },
  {
    name: "Bexar County",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Bexar+Seal+High+Res+B_W+1200.png",
  },
  {
    name: "VelocityTX",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+BUTTON+RGB.png",
  },
  { name: "UTSA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg" },
  { name: "UTHSA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg" },
]

const additionalPartners = [
  { name: "DHA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png" },
  {
    name: "USAISR",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
  },
  { name: "NAMRU", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png" },
  { name: "59th", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png" },
  { name: "VA", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Logotype-on-Light.svg" },
  { name: "BAMC", src: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png" },
  {
    name: "711th Human Performance Wing",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/711+(1).png",
  },
]

interface LinkPreviewProps {
  children: React.ReactNode
  href: string
  description: string
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ children, href, description }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.span
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="font-bold text-[#548cac] hover:underline focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm"
      >
        {children}
      </Link>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-[#101310]"
          >
            {description}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  )
}

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
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white/10 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY }}
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#101310] tracking-tight mb-6">
            Military Health City USA
          </h2>
          <motion.div
            className="h-1 w-24 bg-[#548cac] mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          <div className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto text-balance leading-relaxed">
            San Antonio, &quot;Military Health City USA,&quot; plays a pivotal role in military medicine and life
            science innovation. Home to{" "}
            <LinkPreview
              href="https://bamc.tricare.mil/"
              description="Brooke Army Medical Center (BAMC) is the largest DoD hospital and only Level 1 Trauma Center in the DoD."
            >
              BAMC
            </LinkPreview>{" "}
            (the largest DoD hospital), a robust{" "}
            <LinkPreview
              href="https://dha.mil/"
              description="The Defense Health Agency (DHA) is a joint, integrated Combat Support Agency that enables the Army, Navy, and Air Force medical services to provide a medically ready force and ready medical force to Combatant Commands in both peacetime and wartime."
            >
              DHA
            </LinkPreview>{" "}
            presence, and{" "}
            <LinkPreview
              href="https://militaryhealthinstitute.org/"
              description="UT Health San Antonio's Military Health Institute (MHI) is dedicated to advancing military health and medicine through research, education, and community partnerships."
            >
              UT Health San Antonio&apos;s MHI
            </LinkPreview>
            , the city is a center for medical research and care. With key partners like{" "}
            <LinkPreview
              href="https://velocitytx.org/"
              description="VelocityTX is an innovation hub that accelerates the growth of bioscience and technology companies in San Antonio."
            >
              VelocityTX
            </LinkPreview>{" "}
            driving transformative initiatives like the Innovation District, San Antonio provides the perfect backdrop
            for the{" "}
            <LinkPreview
              href="#"
              description="The AIM Health R&D Summit is a premier event that brings together professionals from academia, industry, and the military to advance medical research and its commercialization."
            >
              AIM Health R&D Summit
            </LinkPreview>
            , uniting professionals from academia, industry, and the military to advance medical research and its
            commercialization.
          </div>
        </motion.div>

        <motion.div
          style={{ y: mainPartnersY }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 justify-items-center md:mb-20"
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

        <motion.div style={{ y: additionalPartnersY }} className="pt-16 border-t border-gray-200">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-[#101310]">
            Supporting the Military&apos;s Medical Mission
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 justify-items-center">
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

