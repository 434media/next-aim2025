"use client"

import { RiCircleLine, RiPlayFill } from "@remixicon/react"
import { Orbit } from "../Orbit"
import ChipViz from "./ChipViz"
import Image from "next/image"
import { Button } from "../Button"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export default function Features() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={containerRef}
      aria-label="AIM 2025 Event Features"
      id="solutions"
      className="relative mx-auto max-w-6xl scroll-my-24 -mt-16"
    >
      {/* Vertical Lines */}
      <div className="pointer-events-none inset-0 select-none">
        {/* Left */}
        <div
          className="absolute inset-y-0 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Right */}
        <div
          className="absolute inset-y-0 right-0 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>
        {/* Middle */}
        <div
          className="absolute inset-y-0 left-1/2 -z-10 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>
        {/* 25% */}
        <div
          className="absolute inset-y-0 left-1/4 -z-10 my-[-5rem] hidden w-px sm:block"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>
        {/* 75% */}
        <div
          className="absolute inset-y-0 left-3/4 -z-10 my-[-5rem] hidden w-px sm:block"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="0" y2="100%" className="stroke-gray-300" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>
        <motion.div
          className="absolute left-0 w-full bg-gradient-to-b from-[#548cac]/20 to-transparent"
          style={{ height: lineHeight }}
        />
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0">
        {/* Academia Content */}
        <motion.div
          className="col-span-2 my-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="relative text-lg font-semibold tracking-tight text-[#101310]">
            Academia
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-[#101310]" />
          </h2>
          <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance text-[#101310]">
            San Antonio is the Center for Medical Research and Care
          </h3>
          <p className="mt-4 text-base sm:text-lg text-balance leading-relaxed text-gray-700">
            San Antonio Texas is a unique city, serving as a leader in government and civilian healthcare research
            through organizations including the San Antonio Military Health System (SAMHS), The University of Texas
            Health San Antonio (UTHSA), The University of Texas at San Antonio (UTSA), Texas Biomedical Research
            Foundation and the Veterans Administration (VA).
          </p>
        </motion.div>
        <motion.div
          className="relative col-span-2 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg className="absolute size-full [mask-image:linear-gradient(transparent,white_10rem)]">
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
          </svg>
          <div className="pointer-events-none h-[26rem] p-10 select-none">
            <div className="relative flex flex-col items-center justify-center">
              <Orbit
                durationSeconds={40}
                radiusPx={140}
                keepUpright
                aria-label="Rotating logos of partner organizations"
                orbitingObjects={[
                  <motion.div
                    key="utsa"
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute size-16 rounded-full bg-white/90 ring-1 shadow-lg ring-black/5"></div>
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg"
                      alt="UTSA Logo"
                      width={80}
                      height={80}
                      className="z-10"
                    />
                    <motion.div
                      className="absolute size-16 rounded-full ring-2 ring-[#548cac]"
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
                    <div className="absolute size-16 rounded-full bg-white/90 ring-1 shadow-lg ring-black/5"></div>
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/surf.png"
                      alt="SURF Logo"
                      width={80}
                      height={80}
                      className="z-10"
                    />
                  </motion.div>,
                  <div key="obj1" className="relative flex items-center justify-center">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg"
                      alt="UT Health"
                      width={80}
                      height={80}
                      className="z-10"
                    />
                    <motion.div
                      className="absolute size-10 rounded-full ring-2 ring-[#548cac]"
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
                    <div className="absolute size-10 rounded-full bg-white/50 ring-1 shadow-lg ring-black/5"></div>
                    <div className="absolute -top-5 left-4">
                      <div className="flex gap-1">
                        <div className="flex items-center justify-center rounded-l-full bg-[#548cac] p-1 text-xs ring-1 ring-gray-200">
                          <RiCircleLine className="size-3 shrink-0 text-white" />
                        </div>
                        <div className="rounded-r-full bg-white/50 py-0.5 pr-1.5 pl-1 text-xs whitespace-nowrap ring-1 ring-gray-200">
                          UT Health
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute size-10 rounded-full ring-1 ring-[#548cac]/50"
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
                      width={80}
                      height={80}
                      className="z-10"
                    />
                    <div className="absolute size-10 rounded-full bg-white/50 ring-1 shadow-lg ring-black/5"></div>
                    <motion.div
                      className="absolute size-10 rounded-full ring-1 ring-[#548cac]/50"
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
                <div className="relative flex h-48 w-48 items-center justify-center">
                  <div className="rounded-full p-1 ring-1 ring-black/10">
                    <div className="overflow-hidden relative z-10 flex size-20 items-center justify-center rounded-full bg-white ring-1 shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)] ring-black/20">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-2025.svg"
                        alt="AIM 2025 Logo"
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-12 rounded-full bg-[#548cac]/20"
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

        <motion.div
          className="col-span-2 my-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="relative text-lg font-semibold tracking-tight text-[#548cac]">
            Industry
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-[#548cac]" />
          </h2>
          <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance text-[#101310]">
            Bioscience Ecosystem in San Antonio
          </h2>
          <p className="mt-4 text-base sm:text-lg text-balance leading-relaxed text-gray-700">
            San Antonio&apos;s healthcare and bioscience industries are credited with an annual economic impact of $44B, and
            account for nearly one-fifth of all local jobs. <strong className="text-[#548cac]">VelocityTX</strong>{" "}
            serves as a critical connector to promote bioscience innovation and accelerate the process by which emerging
            medical technologies can be leveraged by America&apos;s Warfighters.
          </p>
        </motion.div>
        <motion.div
          className="relative col-span-2 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg className="absolute size-full">
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
          </svg>
          <div className="relative h-[432px] w-[432px]">
            <svg id="grid" xmlns="http://www.w3.org/2000/svg" fill="none" className="mask absolute size-[432px]">
              <path
                className="stroke-gray-300"
                d="M48 0v432M96 0v432M144 0v432M192 0v432M240 0v432M288 0v432M336 0v432M384 0v432M0 48h432M0 96h432M0 144h432M0 192h432M0 240h432M0 288h432M0 336h432M0 384h432"
              />
            </svg>

            <div className="pointer-events-none relative h-full select-none">
              <div className="absolute top-[192px] left-[191.8px]">
                <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/InnovationShowcase-ezgif.com-video-to-gif-converter+(1)+(1).gif"
                    alt="Innovation Showcase gif"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-[144px] left-[48px]">
                <div className="relative">
                  <div className="absolute inset-0 size-12 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
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
              </div>

              <div className="absolute top-[48px] left-[144px]">
                <div className="relative">
                  <div className="absolute inset-0 size-12 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
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
              </div>

              <div className="absolute top-[96px] left-[240px]">
                <div className="relative">
                  <div className="absolute inset-0 size-12 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
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
              </div>

              <div className="absolute top-[240px] left-[385px]">
                <div className="relative">
                  <div className="absolute inset-0 size-12 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
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
              </div>

              <div className="absolute top-[337px] left-[336px]">
                <div className="relative">
                  <div className="absolute inset-0 size-12 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
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
              </div>

              <div className="absolute top-[288px] left-[144px]">
                <div className="relative">
                  <div className="absolute inset-0 size-12 animate-pulse bg-[#548cac]/20 blur-[3px]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center bg-white ring-1 shadow-sm ring-black/15">
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
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="col-span-2 my-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="relative text-lg font-semibold tracking-tight text-[#4f4f2c]">
            Military
            <div className="absolute top-1 -left-[7px] h-5 w-[3px] rounded-r-sm bg-[#4f4f2c]" />
          </h2>
          <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance text-[#101310]">
            Military Medical Research Partners
          </h2>
          <p className="mt-4 text-base sm:text-lg text-balance leading-relaxed text-gray-700">
            Long known as Military City, USA, San Antonio is home to the largest joint base in the US Department of
            Defense, with a robust medical ecosystem all its own. Indeed, the city boasts 10 military treatment
            facilities (MTF&apos;s), 12,000 clinical staff, 37 graduate medical education programs with nearly 600 residents,
            four critical care air transport teams, a burn flight team, and the DOD&apos;s only Level 1 Trauma Center.
          </p>
          <div className="mt-4">
            <Button
              href="https://www.youtube.com/playlist?list=PLu4stFKpxLBXb7TY7luPCEAHBg1CZQru8"
              variant="primary"
              aria-label="Watch Pre-Event Symposiums on YouTube"
            >
              <RiPlayFill className="mr-2 size-5 inline-flex" aria-hidden="true" />
              Watch Pre-Event Symposiums
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative col-span-2 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg className="absolute size-full [mask-image:linear-gradient(white_10rem,transparent)]">
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
          </svg>
          <div className="pointer-events-none relative flex size-full h-[26rem] items-center justify-center p-10 select-none">
            <div className="relative">
              <div className="absolute top-[6rem] left-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/mmid.png"
                      alt="MMID Logo"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-[6rem] right-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg"
                      alt="USAISR Logo"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute right-[6rem] bottom-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png"
                      alt="NAMRU Logo"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[6rem] left-[6rem] z-20">
                <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 ring-1 shadow-md shadow-black/10 ring-black/10">
                  <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 ring-1 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.05),0_7px_10px_0_rgba(0,0,0,0.10)] ring-white/50 ring-inset">
                    <Image
                      src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png"
                      alt="59th Medical Wing Logo"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
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
                      className="absolute top-0 left-0 h-0.5 w-28 bg-linear-to-r from-transparent via-[#4f4f2c] to-transparent"
                      style={{
                        animation: `gridMovingLine 5s linear infinite ${index * 1.2}s`,
                        animationFillMode: "backwards",
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="absolute -translate-x-1/2 -translate-y-1/2">
                <ChipViz />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

