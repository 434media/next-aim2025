"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import ErrorBoundary from "./ErrorBoundary"
import { Button } from "../Button"
import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeDiv, FadeSpan } from "../Fade"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useInView } from "react-intersection-observer"

const GameOfLife = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100" />,
})

const mainPartners = [
  {
    name: "COSA",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/cosa_quatrefoil_texas_k.png",
    href: "https://www.sanantonio.gov/",
  },
  {
    name: "Bexar County",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Bexar+Seal+High+Res+B_W+1200.png",
    href: "https://www.bexar.org/",
  },
  {
    name: "VelocityTX",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+BUTTON+RGB.png",
    href: "https://velocitytx.org/",
  },
  // {
  //   name: "UTSA",
  //   src: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
  //   href: "https://www.utsa.edu/",
  // },
  // {
  //   name: "UTHSA",
  //   src: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
  //   href: "https://www.uthscsa.edu/",
  // },
]

const additionalPartners = [
  {
    name: "DHA",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png",
    href: "https://www.health.mil/",
  },
  {
    name: "USAISR",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
    href: "https://usaisr.amedd.army.mil/",
  },
  {
    name: "NAMRU",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png",
    href: "https://www.med.navy.mil/Naval-Medical-Research-Center/",
  },
  // {
  //   name: "59th",
  //   src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
  //   href: "https://www.59mdw.af.mil/",
  // },
  // {
  //   name: "VA",
  //   src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Logotype-on-Light.svg",
  //   href: "https://www.va.gov/",
  // },
  // {
  //   name: "BAMC",
  //   src: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png",
  //   href: "https://bamc.tricare.mil/",
  // },
  // {
  //   name: "711th Human Performance Wing",
  //   src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/711+(1).png",
  //   href: "https://www.afrl.af.mil/711HPW/",
  // },
]

const ScrollDrivenMarquee = ({
  items,
  reverse = false,
}: {
  items: typeof mainPartners
  reverse?: boolean
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const startPosition = reverse ? -containerWidth / 2 : 0

  return (
    <div className="overflow-hidden py-8" ref={containerRef}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: reverse
                  ? [startPosition, startPosition + (isMobile ? 1200 : 2400)]
                  : [startPosition, startPosition - (isMobile ? 1200 : 2400)],
              }
        }
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: isMobile ? 60 : 100, // Increased duration for smoother animation
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((partner, idx) => (
          <Link
            key={`${partner.name}-${idx}`}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-md"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-20 w-40 sm:h-28 sm:w-56 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={partner.src || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                fill
                sizes="(max-width: 640px) 160px, 224px"
                className="object-contain"
                loading="lazy"
              />
            </motion.div>
            <span className="sr-only">{partner.name}</span>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}

interface LinkPreviewProps {
  children: React.ReactNode
  href: string
  description: string
  className?: string
}

const LinkPreview: React.FC<LinkPreviewProps> = React.memo(({ children, href, description, className }) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) {
      setIsPreviewVisible(true)
    }
  }, [isTouchDevice])

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) {
      setIsPreviewVisible(false)
    }
  }, [isTouchDevice])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isTouchDevice) {
        e.preventDefault()
        setIsPreviewVisible((prev) => !prev)
      }
    },
    [isTouchDevice],
  )

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} font-bold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200`}
      >
        {children}
      </Link>
      <AnimatePresence>
        {isPreviewVisible && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-900"
          >
            {description}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
})

LinkPreview.displayName = "LinkPreview"

export function AnimatedLogo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.2], ["20%", "0%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])
  const spring = useSpring(textY, { damping: 15, stiffness: 100 })

  const content = useMemo(
    () => (
      <ErrorBoundary fallback={<div>Something went wrong. Please try refreshing the page.</div>}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>
        <section
          ref={containerRef}
          id="main-content"
          className="relative w-full overflow-hidden bg-gradient-to-b from-white to-white/95 py-16 sm:py-24 lg:py-32"
        >
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 lg:space-y-16">
            <div className="mx-auto max-w-7xl">
              <motion.div style={{ y: spring, opacity: textOpacity }} className="text-center mb-24 sm:mb-32 space-y-12">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#101310] tracking-tight mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Military Health City USA
                </motion.h2>
                <motion.div
                  className="h-1 w-24 bg-[#548cac] mx-auto mb-12"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#101310] w-full max-w-5xl mx-auto text-balance tracking-tighter md:tracking-tight space-y-4 sm:space-y-6 leading-relaxed px-4 sm:px-6 lg:px-8">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0 * 0.2 }}
                  >
                    San Antonio is uniquely positioned as Military Health City USA, home to the largest joint base in
                    the U.S. Department of Defense, the nation&apos;s only Level 1 Trauma Center in the DoD network{" "}
                    <LinkPreview
                      href="https://bamc.tricare.mil/"
                      description="Brooke Army Medical Center (BAMC) is the largest DoD hospital and only Level 1 Trauma Center in the DoD."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      (BAMC)
                    </LinkPreview>
                    , and a robust{" "}
                    <LinkPreview
                      href="https://dha.mil/"
                      description="The Defense Health Agency (DHA) is a joint, integrated Combat Support Agency that enables the Army, Navy, and Air Force medical services to provide a medically ready force and ready medical force to Combatant Commands in both peacetime and wartime."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      DHA
                    </LinkPreview>{" "}
                    presence.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 * 0.2 }}
                  >
                    As a leading hub for medical research and healthcare innovation, San Antonio unites government and
                    civilian healthcare leaders, making{" "}
                    <LinkPreview
                      href="https://www.434media.com/"
                      description="The AIM Health R&D Summit brings together top innovators from academia, industry, and the military to accelerate the research, development, and commercialization of transformative medical technologies."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      AIM
                    </LinkPreview>{" "}
                    the premier platform for cross-sector collaboration.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2 * 0.2 }}
                  >
                    With key partners like{" "}
                    <LinkPreview
                      href="https://velocitytx.org/"
                      description="VelocityTX is an innovation hub that accelerates the growth of bioscience and technology companies in San Antonio."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      VelocityTX
                    </LinkPreview>{" "}
                    driving transformative initiatives like the Innovation District, San Antonio is at the forefront of
                    bioscience innovation.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 3 * 0.2 }}
                  >
                    The city is home to leading institutions including{" "}
                    <LinkPreview
                      href="https://militaryhealthinstitute.org/"
                      description="UT Health San Antonio's Military Health Institute (MHI) is dedicated to advancing military health and medicine through research, education, and community partnerships."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      UT Health San Antonio&apos;s MHI
                    </LinkPreview>
                    the San Antonio Military Health System (SAMHS),{" "}
                    <LinkPreview
                      href="https://www.utsa.edu/"
                      description="The University of Texas at San Antonio and The University of Texas Health Science Center at San Antonio are on a path to merge into one premier global university, combining our collective academic, research and clinical strengths to deliver immense value to our community."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      UTSA
                    </LinkPreview>
                    , and the{" "}
                    <LinkPreview
                      href="https://www.txbiomed.org/"
                      description="Texas Biomedical Research Institute is a global leader in infectious disease research, with a mission to promote global health through innovative research."
                      className="font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2"
                    >
                      Texas Biomedical Research Foundation
                    </LinkPreview>
                    , establishing itself as an epicenter for life sciences research, development, and
                    commercialization.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 bg-white">
            <div className="space-y-4 sm:space-y-8">
              <h3 className="sr-only">Our Partners</h3>
              <ScrollDrivenMarquee items={mainPartners} />
              <ScrollDrivenMarquee items={additionalPartners} reverse />
            </div>
          </div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-24 bg-white">
            <div className="mx-auto max-w-7xl">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101310] mb-8">
                  <FadeSpan className="block text-[#366A79]">Two Days</FadeSpan>
                  <FadeSpan className="block">One Mission</FadeSpan>
                </h3>
                <p className="mt-8 max-w-2xl mx-auto text-center text-xl sm:text-2xl text-gray-700 leading-relaxed">
                  <FadeSpan>
                    The AIM Health R&D Summit is{" "}
                    <strong className="font-semibold text-[#101310]">Military Health City USA&apos;s</strong> premier
                    networking and collaboration conference in support of the{" "}
                    <strong className="font-semibold text-[#101310]">life sciences industry</strong> and{" "}
                    <strong className="font-semibold text-[#101310]">military medical mission</strong>
                  </FadeSpan>
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                  <FadeDiv>
                    <Button
                      variant="primary"
                      href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:ring-[#548cac] focus:outline-none transition-all duration-200 hover:scale-105"
                    >
                      <span className="flex items-center justify-center">
                        Register to Attend
                        <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                      </span>
                    </Button>
                  </FadeDiv>
                  <FadeDiv>
                    <Button
                      variant="secondary"
                      href="https://support.velocitytx.org/campaign/642575/donate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:ring-[#548cac] focus:outline-none transition-all duration-200 hover:scale-105"
                    >
                      <span className="flex items-center justify-center">
                        Become a Sponsor
                        <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                      </span>
                    </Button>
                  </FadeDiv>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
            <GameOfLife />
          </div>
        </section>
      </ErrorBoundary>
    ),
    [spring, textOpacity],
  )

  return (
    <div ref={ref}>
      {inView && (
        <ErrorBoundary fallback={<div>Something went wrong. Please try refreshing the page.</div>}>
          {content}
        </ErrorBoundary>
      )}
    </div>
  )
}

export default React.memo(AnimatedLogo)

