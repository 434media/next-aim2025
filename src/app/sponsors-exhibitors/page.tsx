"use client"

import { useState, useEffect, useRef } from "react"
import {
  RiCalendarLine,
  RiMapPinLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiInformationLine,
  RiStarLine,
} from "@remixicon/react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"

// Sponsor data structure
interface Sponsor {
  id: string
  name: string
  tier: "ecosystem" | "innovator" | "catalyst" | "partner" | "collaborator"
  logo: string
  description: string
  website: string
  industry?: string
  isExhibitor?: boolean
}

const sponsors: Sponsor[] = [
  // Ecosystem Sponsor
  {
    id: "mtec",
    name: "Medical Technology Enterprise Consortium (MTEC)",
    tier: "ecosystem",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/mtec.svg",
    description:
      "The Medical Technology Enterprise Consortium (MTEC) is a 501(c)(3) biomedical technology consortium that accelerates the development of medical solutions that prevent and treat injuries and restore America's military and civilians to full health. MTEC serves as a collaborative partner with the Department of Defense to address military medical needs and enhance medical capabilities.",
    website: "https://mtec-sc.org/",
    industry: "Medical Technology & Research",
    isExhibitor: true,
  },

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
  {
    id: "universityhealth",
    name: "University Health",
    tier: "innovator",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Foundation+Logo.png",
    description:
      "University Health is a leading academic medical center in San Antonio, Texas, providing comprehensive healthcare services and advancing medical education and research.",
    website: "https://www.universityhealth.com/",
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

  // Catalyst Sponsors
  {
    id: "designplex",
    name: "DesignPlex",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/designplex.webp",
    description:
      "At DesignPlex, we specialize in the prototyping, design development, and contract manufacturing of medical devices. Whether you have an idea for a new product, redesign of an existing product, or looking for a new CM for your Class 2 or 3 medical device, we are here to help you!",
    website: "https://designplexbio.com/",
    industry: "Medical Device Prototyping",
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
      "Audicin is a neurowellness technology company delivering audio solutions to enhance focus, recovery, and sleep for active duty service members and veterans. Engineered for operational demands and post-service care for PTSD, Audicin supports cognitive readiness, stress regulation, and long-term resilience through mission-tested sound therapy.",
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
    isExhibitor: false,
  },
  {
    id: "corcept-therapeutics",
    name: "Corcept Therapeutics",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Corcept_logo_new_black.png",
    description: "A global network of dedicated hands and minds focused on unlocking the possibilities of cortisol modulation to revolutionize the treatment of serious diseases. We are the ripples of change in cortisol modulation and we embrace possibility.",
    website: "https://www.corcept.com/",
    industry: "Pharmaceuticals & Biotechnology",
    isExhibitor: true,
  },
  {
    id: "geneva-foundation",
    name: "The Geneva Foundation",
    tier: "catalyst",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/geneva.png",
    description:
      "The Geneva Foundation is a nonprofit organization that supports military medicine research and education. They collaborate with various institutions to advance healthcare solutions for service members and veterans.",
    website: "https://genevausa.org/",
    industry: "Nonprofit & Research",
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
  {
    id: "utsa",
    name: "The University of Texas at San Antonio",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
    description:
      "The University of Texas at San Antonio (UTSA) is a leading research university dedicated to advancing knowledge and innovation in various fields, including health and engineering.",
    website: "https://www.utsa.edu/",
    industry: "Higher Education & Research",
    isExhibitor: true,
  },
  {
    id: "uthscsa",
    name: "UT Health San Antonio",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
    description:
      "UT Health San Antonio is a premier academic health center dedicated to improving health through education, research, and patient care. They focus on advancing medical knowledge and healthcare delivery.",
    website: "https://www.uthscsa.edu/",
    industry: "Healthcare & Research",
    isExhibitor: true,
  },
  {
    id: "dha",
    name: "Defense Health Agency",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png",
    description:
      "The Defense Health Agency (DHA) is responsible for providing high-quality healthcare to military personnel and their families. They focus on improving health outcomes through innovative research and collaboration.",
    website: "https://health.mil/",
    industry: "Military Healthcare",
    isExhibitor: true,
  },
  {
    id: "usaisr",
    name: "U.S. Army Institute of Surgical Research",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
    description:
      "The U.S. Army Institute of Surgical Research (USAISR) is dedicated to advancing surgical care and trauma research for military personnel. They focus on improving outcomes through innovative research and technology.",
    website: "https://usaisr.amedd.army.mil/",
    industry: "Military Surgical Research",
    isExhibitor: false,
  },
  {
    id: "namru",
    name: "Naval Medical Research Unit San Antonio",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/namru.png",
    description:
      "The Naval Medical Research Unit San Antonio (NAMRU-SA) conducts research to enhance the health and readiness of naval forces. They focus on infectious diseases, trauma, and operational medicine.",
    website: "https://www.med.navy.mil/Naval-Medical-Research-Center/",
    industry: "Military Medical Research",
    isExhibitor: false,
  },
  {
    id: "59th",
    name: "59th Medical Wing",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
    description:
      "The 59th Medical Wing is the largest medical wing in the Air Force, providing comprehensive healthcare services and advancing medical education and research.",
    website: "https://www.59mdw.af.mil/",
    industry: "Military Healthcare",
    isExhibitor: false,
  },
  {
    id: "va",
    name: "U.S. Department of Veterans Affairs",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Logotype-on-Light.svg",
    description:
      "The U.S. Department of Veterans Affairs (VA) is committed to providing high-quality healthcare and support services to veterans. They focus on improving health outcomes and enhancing the quality of life for veterans.",
    website: "https://www.va.gov/",
    industry: "Veterans Healthcare",
    isExhibitor: false,
  },
  {
    id: "bamc",
    name: "Brooke Army Medical Center",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/bamc.png",
    description:
      "Brooke Army Medical Center (BAMC) is the largest military medical center in the U.S., providing comprehensive healthcare services and advancing medical research and education.",
    website: "https://bamc.tricare.mil/",
    industry: "Military Healthcare",
    isExhibitor: false,
  },
  {
    id: "711th-human-performance-wing",
    name: "711th Human Performance Wing",
    tier: "partner",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/711+(1).png",
    description:
      "The 711th Human Performance Wing is dedicated to enhancing the performance and readiness of military personnel through research and innovation in human factors, training, and technology.",
    website: "https://www.afrl.af.mil/711HPW/",
    industry: "Military Research & Development",
    isExhibitor: false,
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
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  // Only run on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Filter sponsors by tier
  const ecosystemSponsors = sponsors.filter((s) => s.tier === "ecosystem")
  const innovatorSponsors = sponsors.filter((s) => s.tier === "innovator")
  const catalystSponsors = sponsors.filter((s) => s.tier === "catalyst")
  const partnerSponsors = sponsors.filter((s) => s.tier === "partner")
  const collaboratorSponsors = sponsors.filter((s) => s.tier === "collaborator")

  // Count exhibitors
  const exhibitorCount = sponsors.filter((s) => s.isExhibitor).length

  // Scroll to section
  const scrollToSection = (category: string) => {
    setActiveCategory(category)
    const element = document.getElementById(category)
    if (element) {
      const yOffset = -100 // Adjust for navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

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
            <motion.h1
              className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Sponsors & Exhibitors
            </motion.h1>

            {/* Event info section with improved spacing and responsive layout */}
            <motion.div
              className="mx-auto mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-base sm:text-lg md:text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {/* Date */}
              <div className="flex items-center justify-center">
                <RiCalendarLine
                  className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-[#548cac] flex-shrink-0"
                  aria-hidden="true"
                />
                <span>June 16-17, 2025</span>
              </div>

              {/* Separator - Hidden on mobile, visible on desktop */}
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true"></span>

              {/* Location */}
              <div className="flex items-center justify-center">
                <RiMapPinLine className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-[#548cac] flex-shrink-0" aria-hidden="true" />
                <span>Henry B. González Convention Center</span>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto mb-12 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <p>
                Meet the innovative companies and organizations supporting the AIM Health R&D Summit. Our sponsors and
                exhibitors are essential partners in our mission to accelerate military medical innovation through
                cross-sector collaboration.
              </p>
            </motion.div>

            {/* Stats and quick navigation */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-white">
                <div className="text-3xl font-bold">{sponsors.length}</div>
                <div className="text-sm uppercase tracking-wider">Total Sponsors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-white">
                <div className="text-3xl font-bold">{exhibitorCount}</div>
                <div className="text-sm uppercase tracking-wider">Exhibitors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-white">
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm uppercase tracking-wider">Categories</div>
              </div>
            </motion.div>

            {/* Category navigation */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <button
                onClick={() => scrollToSection("ecosystem")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "ecosystem"
                    ? "bg-[#2A3990] text-white shadow-lg shadow-[#2A3990]/20"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Ecosystem
              </button>
              <button
                onClick={() => scrollToSection("innovator")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "innovator"
                    ? "bg-[#548cac] text-white shadow-lg shadow-[#548cac]/20"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Innovators
              </button>
              <button
                onClick={() => scrollToSection("catalyst")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "catalyst"
                    ? "bg-[#4f4f2c] text-white shadow-lg shadow-[#4f4f2c]/20"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Catalysts
              </button>
              <button
                onClick={() => scrollToSection("partner")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "partner"
                    ? "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/20"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Partners
              </button>
              <button
                onClick={() => scrollToSection("collaborator")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "collaborator"
                    ? "bg-[#366A79] text-white shadow-lg shadow-[#366A79]/20"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Collaborators
              </button>
            </motion.div>
          </div>

          {/* Custom Sponsors Showcase - Fixed width issues */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 lg:p-10 shadow-xl w-full max-w-7xl mx-auto"
          >
            <div className="space-y-16">
              {/* Ecosystem Sponsor - New Top Tier */}
              <div id="ecosystem" className="scroll-mt-32">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#2A3990] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap flex items-center">
                    <RiStarLine className="mr-2 text-[#2A3990]" />
                    Ecosystem Partner
                  </h2>
                  <div className="h-px bg-gradient-to-r from-[#2A3990] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                  {ecosystemSponsors.map((sponsor) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 rounded-xl shadow-lg border border-[#2A3990]/10 hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2A3990]/0 via-[#2A3990]/5 to-[#2A3990]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,57,144,0.1),transparent_70%)] animate-pulse"></div>
                      </div>

                      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <div className="w-full md:w-1/3 aspect-[3/2] relative rounded-lg overflow-hidden bg-white p-4 shadow-inner group-hover:shadow-md transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2A3990]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Image
                            src={sponsor.logo || "/placeholder.svg"}
                            alt={`${sponsor.name} logo`}
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <h3 className="text-xl md:text-2xl font-bold text-[#2A3990] group-hover:text-[#1A237E] transition-colors">
                              {sponsor.name}
                            </h3>
                            {sponsor.isExhibitor && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2A3990] text-white shadow-sm">
                                Exhibiting
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{sponsor.industry}</p>
                          <p className="text-sm md:text-base text-gray-700">{sponsor.description}</p>
                          <div className="flex justify-end">
                            <motion.a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[#2A3990] hover:text-[#1A237E] font-medium px-4 py-2 rounded-lg hover:bg-[#2A3990]/5 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Visit Website
                              <RiExternalLinkLine className="h-5 w-5" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Innovator Sponsors */}
              <div id="innovator" className="scroll-mt-32">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#548cac] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">
                    Innovator Sponsors
                  </h2>
                  <div className="h-px bg-gradient-to-r from-[#548cac] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                {/* Adjusted grid for innovator sponsors - fewer columns on mobile for larger logos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {innovatorSponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <SponsorCard sponsor={sponsor} onClick={() => setSelectedSponsor(sponsor)} tier="innovator" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Catalyst Sponsors */}
              <div id="catalyst" className="scroll-mt-32">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#4f4f2c] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">
                    Catalyst Sponsors
                  </h2>
                  <div className="h-px bg-gradient-to-r from-[#4f4f2c] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {catalystSponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <SponsorCard sponsor={sponsor} onClick={() => setSelectedSponsor(sponsor)} tier="catalyst" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Partner Sponsors */}
              <div id="partner" className="scroll-mt-32">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#f97316] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">Partners</h2>
                  <div className="h-px bg-gradient-to-r from-[#f97316] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {partnerSponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <SponsorCard sponsor={sponsor} onClick={() => setSelectedSponsor(sponsor)} tier="partner" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Collaborator */}
              <div id="collaborator" className="scroll-mt-32">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#366A79] to-transparent w-full max-w-xs"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#101310] px-6 whitespace-nowrap">Collaborator</h2>
                  <div className="h-px bg-gradient-to-r from-[#366A79] via-transparent to-transparent w-full max-w-xs"></div>
                </div>

                <div className="max-w-xs mx-auto w-full grid grid-cols-1 gap-6 md:gap-8">
                  {collaboratorSponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <SponsorCard sponsor={sponsor} onClick={() => setSelectedSponsor(sponsor)} tier="collaborator" />
                    </motion.div>
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
  tier: "ecosystem" | "innovator" | "catalyst" | "partner" | "collaborator"
}

function SponsorCard({ sponsor, onClick, tier }: SponsorCardProps) {
  // Different styling based on tier
  const getBorderColor = () => {
    switch (tier) {
      case "ecosystem":
        return "border-[#2A3990]/30 hover:border-[#2A3990]/80"
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

  // Get glow color for hover effect
  const getGlowColor = () => {
    switch (tier) {
      case "ecosystem":
        return "group-hover:shadow-[#2A3990]/20"
      case "innovator":
        return "group-hover:shadow-[#548cac]/20"
      case "catalyst":
        return "group-hover:shadow-[#4f4f2c]/20"
      case "partner":
        return "group-hover:shadow-[#f97316]/20"
      case "collaborator":
        return "group-hover:shadow-[#366A79]/20"
      default:
        return "group-hover:shadow-gray-200/20"
    }
  }

  // Adjust height for innovator sponsors on mobile
  const getCardHeight = () => {
    if (tier === "innovator" || tier === "ecosystem") {
      return "h-48 sm:h-48 md:h-48" // Taller on mobile, standard on larger screens
    }
    return "h-48"
  }

  // Determine if this sponsor needs extra bottom padding
  const needsExtraPadding = sponsor.id === "velocitytx" || sponsor.id === "swri" || sponsor.id === "mtec"

  return (
    <motion.button
      className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center ${getCardHeight()} shadow-md ${getBorderColor()} border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 relative group overflow-hidden w-full`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`View details about ${sponsor.name}${sponsor.isExhibitor ? ", Exhibiting" : ""}`}
    >
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Enhanced shadow on hover */}
      <div
        className={`absolute inset-0 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${getGlowColor()}`}
      ></div>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Adjust logo size and position based on sponsor needs */}
        <div
          className={`relative ${tier === "innovator" || tier === "ecosystem" ? "w-[85%] sm:w-[80%]" : "w-[80%]"} 
            ${needsExtraPadding ? "h-[70%] mb-6" : "h-[80%]"} 
            flex items-center justify-center`}
        >
          <Image
            src={sponsor.logo || "/placeholder.svg"}
            alt={`${sponsor.name} logo`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes={
              tier === "innovator" || tier === "ecosystem"
                ? "(max-width: 768px) 180px, 200px"
                : "(max-width: 768px) 150px, 200px"
            }
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
        <div className="bg-gray-100 rounded-full p-1 shadow-sm">
          <RiInformationLine className="h-5 w-5 text-[#548cac]" aria-hidden="true" />
        </div>
      </div>

      {/* Tooltip with sponsor name on hover */}
      <div className="absolute -bottom-10 left-0 right-0 bg-black/80 text-white text-xs py-1.5 px-2 rounded opacity-0 group-hover:opacity-100 group-hover:-bottom-0 transition-all duration-300 pointer-events-none">
        {sponsor.name}
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
      case "ecosystem":
        return {
          gradient: "from-[#2A3990]/20 via-[#2A3990]/10 to-transparent",
          badge: "bg-[#2A3990]/10 text-[#2A3990]",
          text: "text-[#2A3990]",
          button: "bg-[#2A3990] hover:bg-[#1A237E]",
          ring: "focus:ring-[#2A3990]",
        }
      case "innovator":
        return {
          gradient: "from-[#548cac]/20 via-[#548cac]/10 to-transparent",
          badge: "bg-[#548cac]/10 text-[#548cac]",
          text: "text-[#548cac]",
          button: "bg-[#548cac] hover:bg-[#3a6075]",
          ring: "focus:ring-[#548cac]",
        }
      case "catalyst":
        return {
          gradient: "from-[#4f4f2c]/20 via-[#4f4f2c]/10 to-transparent",
          badge: "bg-[#4f4f2c]/10 text-[#4f4f2c]",
          text: "text-[#4f4f2c]",
          button: "bg-[#4f4f2c] hover:bg-[#383820]",
          ring: "focus:ring-[#4f4f2c]",
        }
      case "partner":
        return {
          gradient: "from-[#f97316]/20 via-[#f97316]/10 to-transparent",
          badge: "bg-[#f97316]/10 text-[#f97316]",
          text: "text-[#f97316]",
          button: "bg-[#f97316] hover:bg-[#ea580c]",
          ring: "focus:ring-[#f97316]",
        }
      case "collaborator":
        return {
          gradient: "from-[#366A79]/20 via-[#366A79]/10 to-transparent",
          badge: "bg-[#366A79]/10 text-[#366A79]",
          text: "text-[#366A79]",
          button: "bg-[#366A79] hover:bg-[#264a54]",
          ring: "focus:ring-[#366A79]",
        }
      default:
        return {
          gradient: "from-gray-100 via-gray-50 to-transparent",
          badge: "bg-gray-100 text-gray-700",
          text: "text-gray-700",
          button: "bg-gray-700 hover:bg-gray-800",
          ring: "focus:ring-gray-400",
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
        {/* Modal Header with enhanced gradient */}
        <div className={`relative h-40 bg-gradient-to-r ${tierStyles.gradient}`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] animate-pulse"></div>
          </div>

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
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900 transition-colors focus:outline-none ${tierStyles.ring} focus:ring-2 shadow-sm`}
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

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${tierStyles.badge}`}>
                {sponsor.tier === "ecosystem" && "Ecosystem"}
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

            <motion.a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center text-base font-medium text-white ${tierStyles.button} transition-colors focus:outline-none ${tierStyles.ring} focus:ring-2 rounded-md px-4 py-2 shadow-md hover:shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Visit Website
              <RiExternalLinkLine className="ml-2 h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
