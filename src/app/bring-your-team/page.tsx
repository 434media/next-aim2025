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
  transition: { duration: 0.5 },
}

export default function BringYourTeam() {
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
          Bring Your Team to AIM Health R&D Summit
        </motion.h1>
        <motion.p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
          Maximize your organization&apos;s impact by bringing your entire team to the premier event in military medical
          innovation.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-white rounded-lg shadow-md p-6"
              variants={fadeInUp}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <benefit.icon className="text-4xl text-orange-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h2>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Group Registration Benefits</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <ul className="space-y-4">
              <li className="flex items-center">
                <RiArrowRightUpLine className="text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Discounted rates for groups of 5 or more</span>
              </li>
              <li className="flex items-center">
                <RiArrowRightUpLine className="text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Priority seating for keynote sessions</span>
              </li>
              <li className="flex items-center">
                <RiArrowRightUpLine className="text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Exclusive team networking opportunities</span>
              </li>
              <li className="flex items-center">
                <RiArrowRightUpLine className="text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Customized agenda planning assistance</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="mt-16 text-center" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Register Your Team?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team registration specialist to learn more about group discounts and benefits.
          </p>
          <Button variant="primary" className="py-3 px-8 text-lg" href="mailto:team-registration@aimhealthsummit.com">
            Contact Team Registration
            <RiArrowRightUpLine className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

BringYourTeam.meta = {
  title: "Bring Your Team",
  description: "Maximize your organization's impact by bringing your entire team to the premier event in military medical innovation.",
}
