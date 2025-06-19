"use client"

import type React from "react"

import { cn } from "../../lib/utils"
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiGraduationCapLine,
  RiHeartPulseLine,
  RiInformationLine,
  RiMapPin2Line,
  RiMicroscopeLine,
  RiShieldLine,
} from "@remixicon/react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import ErrorBoundary from "./ErrorBoundary"

// Dynamically import the background component
const GameOfLife = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100" aria-hidden="true" />,
})

// Organization data with enhanced information
const organizations = [
  {
    id: "bamc",
    name: "Brooke Army Medical Center",
    shortName: "BAMC",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png",
    href: "https://bamc.tricare.mil/",
    description: "The largest DoD hospital and only Level 1 Trauma Center in the DoD.",
    category: "military",
    icon: RiHeartPulseLine,
    color: "#1e40af",
    spotlight:
      "The cornerstone of military medicine in San Antonio, BAMC serves as the primary medical facility for Joint Base San Antonio and the surrounding military community.",
    stats: { beds: "425+", staff: "7,000+", specialty: "Level 1 Trauma" },
    position: { x: 25, y: 30 },
  },
  {
    id: "dha",
    name: "Defense Health Agency",
    shortName: "DHA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png",
    href: "https://dha.mil/",
    description: "A joint, integrated Combat Support Agency enabling military medical services.",
    category: "military",
    icon: RiShieldLine,
    color: "#dc2626",
    spotlight:
      "Leading the transformation of military healthcare through innovative research, policy development, and strategic partnerships across all service branches.",
    stats: { personnel: "130,000+", facilities: "700+", specialty: "Healthcare Leadership" },
    position: { x: 75, y: 20 },
  },
  {
    id: "59mdw",
    name: "US Air Force 59th Medical Wing",
    shortName: "59th Medical Wing",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
    href: "https://www.59mdw.af.mil/",
    description: "The Air Force's premier healthcare, medical education and research wing.",
    category: "military",
    icon: RiHeartPulseLine,
    color: "#0369a1",
    spotlight:
      "Advancing aerospace medicine and military healthcare through cutting-edge research, education, and clinical excellence in support of global Air Force operations.",
    stats: { personnel: "3,500+", missions: "Global", specialty: "Aerospace Medicine" },
    position: { x: 60, y: 70 },
  },
  {
    id: "usaisr",
    name: "US Army Institute of Surgical Research",
    shortName: "USAISR",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
    href: "https://usaisr.amedd.army.mil/",
    description: "The Army's premier research organization focused on improving combat casualty care.",
    category: "military",
    icon: RiMicroscopeLine,
    color: "#059669",
    spotlight:
      "Pioneering life-saving medical innovations for combat casualty care, burn treatment, and trauma surgery that benefit both military personnel and civilian populations worldwide.",
    stats: { research: "50+ Projects", burns: "#1 Burn Center", specialty: "Trauma Research" },
    position: { x: 40, y: 50 },
  },
  {
    id: "namrusa",
    name: "Naval Medical Research Unit - San Antonio",
    shortName: "NAMRU-SA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png",
    href: "https://www.med.navy.mil/Naval-Medical-Research-Unit-San-Antonio/",
    description: "Conducts medical, dental, and biomedical research to enhance warfighter performance.",
    category: "military",
    icon: RiMicroscopeLine,
    color: "#7c3aed",
    spotlight:
      "Advancing naval medicine through innovative research in infectious diseases, operational medicine, and warfighter health optimization for maritime operations.",
    stats: { research: "25+ Studies", focus: "Infectious Disease", specialty: "Naval Medicine" },
    position: { x: 20, y: 80 },
  },
  {
    id: "utsa",
    name: "University of Texas at San Antonio",
    shortName: "UTSA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
    href: "https://www.utsa.edu/",
    description: "An emerging Tier One research institution with nearly 34,000 students.",
    category: "civilian",
    icon: RiGraduationCapLine,
    color: "#f97316",
    spotlight:
      "A rapidly ascending research university fostering innovation in biomedical engineering, cybersecurity, and health sciences through collaborative partnerships with military institutions.",
    stats: { students: "34,000+", research: "$120M+", specialty: "Tier One Research" },
    position: { x: 80, y: 60 },
  },
  {
    id: "uthscsa",
    name: "UT Health San Antonio",
    shortName: "UT Health",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
    href: "https://www.uthscsa.edu/",
    description: "A leading academic health center with excellence in education and research.",
    category: "civilian",
    icon: RiHeartPulseLine,
    color: "#ea580c",
    spotlight:
      "Driving medical breakthroughs through world-class research, education, and patient care, with strong partnerships in military medicine and veteran healthcare.",
    stats: { students: "3,000+", research: "$200M+", specialty: "Academic Medicine" },
    position: { x: 15, y: 40 },
  },
  {
    id: "swri",
    name: "Southwest Research Institute",
    shortName: "SwRI",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Southwest_Research_Institute_SwRi.png",
    href: "https://www.swri.org/",
    description: "One of the oldest and largest independent, nonprofit applied research organizations.",
    category: "civilian",
    icon: RiMicroscopeLine,
    color: "#0891b2",
    spotlight:
      "Delivering innovative solutions across multiple disciplines including biomedical research, defense technologies, and space science through independent applied research.",
    stats: { staff: "2,800+", revenue: "$700M+", specialty: "Applied Research" },
    position: { x: 70, y: 35 },
  },
] as const satisfies Organization[]

// Organization Modal Component
interface Organization {
  id: string
  name: string
  shortName: string
  logo: string
  href: string
  description: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  spotlight: string
  stats: { [key: string]: string } // Changed from Record<string, string> to be more flexible
  position: { x: number; y: number }
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
      if (isMobile) {
        document.body.style.overflow = "hidden"
      }
      if (modalRef.current) {
        modalRef.current.focus()
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      if (isMobile) {
        document.body.style.overflow = ""
      }
    }
  }, [isOpen, onClose, isMobile])

  if (!organization) return null

  const IconComponent = organization.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
            isMobile ? "p-2" : "p-4",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className={cn(
              "relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20",
              isMobile ? "w-[85vw] max-w-sm max-h-[80vh] overflow-y-auto" : "w-full max-w-2xl",
            )}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${organization.id}`}
            tabIndex={-1}
          >
            {/* Enhanced modal header with organization color */}
            <div
              className="relative p-8"
              style={{
                background: `linear-gradient(135deg, ${organization.color}15 0%, ${organization.color}05 100%)`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="p-4 rounded-2xl backdrop-blur-sm border border-white/20"
                    style={{ backgroundColor: `${organization.color}20` }}
                  >
                    <div style={{ color: organization.color }}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 id={`modal-title-${organization.id}`} className="text-2xl font-bold text-gray-900">
                      {organization.shortName}
                    </h3>
                    <p className="text-gray-600 text-lg mt-1">{organization.name}</p>
                    <div
                      className="px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block"
                      style={{
                        backgroundColor: `${organization.color}15`,
                        color: organization.color,
                      }}
                    >
                      {organization.category === "military" ? "Military Institution" : "Civilian Institution"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <RiCloseLine className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Enhanced modal content */}
            <div className={cn("p-8 pt-0", isMobile && "overflow-y-auto")}>
              <div className={cn("grid gap-6 mb-6", isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3")}>
                {/* Logo */}
                <div className="lg:col-span-1">
                  <div className="relative w-full h-32 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                    <Image
                      src={organization.logo || "/placeholder.svg"}
                      alt={`${organization.name} logo`}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Statistics</h4>
                  <div className={cn("grid gap-3", isMobile ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3")}>
                    {Object.entries(organization.stats).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-xl border border-gray-200 bg-gray-50">
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                        <div className="text-lg font-semibold" style={{ color: organization.color }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description and spotlight */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">{organization.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Impact & Innovation</h4>
                  <p className="text-gray-700 leading-relaxed">{organization.spotlight}</p>
                </div>
              </div>

              <a
                href={organization.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 px-6 text-white rounded-2xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${organization.color} 0%, ${organization.color}dd 100%)`,
                }}
              >
                Visit Website
                <RiExternalLinkLine className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Enhanced LinkPreview component
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
  const organization = organizations.find((org) => org.id === orgId)

  const handleInteraction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    onClick(orgId)
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg transition-all duration-200 underline underline-offset-2 inline-flex items-center gap-1 relative px-2 py-1 -mx-2 -my-1",
        isActive
          ? "text-white shadow-lg transform scale-105"
          : "text-[#366A79]/90 hover:text-white hover:shadow-md hover:scale-102",
        className,
      )}
      style={{
        backgroundColor: isActive ? organization?.color : undefined,
        borderColor: isActive ? organization?.color : undefined,
      }}
      onMouseEnter={() => !isMobile && onHover(orgId)}
      onMouseLeave={() => !isMobile && onHover(null)}
      onClick={(e) => handleInteraction(e)}
      onFocus={() => !isMobile && onHover(orgId)}
      onBlur={() => !isMobile && onHover(null)}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.2 }}
      aria-label={`View details about ${orgId}`}
    >
      {children}
      <RiInformationLine
        className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-[#366A79]/70")}
        aria-hidden="true"
      />
    </motion.a>
  )
}

/**
 * A component that showcases Military Health City USA with enhanced interactive visualization
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

  const textY = useTransform(scrollYProgress, [0, 0.3], ["20%", "0%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const spring = useSpring(textY, { damping: 15, stiffness: 100 })

  const getOrgById = (id: string): Organization | null => {
    return (organizations.find((org) => org.id === id) as Organization) || null
  }

  const handleOpenModal = (orgId: string) => {
    const org = getOrgById(orgId)
    setModalOrg(org)
  }

  const handleCloseModal = useCallback(() => {
    setModalOrg(null)
  }, [])

  const activeOrgData = activeOrg ? getOrgById(activeOrg) : null

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
            className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-[90vh] flex items-center"
          >
            {/* Enhanced animated background */}
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }} aria-hidden="true">
              <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#548cac]/10 to-orange-500/10 blur-xl animate-pulse" />
              <div
                className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-gradient-to-tl from-orange-500/10 to-[#548cac]/10 blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-[#548cac]/5 to-orange-500/5 blur-lg animate-pulse"
                style={{ animationDelay: "2s" }}
              />

              {/* Connection lines between organizations */}
              {!isMobile && activeOrgData && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  {organizations
                    .filter((org) => org.id !== activeOrg && org.category === activeOrgData.category)
                    .map((org, index) => (
                      <motion.line
                        key={`${activeOrg}-${org.id}`}
                        x1={`${activeOrgData.position.x}%`}
                        y1={`${activeOrgData.position.y}%`}
                        x2={`${org.position.x}%`}
                        y2={`${org.position.y}%`}
                        stroke={activeOrgData.color}
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    ))}
                </svg>
              )}
            </motion.div>

            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="mx-auto max-w-7xl">
                {/* Enhanced header section */}
                <motion.div
                  style={{
                    y: prefersReducedMotion ? 0 : spring,
                    opacity: prefersReducedMotion ? 1 : textOpacity,
                  }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <div className="space-y-6 sm:space-y-8">
                    <motion.p
                      className="text-lg sm:text-xl text-gray-600 font-medium max-w-3xl mx-auto"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.1 }}
                    >
                      <span className="text-[#548cac] font-semibold">🏥 Interactive Ecosystem:</span> Hover over links
                      to explore connections
                    </motion.p>

                    <motion.h2
                      id="military-health-city-heading"
                      className="font-extrabold text-[#101310] tracking-tight"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.2 }}
                    >
                      <span className="flex items-center justify-center gap-2 text-2xl md:text-3xl mb-3 sm:mb-4">
                        <RiMapPin2Line className="w-6 h-6 sm:w-8 sm:h-8 text-[#548cac]" />
                        San Antonio, TX
                      </span>
                      <span className="block bg-gradient-to-r from-[#548cac] via-orange-500 to-[#548cac] bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
                        Military Medical City USA
                      </span>
                    </motion.h2>

                    <motion.div
                      className="flex items-center justify-center gap-4"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.5 }}
                    >
                      <div className="h-1 bg-gradient-to-r from-[#548cac] to-orange-500 rounded-full w-16 sm:w-24" />
                      <div className="p-2 bg-gradient-to-r from-[#548cac] to-orange-500 rounded-full">
                        <RiHeartPulseLine className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-1 bg-gradient-to-r from-orange-500 to-[#548cac] rounded-full w-16 sm:w-24" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Mobile instruction */}
                {isMobile && (
                  <div className="text-center mb-8">
                    <motion.p
                      className="text-sm text-gray-600 italic bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 inline-block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      💡 Tap highlighted links to explore organizations
                    </motion.p>
                  </div>
                )}

                {/* Enhanced two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 h-full">
                  {/* Left column - Enhanced text content */}
                  <motion.div
                    className="text-left space-y-6 sm:space-y-8"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.3 }}
                  >
                    <div className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.4 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#548cac] to-orange-500 rounded-full opacity-30" />
                        <p className="pl-6">
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
                        </p>
                      </motion.div>

                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.5 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-[#548cac] rounded-full opacity-30" />
                        <p className="pl-6 tracking-tighter md:tracking-tight">
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
                        </p>
                      </motion.div>

                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.6 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#548cac] to-orange-500 rounded-full opacity-30" />
                        <p className="pl-6">
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
                        </p>
                      </motion.div>

                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.7 }}
                        className="relative bg-gradient-to-r from-[#548cac]/5 to-orange-500/5 p-6 rounded-2xl border border-[#548cac]/10"
                      >
                        <p className="text-lg font-medium text-gray-800">
                          This unique ecosystem of military and civilian medical expertise creates the perfect
                          environment for cross-sector collaboration and innovation in healthcare, making San Antonio
                          the ideal host for the AIM Health R&D Summit.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Right column - Revolutionary Interactive Ecosystem Visualization */}
                  {!isMobile && (
                    <motion.div
                      ref={rightColumnRef}
                      className="relative h-full flex items-center justify-center"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: 0.4 }}
                    >
                      <div className="relative w-full h-full min-h-[600px] flex items-center justify-center">
                        <h3 className="sr-only">Interactive Military Health Ecosystem</h3>

                        {/* Enhanced instruction */}

                        {/* Dynamic spotlight panel */}
                        <AnimatePresence mode="wait">
                          {activeOrgData ? (
                            <motion.div
                              key={activeOrgData.id}
                              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                              style={{
                                background: `linear-gradient(135deg, ${activeOrgData.color}15 0%, ${activeOrgData.color}05 50%, transparent 100%)`,
                              }}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

                              {/* Organization spotlight content */}
                              <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                                <div className="text-center mb-6">
                                  <div
                                    className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                                    style={{ backgroundColor: `${activeOrgData.color}20` }}
                                  >
                                    <activeOrgData.icon className="w-10 h-10 text-current" />
                                  </div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{activeOrgData.shortName}</h4>
                                  <p className="text-gray-600 text-sm mb-4">{activeOrgData.name}</p>
                                  <div
                                    className="px-3 py-1 rounded-full text-sm font-medium inline-block"
                                    style={{
                                      backgroundColor: `${activeOrgData.color}15`,
                                      color: activeOrgData.color,
                                    }}
                                  >
                                    {activeOrgData.category === "military"
                                      ? "Military Institution"
                                      : "Civilian Institution"}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <p className="text-gray-700 leading-relaxed text-center">{activeOrgData.spotlight}</p>

                                  <div className="grid grid-cols-3 gap-3">
                                    {Object.entries(activeOrgData.stats).map(([key, value]) => (
                                      <div key={key} className="text-center p-3 bg-white/50 rounded-xl">
                                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                                        <div className="text-sm font-bold" style={{ color: activeOrgData.color }}>
                                          {value}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleOpenModal(activeOrgData.id)}
                                  className="mt-6 w-full py-3 px-6 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                                  style={{
                                    background: `linear-gradient(135deg, ${activeOrgData.color} 0%, ${activeOrgData.color}dd 100%)`,
                                  }}
                                >
                                  Learn More
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-lg"
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#548cac]/20 to-orange-500/20 flex items-center justify-center">
                                  <RiMapPin2Line className="w-12 h-12 text-[#548cac]" />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">Military Health Ecosystem</h4>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                  Explore the interconnected network of military and civilian institutions that make San
                                  Antonio the epicenter of military health innovation.
                                </p>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                  <div className="p-4 bg-[#548cac]/5 rounded-xl border border-[#548cac]/10">
                                    <div className="text-2xl font-bold text-[#548cac]">5</div>
                                    <div className="text-sm text-gray-600">Military Institutions</div>
                                  </div>
                                  <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                                    <div className="text-2xl font-bold text-orange-600">3</div>
                                    <div className="text-sm text-gray-600">Civilian Partners</div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-4 italic">
                                  Hover over organization links to explore connections
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Organization position indicators */}
                        <div className="absolute inset-0 pointer-events-none">
                          {organizations.map((org, index) => {
                            const isActive = activeOrg === org.id
                            const IconComponent = org.icon

                            return (
                              <motion.div
                                key={org.id}
                                className="absolute"
                                style={{
                                  left: `${org.position.x}%`,
                                  top: `${org.position.y}%`,
                                  transform: "translate(-50%, -50%)",
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: activeOrg ? (isActive ? 1 : 0.3) : 0.6,
                                  scale: isActive ? 1.5 : 1,
                                }}
                                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                              >
                                <div
                                  className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-300",
                                    isActive ? "shadow-2xl" : "shadow-md",
                                  )}
                                  style={{
                                    backgroundColor: org.color,
                                    transform: isActive ? "scale(1.2)" : "scale(1)",
                                  }}
                                >
                                  <IconComponent className="w-4 h-4 text-white" />
                                </div>
                                {isActive && (
                                  <motion.div
                                    className="absolute -inset-4 rounded-full border-2 border-dashed opacity-50"
                                    style={{ borderColor: org.color }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                )}
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced background animation */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-3" aria-hidden="true">
              {!prefersReducedMotion && <GameOfLife />}
            </div>
          </section>

          {/* Enhanced Organization Modal */}
          <OrganizationModal
            organization={modalOrg}
            isOpen={!!modalOrg}
            onClose={handleCloseModal}
            isMobile={isMobile}
          />
        </ErrorBoundary>
      )}
    </div>
  )
}
