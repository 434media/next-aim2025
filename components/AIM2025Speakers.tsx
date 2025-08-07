"use client"

import { RiArrowRightLine } from "@remixicon/react"
import { ExternalLink } from 'lucide-react'
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { GlowingEffect } from "../components/ui/glowing-effect"

interface Speaker {
  id: string
  name: string
  title: string
  organization: string
  image: string
  linkedinUrl: string
}

// Sample speakers data - replace with actual data
const speakers: Speaker[] = [
  {
    id: "1",
    name: "Lt. Gen. Robert Miller",
    title: "Associate Vice President & Director",
    organization: "Military Health Institute",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/210621-F-XA123-1011.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/lt-gen-robert-bob-miller/"
  },
  {
    id: "2",
    name: "Scott Walter",
    title: "Director of Technology",
    organization: "59th Medical Wing",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/walter2.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/dr-scott-f-walter-pe-a94bb585/"
  },
  {
    id: "3",
    name: "Jenny Hsieh, PhD",
    title: "Professor and Department Chair",
    organization: "UTSA Brain Health Consortium",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/hsieh.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/jenny-hsieh-65648a206/"
  },
  {
    id: "4",
    name: "Rene Dominguez",
    title: "President & CEO",
    organization: "VelocityTX",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Rene2.jpeg",
    linkedinUrl: "https://velocitytx.org/"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

export function AIM2025Speakers() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-neutral-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 mb-6 leading-[0.9] tracking-tight"
          >
            Speakers from around{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
              the globe
            </span>
          </motion.h2>

          {/* Section Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Meet the leaders, researchers, and dedicated professionals who shaped the future of military medicine at AIM&apos;25.
          </motion.p>

          {/* View All Speakers Button */}
          <motion.div
            variants={itemVariants}
          >
            <Link
              href="/speakers"
              className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              View AIM&apos;25 Speakers
              <RiArrowRightLine className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Speaker Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {speakers.map((speaker) => (
            <motion.div
              key={speaker.id}
              variants={cardVariants}
              className="group"
            >
              <Link
                href={speaker.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100">
                  <GlowingEffect
                    variant="sky"
                    disabled={false}
                    proximity={100}
                    spread={30}
                    borderWidth={2}
                    movementDuration={1.5}
                    className="rounded-2xl"
                  />

                  <div className="flex items-center space-x-6 relative z-10">
                    {/* Speaker Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-neutral-100">
                        <Image
                          src={speaker.image || "/placeholder.svg"}
                          alt={speaker.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Speaker Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                        {speaker.name}
                      </h3>
                      <p className="text-base sm:text-lg font-semibold text-sky-600 mb-1">
                        {speaker.title}
                      </p>
                      <p className="text-sm sm:text-base text-neutral-600 font-medium">
                        {speaker.organization}
                      </p>
                    </div>

                    {/* External Link Icon */}
                    <div className="flex-shrink-0">
                      <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-sky-600 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
