"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import ErrorBoundary from "./ErrorBoundary"
import GameOfLife from "./HeroBackground"
import { Button } from "../Button"
import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeDiv, FadeSpan } from "../Fade"



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
  {
    name: "UTSA",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
    href: "https://www.utsa.edu/",
  },
  {
    name: "UTHSA",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
    href: "https://www.uthscsa.edu/",
  },
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
  {
    name: "59th",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
    href: "https://www.59mdw.af.mil/",
  },
  {
    name: "VA",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Logotype-on-Light.svg",
    href: "https://www.va.gov/",
  },
  {
    name: "BAMC",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png",
    href: "https://bamc.tricare.mil/",
  },
  {
    name: "711th Human Performance Wing",
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/711+(1).png",
    href: "https://www.afrl.af.mil/711HPW/",
  },
]

const ScrollDrivenMarquee = ({
  items,
  reverse = false,
}: {
  items: typeof mainPartners
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
        {[...items, ...items].map((partner, idx) => (
          <a
            key={`${partner.name}-${idx}`}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 transition-opacity duration-300"
          >
            <div className="relative h-16 w-32 sm:h-24 sm:w-48 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src={partner.src || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                fill
                sizes="(max-width: 640px) 128px, 192px"
                className="object-contain"
              />
            </div>
            <span className="sr-only">{partner.name}</span>
          </a>
        ))}
      </motion.div>
    </div>
  )
}

interface LinkPreviewProps {
  children: React.ReactNode;
  href: string;
  description: string;
}

const LinkPreview = ({ children, href, description }: LinkPreviewProps) => {
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
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-900"
        >
          {description}
        </motion.span>
      )}
    </motion.span>
  )
}

export function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.2], ["20%", "0%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])
  const spring = useSpring(textY, { damping: 15, stiffness: 100 })

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try refreshing the page.</div>}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Skip to main content
      </a>
      <section ref={containerRef} id="main-content" className="relative w-full overflow-hidden bg-white/10 py-20 sm:py-28">
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div style={{ y: spring, opacity: textOpacity }} className="text-center mb-20 sm:mb-24">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#101310] tracking-tight mb-6">
                Military Health City USA
              </h2>
              <motion.div
                className="h-1 w-24 bg-[#548cac] mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <div className="text-lg sm:text-xl md:text-2xl text-[#101310] max-w-5xl mx-auto text-balance tracking-tight space-y-6">
                <p>
                  San Antonio is  &quot;Military Health City USA,&quot; plays a pivotal role in military medicine and life
                  science innovation.
                </p>
                <p>
                  Home to{" "}
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
                  </LinkPreview>, {" "}
                  the city is a center for medical research and care.
                </p>
                <p>
                  With key partners like{" "}
                  <LinkPreview
                    href="https://velocitytx.org/"
                    description="VelocityTX is an innovation hub that accelerates the growth of bioscience and technology companies in San Antonio."
                  >
                    VelocityTX
                  </LinkPreview>{" "}
                  driving transformative initiatives like the Innovation District, San Antonio provides the perfect
                  backdrop for the{" "}
                  <LinkPreview
                    href="#"
                    description="The AIM Health R&D Summit is a premier event that brings together professionals from academia, industry, and the military to advance medical research and its commercialization."
                  >
                    AIM Health R&D Summit
                  </LinkPreview>
                  , uniting professionals from academia, industry, and the military to advance medical research and its
                  commercialization.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="mt-12 space-y-8">
            <h3 className="sr-only">Our Partners</h3>
            <ScrollDrivenMarquee items={mainPartners} />
            <ScrollDrivenMarquee items={additionalPartners} reverse />
          </div>
        </div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="md:mt-32 md:max-w-3xl md:mx-auto text-center text-5xl lg:text-7xl font-extrabold tracking-tight text-[#101310] mb-8">
                <FadeSpan className="block text-[#548cac]">Two Days</FadeSpan>
                <FadeSpan className="block">One Mission</FadeSpan>
              </h3>
              <p className="mt-6 max-w-2xl mx-auto text-center text-base sm:text-lg md:text-xl text-gray-600">
                <FadeSpan>
                  The AIM Health R&D Summit is <strong className="font-semibold text-[#101310]">Military Health City USA&apos;S</strong>{" "}
                  premier networking and collaboration conference in support of the{" "}
                  <strong className="font-semibold text-[#101310]">life sciences industry</strong> and{" "}
                  <strong className="font-semibold text-[#101310]">military medical mission</strong>
                </FadeSpan>
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <FadeDiv>
              <Button
                variant="primary"
                href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap"
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
                className="w-full sm:w-auto whitespace-nowrap"
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
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <GameOfLife />
        </div>
      </section>
    </ErrorBoundary>
  )
}

