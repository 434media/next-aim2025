"use client"

import { motion } from "motion/react"
import { RiCheckLine, RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "@/components/Button"
import Image from "next/image"

const reasons = [
  "Network with industry leaders and military decision-makers",
  "Learn about cutting-edge advancements in military medicine",
  "Explore partnership and collaboration opportunities",
  "Gain insights into military health challenges and priorities",
  "Showcase your innovations to a targeted audience",
  "Participate in hands-on workshops and demonstrations",
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
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.h1 className="text-4xl font-bold text-gray-900 mb-8 text-center" variants={fadeInUp}>
          Why Attend AIM Health R&D Summit
        </motion.h1>
        <motion.p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
          Join us for an unparalleled opportunity to shape the future of military medicine and forge valuable
          connections.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div variants={fadeInUp}>
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+30.png"
              alt="AIM Summit attendees networking"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Reasons to Attend</h2>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <RiCheckLine className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div className="mt-16 text-center" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Join Us?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Don&apos;t miss this opportunity to be part of the premier event in military medical innovation.
          </p>
          <Button
            variant="primary"
            className="py-3 px-8 text-lg"
            href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
          >
            Register Now
            <RiArrowRightUpLine className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

WhyAttend.meta = {
  title: "Why Attend",
  description: "Join us for an unparalleled opportunity to shape the future of military medicine and forge valuable connections.",
}