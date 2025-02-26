"use client"

import { motion } from "motion/react"
import { RiTeamLine, RiPresentationLine, RiDiscussLine, RiLightbulbLine, RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "@/components/Button"

const teamBenefits = [
  {
    icon: RiTeamLine,
    title: "Collaborative Learning",
    description: "Engage in group discussions and workshops, fostering team growth and shared insights.",
  },
  {
    icon: RiPresentationLine,
    title: "Diverse Perspectives",
    description: "Attend a wide range of sessions, allowing team members to cover more ground and share knowledge.",
  },
  {
    icon: RiDiscussLine,
    title: "Networking Opportunities",
    description: "Expand your organization's network by connecting with industry leaders and potential partners.",
  },
  {
    icon: RiLightbulbLine,
    title: "Innovation Catalyst",
    description: "Inspire creativity and new ideas through exposure to cutting-edge technologies and research.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

export default function BringYourTeam() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen pt-24">
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
        <motion.h1 className="text-4xl font-bold text-[#101310] mb-8 text-center" variants={fadeInUp}>
          Bring Your Team to AIM Health R&D Summit
        </motion.h1>
        <motion.p className="text-xl text-[#548CAC] mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
          Maximize your organization&apos;s impact by bringing your entire team to the premier event in military medical
          innovation.
        </motion.p>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {teamBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-white rounded-lg shadow-md p-6"
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <benefit.icon className="text-4xl text-[#F26419] mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[#101310] mb-2">{benefit.title}</h2>
              <p className="text-[#548CAC]">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-16" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-[#101310] mb-4 text-center">Group Registration Benefits</h2>
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mt-8"
            whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <ul className="space-y-4" aria-label="Group registration benefits">
              {[
                "Discounted rates for groups of 5 or more",
                "Priority seating for keynote sessions",
                "Exclusive team networking opportunities",
                "Customized agenda planning assistance",
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RiArrowRightUpLine className="text-[#F26419] mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#548CAC]">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div className="mt-16 text-center" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-[#101310] mb-4">Ready to Register Your Team?</h2>
          <p className="text-[#548CAC] mb-8 max-w-2xl mx-auto">
            Contact our team registration specialist to learn more about group discounts and benefits.
          </p>
          <Button
            variant="primary"
            href="mailto:barb@434media.com"
          >
            Contact Team Registration
            <RiArrowRightUpLine className="inline-flex ml-2" aria-hidden="true" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

