"use client"

import { motion } from "motion/react"
import {
  RiCalendarLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiFileTextLine,
  RiVideoLine,
  RiExternalLinkLine,
  RiArrowRightUpLine,
  RiArrowRightSLine,
  RiPlayCircleLine,
  RiHistoryLine,
  RiPlayListLine,
} from "@remixicon/react"
import { Button } from "@/components/Button"
import { FadeContainer } from "@/components/Fade"
import ParticleBackground from "@/components/ParticleBackground"
import Image from "next/image"
import { ComingSoonVideo } from "../../components/ui/ComingSoonVideo"

// Define the Speaker interface
interface Speaker {
  name: string
  title: string
}

// Update the Symposium interface
interface Symposium {
  title: string
  date: string
  location: string
  description: string
  speakers: Speaker[]
  registerLink: string
  image?: string
  completed?: boolean
  slideDeckUrl?: string
  recordingUrl?: string
  videoDuration?: string
  videoComingSoon?: boolean
  videoUrl?: string
}

// Update the fadeInUp animation to be smoother
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

// Update the symposiums array - move Pathways to Commercialization to archived
const symposiums: Symposium[] = [
  {
    title: "Pathways to Commercialization: Leveraging Federal & Private Sector Funding",
    date: "May 19, 2025",
    location: "Hosted at VelocityTX with streaming via Teams",
    description:
      "Bringing a medical product to market is a long, costly, and high-risk journey. Many startups and small businesses rely on non-dilutive funding—such as grants and SBA SBIR/STTR awards—to advance their technology without sacrificing equity.",
    speakers: [],
    registerLink:
      "https://www.eventbrite.com/e/pathways-to-commercialization-leveraging-federal-private-sector-funding-tickets-1238030736259",
    completed: true,
    slideDeckUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/19MAY2025_PCS3_distro.pdf",
    videoComingSoon: true,
    videoUrl: "/video-player?title=Pathways%20to%20Commercialization&comingSoon=true",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Commercialization.png",
  },
  {
    title: "Pathways to Innovation: Navigating Medical IP with the Federal Government",
    date: "April 21, 2025",
    location: "Hosted at VelocityTX with streaming via Teams",
    description:
      "Did you know that DoD and VA medical researchers are developing valuable intellectual property? These organizations cannot develop products on their own and depend on the private sector to commercialize their medical technologies.",
    speakers: [],
    registerLink:
      "https://www.eventbrite.com/e/pathways-to-innovation-navigating-medical-ip-with-the-federal-government-tickets-1237932362019",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+28.png",
    completed: true,
    slideDeckUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM_PreWebinar+%232+Slide+Deck.pdf",
    recordingUrl:
      "https://ampd-asset.s3.us-east-2.amazonaws.com/Pre-AIM+webinar+Link-20250421_115509-Meeting+Recording.mp4",
    videoDuration: "64 minutes",
  },
  {
    title: "Sneak Preview: AIM 2025 SME Encounter Sessions",
    date: "March 24, 2025",
    location: "Hosted at VelocityTX with streaming via Teams",
    description:
      "SME Encounter Sessions are a standout feature of the AIM: Health R&D Summit, offering a unique opportunity to engage with DOD and VA research or clinical experts. These 10-minute, private sessions with a panel of SMEs provide a platform to explore collaboration opportunities and advance your technology.",
    speakers: [
      {
        name: "Scott Walter, PhD, PE",
        title: "Director of Technology Transfer & Transition, 59th Medical Wing/Science & Technology",
      },
      {
        name: "Diana Cardenas del Monaco, PhD, MBA, MPH",
        title: "DHA Research Portfolio Manager",
      },
      {
        name: "Jeff Dalton",
        title: "Co-Founder & Chief Innovation Officer, Legacy Innovation Inc.",
      },
      {
        name: "Marcos Resendez",
        title: "Principal at 434 Media",
      },
    ],
    registerLink: "https://www.eventbrite.com/e/sneak-preview-aim-2025-sme-encounter-sessions-tickets-1234940392959",
    completed: true,
    slideDeckUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/Intro+to+AIM+Encounter+Sessions+(Mar+2025)+ver3.pdf",
  },
]

export default function PreConferenceSymposiums() {
  const upcomingSymposiums: Symposium[] = []
  const archivedSymposiums = symposiums.filter((s) => s.completed)

  return (
    <main className="min-h-screen bg-black text-white pt-24 sm:pt-28" id="main-content" aria-labelledby="page-heading">
      {/* Hero Section with Featured Image as the Star */}
      <div className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <Image
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/IMG_6123.JPG"
            alt="AIM Health R&D Summit Pre-Conference Events"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        {/* ParticleBackground implementation matching keynotes/page.tsx */}
        <div className="absolute inset-0 z-10">
          <ParticleBackground
            className="w-full h-full"
            gradientFrom="#101310"
            gradientVia="#366A79"
            gradientTo="#4f4f2c"
            particleCount={30}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-20 h-full flex flex-col justify-start mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-32">
            <FadeContainer className="max-w-4xl">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Pre-Conference Symposiums
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-white/80 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Our pre-conference symposiums offer a unique opportunity to engage with experts, explore collaboration
                opportunities, and gain insights into the military healthcare ecosystem.
              </motion.p>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <a
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(
                      "https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[#548cac] rounded-md hover:bg-[#447a99] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#548cac] focus:ring-offset-black relative overflow-hidden"
                >
                  <span className="relative z-10">Register for AIM Summit</span>
                  <RiArrowRightUpLine className="ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#548cac] to-[#4f4f2c] opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
                </a>
              </motion.div>
            </FadeContainer>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upcoming Symposiums Section */}
        {upcomingSymposiums.length > 0 && (
          <motion.section className="mt-20 lg:mt-24 space-y-12" variants={fadeInUp} aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="text-2xl lg:text-3xl font-light mb-10 text-white">
              Upcoming Symposiums
            </h2>
            {upcomingSymposiums.map((symposium, index) => (
              <motion.article
                key={index}
                className="border-t border-zinc-800 pt-10 group"
                variants={fadeInUp}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-5">
                    <h3 className="text-xl lg:text-2xl font-light group-hover:text-gray-200 transition-colors text-white">
                      {symposium.title}
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center">
                        <RiCalendarLine className="mr-3 h-5 w-5 text-[#548cac]" aria-hidden="true" />
                        <span>{symposium.date}</span>
                      </div>
                      <div className="flex items-center">
                        <RiMapPinLine className="mr-3 h-5 w-5 text-[#548cac]" aria-hidden="true" />
                        <span>{symposium.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 max-w-prose leading-relaxed">{symposium.description}</p>
                  </div>
                  <div className="flex-shrink-0 self-start">
                    <Button
                      href={symposium.registerLink}
                      variant="secondary"
                      className="whitespace-nowrap group/button text-base py-3 px-6 focus:ring-offset-black"
                      aria-label={`Register for ${symposium.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RSVP
                      <RiArrowRightLine
                        className="ml-2 group-hover/button:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>
        )}

        {/* Archived Symposiums Section */}
        {archivedSymposiums.length > 0 && (
          <motion.section className="mt-10 space-y-12 pb-20" variants={fadeInUp} aria-labelledby="archived-heading">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-8 w-1 bg-[#366A79] rounded-full"></div>
              <h2 id="archived-heading" className="text-2xl lg:text-3xl font-light text-white">
                Archived Symposiums
              </h2>
            </div>
            {archivedSymposiums.map((symposium, index) => (
              <motion.article
                key={index}
                className="border-t border-zinc-800 pt-10 group hover:opacity-100 transition-opacity"
                variants={fadeInUp}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl lg:text-2xl font-light group-hover:text-gray-200 transition-colors text-white">
                        {symposium.title}
                      </h3>
                      <span className="px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full">
                        Completed
                      </span>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center">
                        <RiCalendarLine className="mr-3 h-5 w-5 text-[#548cac]" aria-hidden="true" />
                        <span>{symposium.date}</span>
                      </div>
                      <div className="flex items-center">
                        <RiMapPinLine className="mr-3 h-5 w-5 text-[#548cac]" aria-hidden="true" />
                        <span>{symposium.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 max-w-prose leading-relaxed">{symposium.description}</p>

                    {symposium.speakers && symposium.speakers.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-sm font-medium text-white mb-4">Featured Speakers</h4>
                        <ul className="space-y-3">
                          {symposium.speakers.map((speaker, idx) => (
                            <li key={idx} className="text-gray-300">
                              <span className="font-medium text-white">{speaker.name}</span>
                              <span className="block text-sm mt-1">{speaker.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Media section - slide deck, recording, coming soon */}
                    <div className="mt-8">
                      {/* Slide deck and video buttons */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        {symposium.slideDeckUrl && (
                          <a
                            href={symposium.slideDeckUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black"
                            aria-label={`View slide deck for ${symposium.title}`}
                          >
                            <RiFileTextLine className="h-5 w-5 mr-2.5" aria-hidden="true" />
                            <span>View Slide Deck</span>
                            <RiExternalLinkLine className="h-4 w-4 ml-2 opacity-70" aria-hidden="true" />
                          </a>
                        )}
                        {symposium.recordingUrl && (
                          <a
                            href={`/video-player?url=${encodeURIComponent(symposium.recordingUrl)}&title=${encodeURIComponent(symposium.title)}`}
                            className="inline-flex items-center px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black"
                            aria-label={`Watch recording of ${symposium.title}`}
                          >
                            <RiVideoLine className="h-5 w-5 mr-2.5" aria-hidden="true" />
                            <span>Watch Recording</span>
                            {symposium.videoDuration && (
                              <span className="ml-2 text-xs bg-black/30 px-2 py-0.5 rounded-full">
                                {symposium.videoDuration}
                              </span>
                            )}
                          </a>
                        )}
                        {symposium.videoComingSoon && symposium.videoUrl && (
                          <a
                            href={symposium.videoUrl}
                            className="inline-flex items-center px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black"
                            aria-label={`Watch coming soon video for ${symposium.title}`}
                          >
                            <RiVideoLine className="h-5 w-5 mr-2.5" aria-hidden="true" />
                            <span>Watch Recording</span>
                            <span className="ml-2 text-xs bg-black/30 px-2 py-0.5 rounded-full">Coming Soon</span>
                          </a>
                        )}
                      </div>

                      {/* Coming Soon Video Preview - Only show inline if no videoUrl */}
                      {symposium.videoComingSoon && !symposium.videoUrl && (
                        <div className="mt-6 max-w-2xl">
                          <ComingSoonVideo title={symposium.title} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>
        )}

        {/* NEW SECTION: AIM/MMID Preparatory Webinar Sessions */}
        <ParticleBackground
          className="w-full py-16 md:py-24"
          gradientFrom="#1F0A1A"
          gradientVia="#7A1212"
          gradientTo="#3A0303"
          particleCount={35}
        >
          <motion.section
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-labelledby="webinar-heading"
          >
            {/* Section header with YouTube branding */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-[#FF0000] rounded-full"></div>
                <h2 id="webinar-heading" className="text-2xl lg:text-3xl font-light text-white">
                  MMID Preparatory Webinar Sessions
                </h2>
              </div>

              <div className="space-y-8 max-w-3xl">
                <div className="flex items-start gap-3">
                  <RiPlayCircleLine className="h-6 w-6 text-[#FF0000] flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-white text-lg font-medium leading-relaxed">
                    Watch instructional/informational videos of previous AIM Health R&D Summit and Military Medical
                    Industry Days (MMID) webinar sessions
                  </p>
                </div>

                <div className="pl-9">
                  <p className="text-gray-300 leading-relaxed">
                    Access our complete video library of the preparatory webinar sessions held over the last several
                    years that address various key topics such as
                    <span className="text-white font-medium mx-1">&quot;Keys to Collaborating with the Military&quot;</span> to
                    <span className="text-white font-medium mx-1">&quot;Licensing Technologies from The Military&quot;</span>
                    along with various others.
                  </p>

                  <div className="mt-4 flex items-center">
                    <RiHistoryLine className="h-5 w-5 text-[#FF0000] mr-2" aria-hidden="true" />
                    <p className="text-gray-300 italic">
                      All were designed to help you optimize your experience at the AIM Health R&D Summit and provide
                      essential information about military medical innovation and research.
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center px-4 py-2 bg-black/30 rounded-lg border border-white/10">
                    <span className="text-white/80 text-sm">
                      Topics include collaboration strategies, licensing, funding opportunities, and more
                    </span>
                  </div>
                </div>

                {/* YouTube playlist button - now positioned below the text */}
                <div className="mt-8 pl-9">
                  <a
                    href="https://youtube.com/playlist?list=PLu4stFKpxLBXb7TY7luPCEAHBg1CZQru8&si=UnnuZ2Q2E08QSBVP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#FF0000] hover:bg-[#CC0000] rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] focus:ring-offset-black shadow-lg shadow-red-900/20 relative overflow-hidden"
                    aria-label="View full YouTube playlist"
                  >
                    <span className="relative z-10 flex items-center">
                      <RiPlayListLine className="mr-2 h-5 w-5" aria-hidden="true" />
                      <span>View Full Playlist</span>
                    </span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1 z-10">
                      <RiArrowRightSLine className="h-4 w-4" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#CC0000] opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </ParticleBackground>
      </div>
    </main>
  )
}

PreConferenceSymposiums.meta = {
  title: "Pre-Conference Symposiums",
  description: "Learn about the pre-conference symposiums leading up to the AIM: Health R&D Summit.",
}
