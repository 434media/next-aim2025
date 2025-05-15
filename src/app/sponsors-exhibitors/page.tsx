"use client"

import { useState, useEffect, useRef } from "react"
import { RiCalendarLine, RiMapPinLine, RiCloseLine, RiExternalLinkLine, RiInformationLine } from "@remixicon/react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"

// Sponsor data structure
interface Sponsor {
  id: string
  name: string
  tier: "innovator" | "catalyst" | "partner" | "collaborator"
  logo: string
  description: string
  website: string
  industry?: string
  isExhibitor?: boolean
}

// Sponsor data
const sponsors: Sponsor[] = [
  // Innovator Sponsors
  {
    id: "swri",
    name: "Southwest Research Institute",
    tier: "innovator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Southwest_Research_Institute_SwRi.png",
    description:
      "Southwest Research Institute (SwRI) is an independent, nonprofit applied research and development organization. The staff of nearly 3,000 specializes in the creation and transfer of technology in engineering and the physical sciences.",
    website: "https://www.swri.org/",
    industry: "Research & Development",
    isExhibitor: true,
  },
  {
    id: "metis",
    name: "The Metis Foundation",
    tier: "innovator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/High+resolution%2C+no+background+logo.png",
    description:
      "The Metis Foundation is dedicated to advancing military medicine through research, education, and innovation. They support critical research initiatives that improve care for service members and veterans.",
    website: "https://metisfoundation.org/",
    industry: "Healthcare & Research",
    isExhibitor: true,
  },
  {
    id: "samedfoundation",
    name: "San Antonio Medical Foundation",
    tier: "innovator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/sa-med-foundation-logo.svg",
    description:
      "The San Antonio Medical Foundation is a nonprofit organization that supports medical research and education in the San Antonio area. They promote collaboration between academia, industry, and government to advance healthcare innovation.",
    website: "https://www.samedfoundation.org/",
    industry: "Medical Research & Education",
    isExhibitor: false,
  },
  {
    id: "trc4",
    name: "TRC4",
    tier: "innovator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/TRC4+UT+System+Logo.png",
    description:
      "TRC4 (Translational Research Consortium for TBI) is dedicated to advancing research and treatments for traumatic brain injuries through collaborative efforts across institutions.",
    website: "https://trc4.org/",
    industry: "Medical Research",
    isExhibitor: true,
  },
  {
    id: "texasbiomed",
    name: "Texas Biomedical Research Institute",
    tier: "innovator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Texas+Texas+Biomedical+without+slogan+541+blue+%2B+124+yellow+logo-2025.jpg",
    description:
      "Texas Biomedical Research Institute is a nonprofit research institution dedicated to advancing human health through innovative biomedical research. They focus on infectious diseases, genetics, and other critical health challenges.",
    website: "https://www.txbiomed.org/",
    industry: "Biomedical Research",
    isExhibitor: true,
  },

  // Catalyst Sponsors
  {
    id: "designplex",
    name: "DesignPlex",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/designplex.webp",
    description:
      "DesignPlex Architects specializes in healthcare facility design, creating innovative spaces that enhance patient care and medical research capabilities.",
    website: "https://www.designplexarchitects.com/",
    industry: "Architecture & Design",
    isExhibitor: true,
  },
  {
    id: "satop",
    name: "SATOP",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/satop+(1).png",
    description:
      "SATOP (Space Alliance Technology Outreach Program) provides technical assistance to small businesses by leveraging the expertise and capabilities of the aerospace industry.",
    website: "https://spacetechsolutions.com/",
    industry: "Aerospace Technology",
    isExhibitor: true,
  },
  {
    id: "articulatelabs",
    name: "Articulate Labs",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/al-logo.png",
    description:
      "Articulate Labs is a leading provider of advanced simulation and training solutions for military and healthcare applications. They focus on enhancing skills and performance through innovative technology.",
    website: "https://articulatelabs.com/",
    industry: "Simulation & Training",
    isExhibitor: true,
  },
  {
    id: "stembiosys",
    name: "StemBioSys",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/stembiosys.png",
    description:
      "StemBioSys is a biotechnology company focused on developing advanced stem cell technologies for regenerative medicine and drug discovery.",
    website: "https://www.stembiosys.com/",
    industry: "Biotechnology",
    isExhibitor: true,
  },
  {
    id: "sbiradvisors",
    name: "SBIR Advisors",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/sbiradvisors.png",
    description: "Helping companies navigate SBIR/STTR funding opportunities",
    website: "https://www.sbiradvisors.com/",
    industry: "Funding & Grants",
    isExhibitor: true,
  },
  {
    id: "audicin",
    name: "Audicin",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Icon_Audicin-04.png",
    description:
      "Audicin is a technology company specializing in advanced audio solutions for military and healthcare applications. They focus on enhancing communication and situational awareness through innovative audio technologies.",
    website: "https://www.audicin.com/",
    industry: "Audio Technology",
    isExhibitor: true,
  },
  {
    id: "documation",
    name: "Documation",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/DOCUmation+logo.png",
    description:
      "From HQ to home office, stay connected with our trusted Unified Communications (UCaaS) solutions, backed by VoIP technology. Bring your phone systems, team chat, video meetings, and transcribed voicemails together in one seamless platform. Whether you're scaling up or supporting remote work, you deserve communication tools you can count on.",
    website: "https://www.mation.com/",
    industry: "Document Management",
    isExhibitor: true,
  },

  // Partner Sponsors
  {
    id: "cosa",
    name: "City of San Antonio",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/cosa_quatrefoil_texas_k.png",
    description:
      "The City of San Antonio is committed to fostering innovation and economic development in the region. They support initiatives that enhance the quality of life for residents and promote business growth.",
    website: "https://www.sanantonio.gov/",
    industry: "Government & Economic Development",
    isExhibitor: false,
  },
  {
    id: "velocitytx",
    name: "VelocityTX",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+BUTTON+RGB.png",
    description:
      "VelocityTX is an innovation center that accelerates the growth of bioscience and healthcare companies through mentorship, funding connections, and collaborative workspace.",
    website: "https://velocitytx.org/",
    industry: "Innovation & Incubation",
    isExhibitor: true,
  },

  // Collaborator Sponsor
  {
    id: "434media",
    name: "434 Media",
    tier: "collaborator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/434media.svg",
    description:
      "434 Media partners with venture capital firms, accelerators, startups, and industry leaders to create bold, strategic content that delivers results.",
    website: "https://434media.com/",
    industry: "Digital Marketing",
    isExhibitor: false,
  },
]

export default function SponsorsExhibitorsClientPage() {
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Only run on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Filter sponsors by tier
  const innovatorSponsors = sponsors.filter((s) => s.tier === "innovator")
  const catalystSponsors = sponsors.filter((s) => s.tier === "catalyst")
  const partnerSponsors = sponsors.filter((s) => s.tier === "partner")
  const collaboratorSponsors = sponsors.filter((s) => s.tier === "collaborator")

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      {/* Hero Section with proper top padding to avoid navbar overlap */}
      <div className="w-full min-h-screen flex items-center justify-center relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c1a] via-[#1e2320] to-[#232725] z-0"></div>

        {/* Particle effect - client-side only */}
        {isMounted && !prefersReducedMotion && (
          <div className="absolute inset-0 z-0" aria-hidden="true">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  backgroundColor: ["#548cac", "#4f4f2c", "#f97316", "#ffffff"][Math.floor(Math.random() * 4)],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-24">
          <div className="mx-auto max-w-4xl text-center mb-12 md:mb-16">
            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Sponsors & Exhibitors
            </h1>

            {/* Event info section with improved spacing and responsive layout */}
            <div className="mx-auto mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-base sm:text-lg md:text-xl text-white/90">
              {/* Date */}
              <div className="flex items-center justify-center">
                <RiCalendarLine
                  className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-[#548cac] flex-shrink-0"
                  aria-hidden="true"
                />
                <span>June 16, 2025</span>
              </div>

              {/* Separator - Hidden on mobile, visible on desktop */}
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true"></span>

              {/* Location */}
              <div className="flex items-center justify-center">
                <RiMapPinLine className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-[#548cac] flex-shrink-0" aria-hidden="true" />
                <span>Henry B. González Convention Center</span>
              </div>
            </div>

            <div className="mx-auto mb-12 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              <p>
                Meet the innovative companies and organizations supporting the AIM Health R&D Summit. Our sponsors and
                exhibitors are essential partners in our mission to accelerate military medical innovation through
                cross-sector collaboration.
              </p>
            </div>
          </div>

          {/* Custom Sponsors Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 md:p-10 lg:p-12 shadow-xl"
          >
            <div className="space-y-16">
              {/* Innovator Sponsors */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#548cac] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">
                    Innovator Sponsors
                  </h2>
                  <div className="h-px bg-gradient-to-r from-[#548cac] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                {/* Adjusted grid for innovator sponsors - fewer columns on mobile for larger logos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
                  {innovatorSponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.id}
                      sponsor={sponsor}
                      onClick={() => setSelectedSponsor(sponsor)}
                      tier="innovator"
                    />
                  ))}
                </div>
              </div>

              {/* Catalyst Sponsors */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#4f4f2c] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">
                    Catalyst Sponsors
                  </h2>
                  <div className="h-px bg-gradient-to-r from-[#4f4f2c] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
                  {catalystSponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.id}
                      sponsor={sponsor}
                      onClick={() => setSelectedSponsor(sponsor)}
                      tier="catalyst"
                    />
                  ))}
                </div>
              </div>

              {/* Partner Sponsors */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#f97316] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">Partners</h2>
                  <div className="h-px bg-gradient-to-r from-[#f97316] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
                  {partnerSponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.id}
                      sponsor={sponsor}
                      onClick={() => setSelectedSponsor(sponsor)}
                      tier="partner"
                    />
                  ))}
                </div>
              </div>

              {/* Collaborator */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#366A79] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">Collaborator</h2>
                  <div className="h-px bg-gradient-to-r from-[#366A79] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="max-w-xs mx-auto w-full grid grid-cols-1 gap-6 md:gap-8">
                  {collaboratorSponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.id}
                      sponsor={sponsor}
                      onClick={() => setSelectedSponsor(sponsor)}
                      tier="collaborator"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sponsor Info Modal */}
      <AnimatePresence>
        {selectedSponsor && <SponsorInfoModal sponsor={selectedSponsor} onClose={() => setSelectedSponsor(null)} />}
      </AnimatePresence>
    </main>
  )
}

// Sponsor Card Component
interface SponsorCardProps {
  sponsor: Sponsor
  onClick: () => void
  tier: "innovator" | "catalyst" | "partner" | "collaborator"
}

// Update the SponsorCard component to place the exhibitor badge at the bottom center with a dark background strip

function SponsorCard({ sponsor, onClick, tier }: SponsorCardProps) {
  // Different styling based on tier
  const getBorderColor = () => {
    switch (tier) {
      case "innovator":
        return "border-[#548cac]/30 hover:border-[#548cac]/80"
      case "catalyst":
        return "border-[#4f4f2c]/30 hover:border-[#4f4f2c]/80"
      case "partner":
        return "border-[#f97316]/30 hover:border-[#f97316]/80"
      case "collaborator":
        return "border-[#366A79]/30 hover:border-[#366A79]/80"
      default:
        return "border-gray-200 hover:border-gray-400"
    }
  }

  // Adjust height for innovator sponsors on mobile
  const getCardHeight = () => {
    if (tier === "innovator") {
      return "h-48 sm:h-48 md:h-48" // Taller on mobile, standard on larger screens
    }
    return "h-48"
  }

  // Determine if this sponsor needs extra bottom padding
  const needsExtraPadding = sponsor.id === "velocitytx" || sponsor.id === "swri"

  return (
    <motion.button
      className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center ${getCardHeight()} shadow-md ${getBorderColor()} border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 relative group overflow-hidden`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`View details about ${sponsor.name}${sponsor.isExhibitor ? ", Exhibiting" : ""}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Adjust logo size and position based on sponsor needs */}
        <div
          className={`relative ${tier === "innovator" ? "w-[85%] sm:w-[80%]" : "w-[80%]"} 
            ${needsExtraPadding ? "h-[70%] mb-6" : "h-[80%]"} 
            flex items-center justify-center`}
        >
          <Image
            src={sponsor.logo || "/placeholder.svg"}
            alt={`${sponsor.name} logo`}
            fill
            className="object-contain"
            sizes={tier === "innovator" ? "(max-width: 768px) 180px, 200px" : "(max-width: 768px) 150px, 200px"}
          />
        </div>
      </div>

      {/* Exhibitor badge as a strip at the bottom of the card */}
      {sponsor.isExhibitor && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#101310] py-1.5 text-center">
          <span className="text-xs font-medium text-white tracking-wide uppercase" aria-label="Exhibitor">
            Exhibiting
          </span>
        </div>
      )}

      {/* Info indicator - adjusted position to account for exhibitor strip */}
      <div className="absolute bottom-8 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-gray-100 rounded-full p-1">
          <RiInformationLine className="h-5 w-5 text-[#548cac]" aria-hidden="true" />
        </div>
      </div>

      <span className="sr-only">
        Click to view details about {sponsor.name}
        {sponsor.isExhibitor ? ", Exhibiting" : ""}
      </span>
    </motion.button>
  )
}

// Sponsor Info Modal Component
interface SponsorInfoModalProps {
  sponsor: Sponsor
  onClose: () => void
}

function SponsorInfoModal({ sponsor, onClose }: SponsorInfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on escape key and handle click outside
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    document.addEventListener("mousedown", handleClickOutside)

    // Lock body scroll
    document.body.style.overflow = "hidden"

    // Focus trap
    if (modalRef.current) {
      modalRef.current.focus()
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [onClose])

  // Get tier-specific styling
  const getTierStyles = () => {
    switch (sponsor.tier) {
      case "innovator":
        return {
          gradient: "from-[#548cac]/20 via-[#548cac]/10 to-transparent",
          badge: "bg-[#548cac]/10 text-[#548cac]",
          text: "text-[#548cac]",
        }
      case "catalyst":
        return {
          gradient: "from-[#4f4f2c]/20 via-[#4f4f2c]/10 to-transparent",
          badge: "bg-[#4f4f2c]/10 text-[#4f4f2c]",
          text: "text-[#4f4f2c]",
        }
      case "partner":
        return {
          gradient: "from-[#f97316]/20 via-[#f97316]/10 to-transparent",
          badge: "bg-[#f97316]/10 text-[#f97316]",
          text: "text-[#f97316]",
        }
      case "collaborator":
        return {
          gradient: "from-[#366A79]/20 via-[#366A79]/10 to-transparent",
          badge: "bg-[#366A79]/10 text-[#366A79]",
          text: "text-[#366A79]",
        }
      default:
        return {
          gradient: "from-gray-100 via-gray-50 to-transparent",
          badge: "bg-gray-100 text-gray-700",
          text: "text-gray-700",
        }
    }
  }

  const tierStyles = getTierStyles()

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`sponsor-modal-title-${sponsor.id}`}
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className={`relative h-40 bg-gradient-to-r ${tierStyles.gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 w-32 h-32 flex items-center justify-center shadow-md">
              <div className="relative w-full h-full">
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain p-2"
                  sizes="128px"
                />
              </div>
            </div>
          </div>
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] shadow-sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <RiCloseLine className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <h3 id={`sponsor-modal-title-${sponsor.id}`} className="text-2xl font-bold text-gray-900 mb-2">
            {sponsor.name}
          </h3>

          {sponsor.industry && <p className={`${tierStyles.text} text-base mb-6`}>{sponsor.industry}</p>}

          <p className="text-gray-700 text-base leading-relaxed mb-8">{sponsor.description}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${tierStyles.badge}`}>
                {sponsor.tier === "innovator" && "Innovator"}
                {sponsor.tier === "catalyst" && "Catalyst"}
                {sponsor.tier === "partner" && "Partner"}
                {sponsor.tier === "collaborator" && "Collaborator"}
              </div>
              {sponsor.isExhibitor && (
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-[#548cac]/10 text-[#548cac]">
                  Exhibiting
                </div>
              )}
            </div>

            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-base font-medium text-[#548cac] hover:text-[#366A79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] rounded-md px-2 py-1"
            >
              Visit Website
              <RiExternalLinkLine className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
