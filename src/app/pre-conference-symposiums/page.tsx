"use client"

import { motion } from "motion/react"
import {
  RiCalendarLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiTimeLine,
  RiFileTextLine,
  RiVideoLine,
  RiExternalLinkLine,
} from "@remixicon/react"
import { Button } from "@/components/Button"
import Image from "next/image"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

// Define the Speaker interface
interface Speaker {
  name: string
  title: string
}

// Update the Symposium interface to include transcriptUrl
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
  transcriptUrl?: string // Add this new property
  videoDuration?: string // Add this to display video duration
}

// Update the fadeInUp animation to be smoother
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

// Update the symposiums array to ensure the transcript URL is properly formatted
const symposiums: Symposium[] = [
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
    recordingUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/Pre-AIM+webinar+Link-20250421_115509-Meeting+Recording.mp4",
    // Point to the sample transcript file we created
    transcriptUrl: "/transcript/pre-aim-transcript.vtt",
    videoDuration: "64 minutes",
  },
  {
    title: "Pathways to Commercialization: Leveraging Federal & Private Sector Funding",
    date: "May 19, 2025",
    location: "Hosted at VelocityTX with streaming via Teams",
    description:
      "Bringing a medical product to market is a long, costly, and high-risk journey. Many startups and small businesses rely on non-dilutive funding—such as grants and SBA SBIR/STTR awards—to advance their technology without sacrificing equity.",
    speakers: [],
    registerLink:
      "https://www.eventbrite.com/e/pathways-to-commercialization-leveraging-federal-private-sector-funding-tickets-1238030736259",
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
  const featuredSymposium = symposiums[1] // Now featuring the May event
  const upcomingSymposiums: Symposium[] = []
  const archivedSymposiums = symposiums.filter((s) => s.completed)

  return (
    <main
      className="min-h-screen bg-black text-white pt-16 sm:pt-20 mt-16 md:mt-10"
      id="main-content"
      aria-labelledby="page-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VisuallyHidden>
          <h1 id="page-heading">Pre-Conference Symposiums</h1>
        </VisuallyHidden>

        {/* Featured Symposium Section */}
        <motion.div
          className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-12 lg:py-20"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div className="flex-1 space-y-8" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6 lg:mb-10 text-white">
              {featuredSymposium.title}
            </h2>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center">
                <RiCalendarLine className="mr-3 h-5 w-5 text-[#548cac]" aria-hidden="true" />
                <span>{featuredSymposium.date}</span>
              </div>
              <div className="flex items-center">
                <RiMapPinLine className="mr-3 h-5 w-5 text-[#548cac]" aria-hidden="true" />
                <span>{featuredSymposium.location}</span>
              </div>
            </div>

            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">{featuredSymposium.description}</p>

            <Button
              href={featuredSymposium.registerLink}
              variant="secondary"
              aria-label={`Register for ${featuredSymposium.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base py-3 px-6 focus:ring-offset-black"
            >
              RSVP
              <RiArrowRightLine
                className="inline-flex ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex-1 bg-zinc-900 rounded-xl p-1 md:p-2 w-full max-w-xl shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-800">
              <Image
                src={featuredSymposium.image || "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+28.png"}
                alt={`${featuredSymposium.title} preview`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

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
          <motion.section
            className="mt-20 lg:mt-24 space-y-12 pb-20"
            variants={fadeInUp}
            aria-labelledby="archived-heading"
          >
            <h2 id="archived-heading" className="text-2xl lg:text-3xl font-light mb-10 text-white">
              Archived Symposiums
            </h2>
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

                    {/* Add CTA buttons for slide deck, recording, and transcript if available */}
                    {(symposium.slideDeckUrl || symposium.recordingUrl || symposium.transcriptUrl) && (
                      <div className="mt-8 flex flex-wrap gap-4">
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
                            href={`/video-player?url=${encodeURIComponent(symposium.recordingUrl)}&title=${encodeURIComponent(symposium.title)}${symposium.transcriptUrl ? `&transcript=${encodeURIComponent(symposium.transcriptUrl)}` : ""}`}
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
                        {symposium.transcriptUrl && (
                          <a
                            href={symposium.transcriptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black"
                            aria-label={`View transcript for ${symposium.title}`}
                          >
                            <span>View Transcript</span>
                            <RiExternalLinkLine className="h-4 w-4 ml-2 opacity-70" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 self-start">
                    <span className="inline-flex items-center px-5 py-2.5 rounded-md bg-zinc-800 text-zinc-300 cursor-not-allowed">
                      Event Completed
                      <RiTimeLine className="ml-2.5 h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>
        )}
      </div>
    </main>
  )
}

PreConferenceSymposiums.meta = {
  title: "Pre-Conference Symposiums",
  description: "Learn about the pre-conference symposiums leading up to the AIM: Health R&D Summit.",
}
