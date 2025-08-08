"use client"

import { motion } from "motion/react"
import {
  RiMapPinLine,
  RiArrowRightLine,
  RiFileTextLine,
  RiVideoLine,
  RiExternalLinkLine,
} from "@remixicon/react"
import { Button } from "../../components/Button"
import Image from "next/image"
import MMIDCallout from "../../components/MMIDCallout"

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
    videoComingSoon: false,
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
    speakers: [],
    registerLink: "https://www.eventbrite.com/e/sneak-preview-aim-2025-sme-encounter-sessions-tickets-1234940392959",
    completed: true,
    slideDeckUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/Intro+to+AIM+Encounter+Sessions+(Mar+2025)+ver3.pdf",
  },
]

export default function PreConferenceSymposiums() {
  const archivedSymposiums = symposiums.filter((s) => s.completed)

  return (
    <main
      className="min-h-screen bg-white text-neutral-900 pt-20 sm:pt-28"
      id="main-content"
      aria-labelledby="page-heading"
    >
      {/* New Hero Section - Matching Reference Layout */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 leading-[0.9] tracking-tight"
                  id="page-heading"
                >
                  Conference Symposiums
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                    These focused sessions provide deep insights into military healthcare innovation, funding opportunities, 
                    and collaboration pathways.
                  </p>
                  
                  <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                    Connect with experts, explore breakthrough technologies, and gain the knowledge needed to maximize 
                    your summit experience. 
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  href="#archived-heading"
                  variant="primary"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group text-lg"
                  aria-label="View archived symposiums"
                >
                  Explore Sessions
                  <RiArrowRightLine 
                    className="inline-flex ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    aria-hidden="true" 
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/preaimweb-23.jpg"
                  alt="Pre-conference symposium participants engaging in collaborative discussion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-600/10 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* MMID Callout Section */}
      <MMIDCallout />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Archived Symposiums Section - Updated Layout */}
        {archivedSymposiums.length > 0 && (
          <motion.section
            className="mt-0 lg:mt-16 space-y-6 pb-20"
            variants={fadeInUp}
            aria-labelledby="archived-heading"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-[#366A79] rounded-full"></div>
              <h2
                id="archived-heading"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900"
              >
                Archived Symposiums
              </h2>
            </div>
            
            <div className="space-y-4">
              {archivedSymposiums.map((symposium, index) => (
                <motion.article
                  key={index}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Time and Date Column */}
                    <div className="lg:col-span-3 p-6 lg:p-8 bg-neutral-50/50 border-b lg:border-b-0 lg:border-r border-neutral-200">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                          {new Date(symposium.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center text-neutral-600">
                          <RiMapPinLine className="h-4 w-4 mr-2 text-sky-600" aria-hidden="true" />
                          <span className="text-sm">{symposium.location}</span>
                        </div>
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-6 p-6 lg:p-8">
                      <div className="space-y-4">
                        <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 leading-tight">
                          {symposium.title}
                        </h3>
                        
                        {symposium.speakers && symposium.speakers.length > 0 && (
                          <div className="space-y-2">
                            {symposium.speakers.map((speaker, idx) => (
                              <div key={idx} className="text-sm text-neutral-600">
                                <span className="font-medium text-neutral-800">{speaker.name}</span>
                                <div className="text-neutral-500">{speaker.title}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tags/Categories */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                            Medical Innovation
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Federal Funding
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Commercialization
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description and Actions Column */}
                    <div className="lg:col-span-3 p-6 lg:p-8 bg-neutral-50/30 border-t lg:border-t-0 lg:border-l border-neutral-200">
                      <div className="space-y-4">
                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-4">
                          {symposium.description}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="space-y-2">
                          {symposium.slideDeckUrl && (
                            <a
                              href={symposium.slideDeckUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center w-full px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
                              aria-label={`View slide deck for ${symposium.title}`}
                            >
                              <RiFileTextLine className="h-4 w-4 mr-2" aria-hidden="true" />
                              <span>Slide Deck</span>
                              <RiExternalLinkLine className="h-3 w-3 ml-auto opacity-70" aria-hidden="true" />
                            </a>
                          )}
                          
                          {symposium.recordingUrl && (
                            <a
                              href={`/video-player?url=${encodeURIComponent(symposium.recordingUrl)}&title=${encodeURIComponent(symposium.title)}`}
                              className="inline-flex items-center w-full px-3 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
                              aria-label={`Watch recording of ${symposium.title}`}
                            >
                              <RiVideoLine className="h-4 w-4 mr-2" aria-hidden="true" />
                              <span>Watch Recording</span>
                              {symposium.videoDuration && (
                                <span className="ml-auto text-xs bg-sky-500 px-1.5 py-0.5 rounded">
                                  {symposium.videoDuration}
                                </span>
                              )}
                            </a>
                          )}
                          
                          {symposium.videoComingSoon && symposium.videoUrl && (
                            <a
                              href={symposium.videoUrl}
                              className="inline-flex items-center w-full px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
                              aria-label={`Watch coming soon video for ${symposium.title}`}
                            >
                              <RiVideoLine className="h-4 w-4 mr-2" aria-hidden="true" />
                              <span>Recording</span>
                              <span className="ml-auto text-xs bg-neutral-200 px-1.5 py-0.5 rounded">
                                Coming Soon
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
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
