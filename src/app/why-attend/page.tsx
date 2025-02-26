"use client"

import { motion } from "motion/react"
import { RiCheckLine } from "@remixicon/react"
import Image from "next/image"

const reasons = [
  {
    title: "Network with Industry Leaders",
    description: "Connect with military decision-makers and healthcare innovators.",
    icon: "RiUserVoiceLine",
  },
  {
    title: "Cutting-edge Advancements",
    description: "Explore the latest in military medicine and biotechnology.",
    icon: "RiMicroscopeLine",
  },
  {
    title: "Collaboration Opportunities",
    description: "Discover partnerships to accelerate your research and development.",
    icon: "RiTeamLine",
  },
  {
    title: "Military Health Insights",
    description: "Gain valuable insights into military health challenges and priorities.",
    icon: "RiMentalHealthLine",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function WhyAttend() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="initial"
        animate="animate"
        layout
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#101310] mb-8 text-center"
          variants={fadeInUp}
        >
          Why Attend AIM Health R&D Summit
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-[#548cac] mb-12 text-center max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          Join us for an unparalleled opportunity to shape the future of military medicine and forge valuable
          connections.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+17.png"
              alt="AIM Summit attendees networking"
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full h-auto"
              priority
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="order-1 lg:order-2">
            <ul className="space-y-4" aria-label="Reasons to attend AIM Health R&D Summit">
              {reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  className="flex items-start bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <RiCheckLine className="mt-1 mr-3 text-[#5e8266] flex-shrink-0 text-2xl" />
                  <div>
                    <h3 className="font-semibold text-[#101310]">{reason.title}</h3>
                    <p className="text-[#548cac]">{reason.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

WhyAttend.meta = {
  title: "Why Attend AIM Health R&D Summit",
  description:
    "Discover the top reasons to attend the AIM Health R&D Summit and shape the future of military medicine.",
}

