"use client"

import { RiCircleLine } from "@remixicon/react"
import { Orbit } from "../Orbit"
import ChipViz from "./ChipViz"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export default function Features() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const beamPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const academiaProgress = useTransform(scrollYProgress, [0, 0.33], [0, 1])
  const industryProgress = useTransform(scrollYProgress, [0.33, 0.66], [0, 1])
  const militaryProgress = useTransform(scrollYProgress, [0.66, 1], [0, 1])

  const academiaColor = useTransform(academiaProgress, [0, 1], ["#548cac00", "#548cac"])
  const industryColor = useTransform(industryProgress, [0, 1], ["#4f4f2c00", "#4f4f2c"])
  const militaryColor = useTransform(militaryProgress, [0, 1], ["#f9731600", "#f97316"])

  return (
    <section
      ref={containerRef}
      aria-label="AIM 2025 Event Features"
      id="solutions"
      className="relative mx-auto max-w-6xl scroll-my-24 -mt-16 bg-white"
    >
      {/* Vertical Lines */}
      <div className="pointer-events-none inset-0 select-none">
        {/* Left */}
        <motion.div
          className="absolute inset-y-0 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </motion.div>

        {/* Right */}
        <motion.div
          className="absolute inset-y-0 right-0 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </motion.div>
        {/* Middle */}
        <motion.div
          className="absolute inset-y-0 left-1/2 -z-10 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </motion.div>
        {/* 25% */}
        <motion.div
          className="absolute inset-y-0 left-1/4 -z-10 my-[-5rem] hidden w-px sm:block"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </motion.div>
        {/* 75% */}
        <motion.div
          className="absolute inset-y-0 left-3/4 -z-10 my-[-5rem] hidden w-px sm:block"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute left-0 w-full bg-gradient-to-b from-[#548cac]/20 to-transparent"
          style={{ height: lineHeight }}
        />
        {/* Left Scroll Beam */}
        <motion.div
          className="absolute left-0 w-px pointer-events-none"
          style={{
            top: beamPosition,
            opacity: beamOpacity,
            height: "240px",
            background: "#f97316",
            boxShadow: "0 0 8px #f97316, 0 0 12px #f97316",
            maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
          }}
        />

        {/* Right Scroll Beam */}
        <motion.div
          className="absolute right-0 w-px pointer-events-none"
          style={{
            top: beamPosition,
            opacity: beamOpacity,
            height: "240px",
            background: "#f97316",
            boxShadow: "0 0 8px #f97316, 0 0 12px #f97316",
            maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-0">
        {/* Academia Content */}
        <motion.div
          className="col-span-2 my-auto px-4 md:px-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="relative text-xl font-semibold tracking-tight text-[#101310]">
              Academia
              <div className="absolute top-1 -left-[8px] h-6 w-[3px] rounded-r-sm bg-[#101310]" />
            </h2>
            <h3 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-[#101310] leading-tight">
              From the Bench to the Battlefield
            </h3>
            <p className="mt-6 text-lg sm:text-xl text-balance leading-relaxed text-gray-700">
              San Antonio Texas is a unique city, serving as a leader in government and civilian healthcare research
              through organizations including the San Antonio Military Health System{" "}
              <strong className="font-semibold text-[#101310]">(SAMHS)</strong>, The University of Texas Health San
              Antonio <strong className="font-semibold text-[#101310]">(UTHSA)</strong>, The University of Texas at San
              Antonio <strong className="font-semibold text-[#101310]">(UTSA)</strong>, Texas Biomedical Research
              Foundation and the Veterans Administration <strong className="font-semibold text-[#101310]">(VA)</strong>.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative col-span-2 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.svg className="absolute size-full" style={{ fill: academiaColor }}>
            <defs>
              <pattern id="diagonal-feature-pattern" patternUnits="userSpaceOnUse" width="64" height="64">
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      className="stroke-gray-200/70"
                      strokeWidth="1"
                    />
                  )
                })}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-feature-pattern)" />
          </motion.svg>
          <div className="pointer-events-none h-[28rem] p-10 select-none">
            <div className="relative flex flex-col items-center justify-center">
              <Orbit
                durationSeconds={40}
                radiusPx={160}
                keepUpright
                aria-label="Rotating logos of partner organizations"
                orbitingObjects={[
                  <motion.div
                    key="utsa"
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute size-20 rounded-full bg-white/90 ring-1 shadow-lg ring-black/5"></div>
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg"
                      alt="UTSA Logo"
                      width={100}
                      height={100}
                      className="z-10"
                    />
                    <motion.div
                      className="absolute size-20 rounded-full ring-2 ring-[#548cac]"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.div>,
                  <motion.div
                    key="uthsa"
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute size-20 rounded-full bg-white/90 ring-1 shadow-lg ring-black/5"></div>
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/surf.png"
                      alt="SURF Logo"
                      width={100}
                      height={100}
                      className="z-10"
                    />
                  </motion.div>,
                  <div key="obj1" className="relative flex items-center justify-center">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg"
                      alt="UT Health"
                      width={100}
                      height={100}
                      className="z-10"
                    />
                    <motion.div
                      className="absolute size-12 rounded-full ring-2 ring-[#548cac]"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 1.5,
                      }}
                    />
                    <div className="absolute size-12 rounded-full bg-white/50 ring-1 shadow-lg ring-black/5"></div>
                    <div className="absolute -top-6 left-5">
                      <div className="flex gap-1">
                        <div className="flex items-center justify-center rounded-l-full bg-[#548cac] p-1 text-sm ring-1 ring-gray-200">
                          <RiCircleLine className="size-4 shrink-0 text-white" />
                        </div>
                        <div className="rounded-r-full bg-white/50 py-0.5 px-2 text-sm whitespace-nowrap ring-1 ring-gray-200">
                          UT Health
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute size-12 rounded-full ring-1 ring-[#548cac]/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </div>,
                  <div key="obj2" className="relative flex items-center justify-center">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/Logotype-on-Light.svg"
                      alt="VA Logo"
                      width={100}
                      height={100}
                      className="z-10"
                    />
                    <div className="absolute size-12 rounded-full bg-white/50 ring-1 shadow-lg ring-black/5"></div>
                    <motion.div
                      className="absolute size-12 rounded-full ring-1 ring-[#548cac]/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 2,
                      }}
                    />
                  </div>,
                ]}
              >
                <div className="relative flex h-56 w-56 items-center justify-center">
                  <div className="rounded-full p-1 ring-1 ring-black/10">
                    <div className="overflow-hidden relative z-10 flex size-24 items-center justify-center rounded-full bg-white ring-1 shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)] ring-black/20">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-2025.svg"
                        alt="AIM 2025 Logo"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-14 rounded-full bg-[#548cac]/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </div>
              </Orbit>
            </div>
          </div>
        </motion.div>

        {/* Industry Content */}
        <motion.div
          className="col-span-2 my-auto px-4 md:px-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="relative text-xl font-semibold tracking-tight text-[#548cac]">
              Industry
              <div className="absolute top-1 -left-[8px] h-6 w-[3px] rounded-r-sm bg-[#548cac]" />
            </h2>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-[#101310] leading-tight">
              Bioscience Ecosystem in San Antonio
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-balance leading-relaxed text-gray-700">
              San Antonio&apos;s healthcare and bioscience industries are credited with an annual economic impact of
              $44B, and account for nearly one-fifth of all local jobs.{" "}
              <strong className="text-[#548cac]">VelocityTX</strong> serves as a critical connector to promote
              bioscience innovation and accelerate the process by which emerging medical technologies can be leveraged
              by America&apos;s Warfighters.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative col-span-2 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.svg className="absolute size-full" style={{ fill: industryColor }}>
            <defs>
              <pattern id="diagonal-feature-pattern" patternUnits="userSpaceOnUse" width="64" height="64">
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      className="stroke-gray-200/70"
                      strokeWidth="1"
                    />
                  )
                })}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-feature-pattern)" />
          </motion.svg>
          <div className="relative h-[480px] w-[480px]">
            <svg id="grid" xmlns="http://www.w3.org/2000/svg" fill="none" className="mask absolute size-[480px]">
              <path
                className="stroke-gray-300"
                d="M48 0v480M96 0v480M144 0v480M192 0v480M240 0v480M288 0v480M336 0v480M384 0v480M432 0v480M0 48h480M0 96h480M0 144h480M0 192h480M0 240h480M0 288h480M0 336h480M0 384h480M0 432h480"
              />
            </svg>

            <div className="pointer-events-none relative h-full select-none">
              <motion.div
                className="absolute top-[216px] left-[215.8px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/InnovationShowcase-ezgif.com-video-to-gif-converter+(1)+(1).gif"
                    alt="Innovation Showcase gif"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-[168px] left-[72px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 size-14 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                    <span className="text-sm font-medium text-[#548cac]">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+BUTTON+RGB.png"
                        alt="VelocityTX Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-[72px] left-[168px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 size-14 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                    <span className="">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell.webp"
                        alt="Health Cell Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-[120px] left-[264px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 size-14 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                    <span className="text-sm font-medium text-[#548cac]">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/AlamoAngels-Horizontal-Logo-RGB_boxed-Copy.webp"
                        alt="Alamo Angels Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-[264px] left-[409px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 size-14 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                    <span className="text-sm font-medium text-[#548cac]">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/biomed.webp"
                        alt="Biomed Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-[361px] left-[360px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 size-14 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                    <span className="text-sm font-medium text-[#548cac]">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/txbio.webp"
                        alt="Texas Biomed Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain w-full h-full"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-[312px] left-[168px]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 size-14 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                    <span className="text-sm font-medium text-[#548cac]">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/mhm.png"
                        alt="MHM Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Military Content */}
        <motion.div
          className="col-span-2 my-auto px-4 md:px-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="relative text-xl font-semibold tracking-tight text-[#4f4f2c]">
              Military
              <div className="absolute top-1 -left-[7px] h-6 w-[3px] rounded-r-sm bg-[#4f4f2c]" />
            </h2>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-[#101310] leading-tight">
              Military Medical Research Partners
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-balance leading-relaxed text-gray-700">
              Long known as Military City, USA, San Antonio is home to the largest joint base in the US Department of
              Defense, with a robust medical ecosystem all its own. Indeed, the city boasts 10 military treatment
              facilities (MTF&apos;s), 12,000 clinical staff, 37 graduate medical education programs with nearly 600
              residents, four critical care air transport teams, a burn flight team, and the DOD&apos;s only Level 1
              Trauma Center.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative col-span-2 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.svg className="absolute size-full" style={{ fill: militaryColor }}>
            <defs>
              <pattern id="diagonal-feature-pattern" patternUnits="userSpaceOnUse" width="64" height="64">
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      className="stroke-gray-200/70"
                      strokeWidth="1"
                    />
                  )
                })}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-feature-pattern)" />
          </motion.svg>
          <div className="pointer-events-none relative flex size-full h-[26rem] items-center justify-center p-10 select-none">
            <div className="relative">
              <div className="absolute top-[6rem] left-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.09),0_3px_5px_0_rgba(0,0,0,0.19)] ring-white/50 ring-inset">
                    <div className="relative h-10 w-10">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/mmid.png"
                        alt="MMID Logo"
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[6rem] right-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <div className="relative h-10 w-10">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg"
                        alt="USAISR Logo"
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-[6rem] bottom-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <div className="relative h-10 w-10">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png"
                        alt="59th Medical Wing Logo"
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[6rem] left-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <div className="relative h-10 w-10">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png"
                        alt="BAMC Logo"
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              {[0, 45, 135, 180, 225, 315, 360].map((rotation, index) => (
                <div
                  key={rotation}
                  className="absolute origin-left overflow-hidden"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="relative">
                    <div className="h-0.5 w-60 bg-linear-to-r from-gray-300 to-transparent" />
                    <div
                      className="absolute top-0 left-0 h-0.5 w-28 bg-linear-to-r from-transparent via-orange-300 to-transparent"
                      style={{
                        animation: `gridMovingLine 5s linear infinite ${index * 1.2}s`,
                        animationFillMode: "backwards",
                      }}
                    />
                  </div>
                </div>
              ))}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                style={{ opacity: militaryProgress }}
              >
                <ChipViz />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

