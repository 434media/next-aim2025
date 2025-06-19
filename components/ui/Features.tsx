"use client"

import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

export default function Features() {
  const containerRef = useRef(null)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  // Partner data
  const academiaPartners = [
    {
      id: 1,
      name: "UTSA",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
    },
    {
      id: 2,
      name: "UT Health",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
    },
    {
      id: 3,
      name: "VA",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Logotype-on-Light.svg",
    },
  ]

  const industryPartners = [
    {
      id: 1,
      name: "Health Cell",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell.webp",
    },
    {
      id: 2,
      name: "Alamo Angels",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/AlamoAngels-Horizontal-Logo-RGB_boxed-Copy.webp",
    },
    {
      id: 3,
      name: "MHM",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/mhm.png",
    },
  ]

  const militaryPartners = [
    {
      id: 1,
      name: "BAMC",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png",
    },
    {
      id: 2,
      name: "USAISR",
      image:
        "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
    },
    {
      id: 3,
      name: "59th Medical",
      image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
    },
  ]

  return (
    <section
      ref={containerRef}
      aria-label="AIM 2025 Event Features"
      id="solutions"
      className="relative mx-auto max-w-6xl scroll-my-24 bg-white/10 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101310]">
          Connecting Research, Industry, and Military
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-gray-600">
          Explore the unique ecosystem that makes San Antonio a leader in bioscience innovation
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Academia Card */}
        <motion.div
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0}
        >
          <div className="relative h-56 overflow-hidden bg-[#101828]">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative h-48 w-48"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360, scale: 1.05 }}
                transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-[#548cac]/30"></div>
                <div className="absolute inset-2 rounded-full border border-[#548cac]/50"></div>
                <div className="absolute inset-4 rounded-full border border-[#548cac]/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-2025.svg"
                    alt="Academia"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-full bg-white p-3"
                  />
                </div>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <motion.div
                    key={deg}
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#548cac]"
                    style={{
                      transformOrigin: "center",
                      rotate: `${deg}deg`,
                      translateX: "calc(-50% + 90px)",
                    }}
                  />
                ))}
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <div className="rounded-full bg-[#548cac]/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                Academia
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-3 text-lg sm:text-xl font-semibold text-[#101310] md:text-2xl">
              From the Bench to the Battlefield
            </h3>
            <p className="flex-1 text-sm sm:text-base text-gray-700">
              Engage with cutting-edge bioscience innovations, collaborate with industry leaders, and explore research
              commercialization opportunities that drive real-world impact.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs sm:text-sm font-medium text-gray-700">Research Partners</p>
              <div className="grid grid-cols-3 gap-2">
                {academiaPartners.map((partner) => (
                  <div key={partner.id} className="flex flex-col items-center">
                    <div className="relative h-10 w-full bg-white">
                      <Image
                        src={partner.image || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 100px"
                      />
                    </div>
                    <span className="mt-1 text-center text-[10px] sm:text-xs text-gray-500">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industry Card */}
        <motion.div
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={1}
        >
          <div className="relative h-56 overflow-hidden bg-[#101828]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-48 w-48">
                <svg className="h-full w-full" viewBox="0 0 200 200">
                  <pattern id="grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#548cac" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                  <rect width="200" height="200" fill="url(#grid-pattern)" />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="50"
                    fill="none"
                    stroke="#548cac"
                    strokeWidth="1"
                    strokeDasharray="1,3"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="30"
                    fill="none"
                    stroke="#548cac"
                    strokeWidth="1"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="15"
                    fill="#548cac"
                    opacity="0.2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "center" }}
                  />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+BUTTON+RGB.png"
                      alt="VelocityTX"
                      width={80}
                      height={80}
                      className="p-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <div className="rounded-full bg-[#548cac]/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                Industry
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-3 text-lg sm:text-xl font-semibold text-[#101310] md:text-2xl">
              Bioscience Ecosystem in San Antonio
            </h3>
            <p className="flex-1 text-sm sm:text-base text-gray-700">
              Connect with top researchers, military decision-makers, and fellow innovators to forge partnerships,
              discover emerging technologies, and accelerate commercialization in the bioscience sector.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs sm:text-sm font-medium text-gray-700">Industry Partners</p>
              <div className="grid grid-cols-3 gap-2">
                {industryPartners.map((partner) => (
                  <div key={partner.id} className="flex flex-col items-center">
                    <div className="relative h-10 w-full bg-white">
                      <Image
                        src={partner.image || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 100px"
                      />
                    </div>
                    <span className="mt-1 text-center text-[10px] sm:text-xs text-gray-500">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Military Card */}
        <motion.div
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={2}
        >
          <div className="relative h-56 overflow-hidden bg-[#101828]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* ChipViz-inspired visualization directly embedded */}
              <MilitaryChipViz />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <div className="rounded-full bg-[#f97316]/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                Military
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-3 text-lg sm:text-xl font-semibold text-[#101310] md:text-2xl">
              Military Medical Research Partners
            </h3>
            <p className="flex-1 text-sm sm:text-base text-gray-700">
              Gain insights into the latest medical and biotech advancements, strengthen public-private partnerships,
              and explore mission-ready innovations that enhance warfighter health and readiness.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs sm:text-sm font-medium text-gray-700">Military Partners</p>
              <div className="grid grid-cols-3 gap-2">
                {militaryPartners.map((partner) => (
                  <div key={partner.id} className="flex flex-col items-center">
                    <div className="relative h-10 w-full bg-white">
                      <Image
                        src={partner.image || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 100px"
                      />
                    </div>
                    <span className="mt-1 text-center text-[10px] sm:text-xs text-gray-500">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Embedded ChipViz-inspired component for the Military card
function MilitaryChipViz() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const pulseVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <div ref={ref} className="relative flex items-center justify-center w-48 h-48">
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#101310] via-[#548cac] to-[#4f4f2c] opacity-10 blur-sm"
      />
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="relative z-0 min-h-[160px] min-w-[160px] rounded-full border bg-gradient-to-b from-white to-[#548cac]/5 shadow-md shadow-[#548cac]/10"
      >
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="absolute inset-0 rounded-full bg-gradient-to-t from-[#101310] via-[#548cac] to-[#4f4f2c] opacity-20 shadow-[inset_0_0_8px_2px_rgba(16,19,16,0.6)]"
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#101310]/30 shadow-xs shadow-white/20">
            <div className="size-full bg-[#101310]/20" />
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="absolute inset-0 rounded-full bg-gradient-to-t from-[#101310] via-[#548cac] to-[#4f4f2c] opacity-30 shadow-[inset_0_0_8px_2px_rgba(16,19,16,0.8)]"
            />
            <div className="absolute inset-[4px] rounded-full bg-white/5 p-1 backdrop-blur-[1px]">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-[#548cac]/20 shadow-sm shadow-[#101310]/30">
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png"
                  alt="DHA Logo"
                  fill
                  sizes="(max-width: 160px) 100vw, 160px"
                  className="rounded-full p-3 object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

