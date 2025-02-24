"use client"

import { motion } from "motion/react"
import { RiCalendarLine, RiMapPinLine, RiArrowRightLine } from "@remixicon/react"
import { Button } from "@/components/Button"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const symposiums = [
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
  },
  {
    title: "Pathways to Innovation: Navigating Medical IP with the Federal Government",
    date: "April 21, 2025",
    location: "Hosted at VelocityTX with streaming via Teams",
    description:
      "Did you know that DoD and VA medical researchers are developing valuable intellectual property? These organizations cannot develop products on their own and depend on the private sector to commercialize their medical technologies.",
    speakers: [],
    registerLink: "https://www.eventbrite.com/e/pathways-to-innovation-navigating-medical-ip-with-the-federal-government-tickets-1237932362019",
  },
  {
    title: "Pathways to Commercialization: Leveraging Federal & Private Sector Funding",
    date: "May 19, 2025",
    location: "Hosted at VelocityTX with streaming via Teams",
    description:
      "Bringing a medical product to market is a long, costly, and high-risk journey. Many startups and small businesses rely on non-dilutive funding—such as grants and SBA SBIR/STTR awards—to advance their technology without sacrificing equity.",
    speakers: [],
    registerLink: "https://www.eventbrite.com/e/pathways-to-commercialization-leveraging-federal-private-sector-funding-tickets-1238030736259",
  },
]

export default function PreConferenceSymposiums() {
  const featuredSymposium = symposiums[0]
  const remainingSymposiums = symposiums.slice(1)

  return (
    <main className="min-h-screen bg-black text-white pt-16 sm:pt-20 mt-16 md:mt-10" id="main-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Symposium Section */}
        <motion.div
          className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-8 lg:py-16"
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 lg:mb-8">
              {featuredSymposium.title}
            </h1>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center">
                <RiCalendarLine className="mr-2" aria-hidden="true" />
                <span>{featuredSymposium.date}</span>
              </div>
              <div className="flex items-center">
                <RiMapPinLine className="mr-2" aria-hidden="true" />
                <span>{featuredSymposium.location}</span>
              </div>
            </div>

            <p className="text-gray-400 text-base lg:text-lg mb-8">{featuredSymposium.description}</p>

            <Button
              href={featuredSymposium.registerLink}
              variant="secondary"
              className="inline-flex items-center group transition-all duration-200"
              aria-label="Register for SME Encounter Sessions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
              <RiArrowRightLine className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex-1 bg-zinc-900 rounded-xl p-1 md:p-2 w-full max-w-xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-800">
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
                alt="SME Encounter Sessions preview"
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Remaining Symposiums Section */}
        <motion.div className="mt-16 lg:mt-20 space-y-12 pb-16" variants={fadeInUp}>
          <h2 className="text-2xl lg:text-3xl font-light mb-8">Upcoming Symposiums</h2>
          {remainingSymposiums.map((symposium, index) => (
            <motion.article
              key={index}
              className="border-t border-zinc-800 pt-8 group"
              variants={fadeInUp}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl lg:text-2xl font-light group-hover:text-gray-300 transition-colors">
                    {symposium.title}
                  </h3>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center">
                      <RiCalendarLine className="mr-2" aria-hidden="true" />
                      <span>{symposium.date}</span>
                    </div>
                    <div className="flex items-center">
                      <RiMapPinLine className="mr-2" aria-hidden="true" />
                      <span>{symposium.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 max-w-prose">{symposium.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    href={symposium.registerLink}
                    variant="secondary"
                    className="whitespace-nowrap group/button"
                    aria-label={`Register for ${symposium.title}`}
                  >
                    Register Now
                    <RiArrowRightLine
                      className="ml-2 group-hover/button:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  )
}

PreConferenceSymposiums.meta = {
  title: "Pre-Conference Symposiums",
  description: "Learn about the pre-conference symposiums leading up to the AIM: Health R&D Summit.",
}
