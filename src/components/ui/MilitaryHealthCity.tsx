"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "motion/react"
import { useInView } from "react-intersection-observer"
import dynamic from "next/dynamic"
import Image from "next/image"
import ErrorBoundary from "./ErrorBoundary"
import { Button } from "../Button"
import { RiArrowRightUpLine, RiCloseLine, RiExternalLinkLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"

// Dynamically import the background component
const GameOfLife = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100" aria-hidden="true" />,
})

// Organization data
const organizations = [
  {
    id: "bamc",
    name: "Brooke Army Medical Center",
    shortName: "BAMC",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png",
    href: "https://bamc.tricare.mil/",
    description: "The largest DoD hospital and only Level 1 Trauma Center in the DoD.",
  },
  {
    id: "dha",
    name: "Defense Health Agency",
    shortName: "DHA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png",
    href: "https://dha.mil/",
    description: "A joint, integrated Combat Support Agency enabling military medical services.",
  },
  {
    id: "59mdw",
    name: "US Air Force 59th Medical Wing",
    shortName: "59th Medical Wing",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
    href: "https://www.59mdw.af.mil/",
    description: "The Air Force's premier healthcare, medical education and research wing.",
  },
  {
    id: "usaisr",
    name: "US Army Institute of Surgical Research",
    shortName: "USAISR",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
    href: "https://usaisr.amedd.army.mil/",
    description: "The Army's premier research organization focused on improving combat casualty care.",
  },
  {
    id: "namrusa",
    name: "Naval Medical Research Unit - San Antonio",
    shortName: "NAMRU-SA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png",
    href: "https://www.med.navy.mil/Naval-Medical-Research-Center/",
    description: "Conducts medical, dental, and biomedical research to enhance warfighter performance.",
  },
  {
    id: "utsa",
    name: "University of Texas at San Antonio",
    shortName: "UTSA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
    href: "https://www.utsa.edu/",
    description: "An emerging Tier One research institution with nearly 34,000 students.",
  },
  {
    id: "uthscsa",
    name: "UT Health San Antonio",
    shortName: "UT Health",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
    href: "https://www.uthscsa.edu/",
    description: "A leading academic health center with excellence in education and research.",
  },
  {
    id: "swri",
    name: "Southwest Research Institute",
    shortName: "SwRI",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Southwest_Research_Institute_SwRi.png",
    href: "https://www.swri.org/",
    description: "One of the oldest and largest independent, nonprofit applied research organizations.",
  },
]

// Organization Modal Component
interface Organization {
  id: string
  name: string
  shortName: string
  logo: string
  href: string
  description: string
}

interface OrganizationModalProps {
  organization: Organization | null
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
}

const OrganizationModal = ({ organization, isOpen, onClose, isMobile }: OrganizationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    // Handle escape key to close modal
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
      // Lock body scroll only on mobile
      if (isMobile) {
        document.body.style.overflow = "hidden"
      }

      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus()
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      // Restore body scroll
      if (isMobile) {
        document.body.style.overflow = ""
      }
    }
  }, [isOpen, onClose, isMobile])

  if (!organization) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile ? (
            // Mobile modal (full screen)
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            >
              <motion.div
                ref={modalRef}
                className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`modal-title-${organization.id}`}
                tabIndex={-1}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 id={`modal-title-${organization.id}`} className="text-lg font-semibold text-[#101310]">
                    {organization.name}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#366A79] rounded-full p-1"
                    aria-label="Close modal"
                  >
                    <RiCloseLine className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal content */}
                <div className="p-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={organization.logo || "/placeholder.svg"}
                        alt={`${organization.name} logo`}
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                    <p className="text-center text-gray-700 mb-4">{organization.description}</p>
                  </div>

                  <a
                    href={organization.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 px-4 bg-[#366A79] text-white rounded-md hover:bg-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#366A79]"
                  >
                    Visit Website
                    <RiExternalLinkLine className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Desktop modal (centered in right column with blur)
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            >
              {/* Blurred backdrop that only covers the right column */}
              <motion.div
                className="absolute inset-0 backdrop-blur-sm bg-white/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                aria-hidden="true"
              />

              <motion.div
                ref={modalRef}
                className="relative w-[90%] max-w-[320px] bg-white rounded-lg shadow-xl overflow-hidden"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`modal-title-${organization.id}`}
                tabIndex={-1}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <h3 id={`modal-title-${organization.id}`} className="text-lg font-semibold text-[#101310]">
                    {organization.name}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#366A79] rounded-full p-1"
                    aria-label="Close modal"
                  >
                    <RiCloseLine className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal content */}
                <div className="p-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-24 h-24 mb-3">
                      <Image
                        src={organization.logo || "/placeholder.svg"}
                        alt={`${organization.name} logo`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-700 mb-4">{organization.description}</p>
                  </div>

                  <a
                    href={organization.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 px-4 bg-[#366A79] text-white rounded-md hover:bg-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#366A79]"
                  >
                    Visit Website
                    <RiExternalLinkLine className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

// Custom LinkPreview component with hover/click state
interface InteractiveLinkPreviewProps {
  href: string
  children: React.ReactNode
  orgId: string
  onHover: (orgId: string | null) => void
  onClick: (orgId: string) => void
  isActive: boolean
  className?: string
}

const InteractiveLinkPreview = ({
  href,
  children,
  orgId,
  onHover,
  onClick,
  isActive,
  className,
}: InteractiveLinkPreviewProps) => {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 1023px)")

  const handleInteraction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Always prevent default on click to show modal
    e.preventDefault()
    onClick(orgId)
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-semibold focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200 underline underline-offset-2",
        isActive ? "text-[#366A79]" : "text-[#366A79]/80 hover:text-[#366A79]",
        className,
      )}
      onMouseEnter={() => !isMobile && onHover(orgId)}
      onMouseLeave={() => !isMobile && onHover(null)}
      onClick={(e) => handleInteraction(e)}
      onFocus={() => !isMobile && onHover(orgId)}
      onBlur={() => !isMobile && onHover(null)}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      transition={{ duration: 0.2 }}
      aria-label={`View details about ${orgId}`}
    >
      {children}
    </motion.a>
  )
}

/**
 * A component that showcases Military Health City USA with animated content and interactive organization display
 */
export function MilitaryHealthCity() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
  })

  const [activeOrg, setActiveOrg] = useState<string | null>(null)
  const [modalOrg, setModalOrg] = useState<Organization | null>(null)
  const containerRef = useRef(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 1023px)")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.2], ["10%", "0%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.7, 1])
  const spring = useSpring(textY, { damping: 15, stiffness: 100 })

  // Find the organization object by ID
  const getOrgById = (id: string) => {
    return organizations.find((org) => org.id === id) || null
  }

  // Handle opening the modal
  const handleOpenModal = (orgId: string) => {
    setModalOrg(getOrgById(orgId))
  }

  // Handle closing the modal
  const handleCloseModal = useCallback(() => {
    setModalOrg(null)
  }, [])

  return (
    <div ref={ref} className="relative">
      {inView && (
        <ErrorBoundary
          fallback={<div className="p-8 text-center">Something went wrong. Please try refreshing the page.</div>}
        >
          <section
            ref={containerRef}
            id="military-health-city"
            aria-labelledby="military-health-city-heading"
            className="relative w-full overflow-hidden bg-gradient-to-b from-white to-white/95 py-12 sm:py-16 lg:py-20 min-h-[80vh] flex items-center"
          >
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="mx-auto max-w-7xl">
                <motion.div
                  style={{
                    y: prefersReducedMotion ? 0 : spring,
                    opacity: prefersReducedMotion ? 1 : textOpacity,
                  }}
                  className="text-center mb-8 sm:mb-10"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <motion.h2
                      id="military-health-city-heading"
                      className="font-extrabold text-[#101310] tracking-tight"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.2 }}
                    >
                      <span className="block text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">San Antonio, TX</span>
                      <span className="block text-[#366A79] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Military Medical City USA
                      </span>
                    </motion.h2>

                    <motion.div
                      className={cn(
                        "h-1 bg-gradient-to-r from-[#366A79] to-[#548cac] mx-auto rounded-full",
                        "w-24 sm:w-32 md:w-40 lg:w-48",
                      )}
                      initial={prefersReducedMotion ? { width: "100%" } : { width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Mobile instruction text */}
                {isMobile && (
                  <div className="text-center mb-4">
                    <motion.p
                      className="text-xs text-gray-500 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      Tap on highlighted links to learn more
                    </motion.p>
                  </div>
                )}

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-full">
                  {/* Left column - Text content */}
                  <motion.div
                    className="text-left space-y-4 sm:space-y-5"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
                  >
                    <div className="text-sm sm:text-base md:text-lg text-[#101310] text-balance tracking-tight leading-relaxed">
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0 * 0.15 }}
                        className="font-medium mb-4"
                      >
                        Long known as Military City, USA, San Antonio is home to the DoD&apos;s largest joint base and
                        its only Level 1 Trauma Center{" "}
                        <InteractiveLinkPreview
                          href="https://bamc.tricare.mil/"
                          orgId="bamc"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "bamc"}
                        >
                          (BAMC)
                        </InteractiveLinkPreview>
                        . The city also boasts a robust{" "}
                        <InteractiveLinkPreview
                          href="https://dha.mil/"
                          orgId="dha"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "dha"}
                        >
                          DHA
                        </InteractiveLinkPreview>{" "}
                        research presence.
                      </motion.div>

                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 1 * 0.15 }}
                        className="font-medium mb-4"
                      >
                        San Antonio hosts premier military medical research facilities including the{" "}
                        <InteractiveLinkPreview
                          href="https://www.59mdw.af.mil/"
                          orgId="59mdw"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "59mdw"}
                        >
                          US Air Force 59th Medical Wing
                        </InteractiveLinkPreview>
                        , the{" "}
                        <InteractiveLinkPreview
                          href="https://usaisr.amedd.army.mil/"
                          orgId="usaisr"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "usaisr"}
                        >
                          US Army Institute of Surgical Research
                        </InteractiveLinkPreview>
                        , and{" "}
                        <InteractiveLinkPreview
                          href="https://www.med.navy.mil/Naval-Medical-Research-Unit-San-Antonio/"
                          orgId="namrusa"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "namrusa"}
                        >
                          Naval Medical Research Unit - San Antonio
                        </InteractiveLinkPreview>
                        .
                      </motion.div>

                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 2 * 0.15 }}
                        className="font-medium mb-4"
                      >
                        The city is also home to leading civilian research institutions including{" "}
                        <InteractiveLinkPreview
                          href="https://www.utsa.edu/"
                          orgId="utsa"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "utsa"}
                        >
                          UTSA
                        </InteractiveLinkPreview>
                        ,{" "}
                        <InteractiveLinkPreview
                          href="https://www.uthscsa.edu/"
                          orgId="uthscsa"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "uthscsa"}
                        >
                          UT Health San Antonio
                        </InteractiveLinkPreview>
                        , and{" "}
                        <InteractiveLinkPreview
                          href="https://www.swri.org/"
                          orgId="swri"
                          onHover={setActiveOrg}
                          onClick={handleOpenModal}
                          isActive={activeOrg === "swri"}
                        >
                          Southwest Research Institute
                        </InteractiveLinkPreview>
                        , making the Alamo City one of the nation&apos;s leading hubs for medical research and
                        healthcare innovation.
                      </motion.div>

                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 3 * 0.15 }}
                        className="font-medium"
                      >
                        This unique ecosystem of military and civilian medical expertise creates the perfect environment
                        for cross-sector collaboration and innovation in healthcare, making San Antonio the ideal host
                        for the AIM Health R&D Summit.
                      </motion.div>
                    </div>

                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 4 * 0.15 }}
                      className="mt-6"
                    >
                      <Button
                        variant="primary"
                        href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#548cac] focus-visible:outline-none transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                        aria-label="Register for AIM 2025 to engage with San Antonio's bioscience ecosystem (opens in new tab)"
                      >
                        <span className="flex items-center justify-center">
                          Register for AIM 2025
                          <RiArrowRightUpLine className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Right column - Interactive organization display (desktop only) */}
                  {!isMobile && (
                    <motion.div
                      ref={rightColumnRef}
                      className="relative h-full flex items-center justify-center"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.3 }}
                    >
                      <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
                        <h3 className="sr-only">Partner Organizations</h3>

                        {/* Desktop instruction text */}
                        <div className="absolute -top-6 left-0 right-0 text-center">
                          <motion.p
                            className="text-xs text-gray-500 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                          >
                            Hover over links to explore organizations
                          </motion.p>
                        </div>

                        {/* Grid layout for organizations */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                          {organizations.map((org) => {
                            const isActive = activeOrg === org.id

                            return (
                              <motion.a
                                key={org.id}
                                href={org.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  "relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg overflow-hidden transition-all duration-300",
                                  "border hover:border-[#366A79]/30",
                                  isActive
                                    ? "border-[#366A79] bg-white shadow-md scale-105 z-10"
                                    : "border-gray-100 bg-white/80 hover:shadow-sm hover:bg-white",
                                )}
                                onMouseEnter={() => setActiveOrg(org.id)}
                                onMouseLeave={() => setActiveOrg(null)}
                                onFocus={() => setActiveOrg(org.id)}
                                onBlur={() => setActiveOrg(null)}
                                aria-label={`Visit ${org.name} website (opens in new tab)`}
                                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="relative w-full aspect-square mb-2 overflow-hidden rounded">
                                  <Image
                                    src={org.logo || "/placeholder.svg"}
                                    alt={`${org.name} logo`}
                                    fill
                                    className={cn(
                                      "object-contain p-2 transition-all duration-300",
                                      isActive ? "scale-110" : "scale-100",
                                    )}
                                    sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                                  />
                                </div>

                                <div className="text-center">
                                  <h4
                                    className={cn(
                                      "text-xs sm:text-sm font-semibold transition-colors duration-200",
                                      isActive ? "text-[#366A79]" : "text-[#101310] group-hover:text-[#366A79]",
                                    )}
                                  >
                                    {org.shortName}
                                  </h4>

                                  {/* Description that appears on hover/focus */}
                                  <AnimatePresence>
                                    {isActive && (
                                      <motion.p
                                        className="text-xs text-gray-600 mt-1 px-1 absolute left-0 right-0 bottom-0 bg-white/95"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {org.description}
                                      </motion.p>
                                    )}
                                  </AnimatePresence>
                                </div>

                                {/* Decorative gradient on hover */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-[#366A79]/5 to-[#548cac]/10 pointer-events-none"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: isActive ? 1 : 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  aria-hidden="true"
                                />
                              </motion.a>
                            )
                          })}
                        </div>

                        {/* Organization Modal for desktop - positioned within the right column */}
                        {!isMobile && modalOrg && (
                          <OrganizationModal
                            organization={modalOrg}
                            isOpen={!!modalOrg}
                            onClose={handleCloseModal}
                            isMobile={isMobile}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Background animation with reduced opacity */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-5" aria-hidden="true">
              {!prefersReducedMotion && <GameOfLife />}
            </div>

            {/* Enhanced decorative elements */}
            <div
              className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#366A79]/10 to-[#548cac]/5 blur-xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-tl from-[#366A79]/10 to-[#548cac]/5 blur-xl"
              aria-hidden="true"
            ></div>
          </section>

          {/* Organization Modal for mobile */}
          {isMobile && (
            <OrganizationModal
              organization={modalOrg}
              isOpen={!!modalOrg}
              onClose={handleCloseModal}
              isMobile={isMobile}
            />
          )}
        </ErrorBoundary>
      )}
    </div>
  )
}

