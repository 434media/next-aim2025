"use client"

import { motion } from "motion/react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function CodeOfConduct() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
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
        <motion.h1 className="text-4xl font-bold text-gray-900 mb-8" variants={fadeInUp}>
          Code of Conduct
        </motion.h1>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Purpose</h2>
          <p className="text-gray-700 mb-4">
            The AIM Health R&D Summit is dedicated to providing a harassment-free conference experience for everyone,
            regardless of gender, gender identity and expression, age, sexual orientation, disability, physical
            appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices.
          </p>
          <p className="text-gray-700 mb-4">
            We do not tolerate harassment of conference participants in any form. Sexual language and imagery are not
            appropriate for any conference venue, including talks, workshops, parties, Twitter, and other online media.
            Conference participants violating these rules may be sanctioned or expelled from the conference without a
            refund at the discretion of the conference organizers.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Expected Behavior</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              Participate in an authentic and active way. In doing so, you contribute to the health and longevity of
              this community.
            </li>
            <li>Exercise consideration and respect in your speech and actions.</li>
            <li>Attempt collaboration before conflict.</li>
            <li>Refrain from demeaning, discriminatory, or harassing behavior and speech.</li>
            <li>Be mindful of your surroundings and of your fellow participants.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Unacceptable Behavior</h2>
          <p className="text-gray-700 mb-4">Unacceptable behaviors include, but are not limited to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Intimidating, harassing, abusive, discriminatory, derogatory, or demeaning conduct.</li>
            <li>
              Offensive comments related to gender, gender identity and expression, sexual orientation, disability,
              mental illness, physical appearance, body size, race, age, or religion.
            </li>
            <li>Inappropriate use of nudity and/or sexual images in public spaces (including presentation slides).</li>
            <li>Deliberate intimidation, stalking or following.</li>
            <li>Harassing photography or recording.</li>
            <li>Sustained disruption of talks or other events.</li>
            <li>Inappropriate physical contact.</li>
            <li>Unwelcome sexual attention.</li>
            <li>Advocating for, or encouraging, any of the above behavior.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Consequences of Unacceptable Behavior</h2>
          <p className="text-gray-700 mb-4">
            Unacceptable behavior from any community member, including sponsors and those with decision-making
            authority, will not be tolerated. Anyone asked to stop unacceptable behavior is expected to comply
            immediately.
          </p>
          <p className="text-gray-700 mb-4">
            If a community member engages in unacceptable behavior, the conference organizers may take any action they
            deem appropriate, up to and including a temporary ban or permanent expulsion from the conference without
            warning (and without refund in the case of a paid event).
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reporting Guidelines</h2>
          <p className="text-gray-700 mb-4">
            If you are subject to or witness unacceptable behavior, or have any other concerns, please notify a
            conference organizer as soon as possible. You can report concerns by:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Contacting a staff member wearing a designated &quot;Staff&quot; t-shirt</li>
            <li>Emailing barb@434media.com</li>
            <li>Calling our emergency hotline: +1 (210) 852-6148</li>
          </ul>
        </motion.section>

        <motion.section variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Addressing Grievances</h2>
          <p className="text-gray-700 mb-4">
            If you feel you have been falsely or unfairly accused of violating this Code of Conduct, you should notify
            the conference organizers with a concise description of your grievance. Your grievance will be handled in
            accordance with our existing governing policies.
          </p>
        </motion.section>
      </motion.div>
    </div>
  )
}

CodeOfConduct.meta = {
  title: "Code of Conduct",
  description:
    "The AIM Health R&D Summit is dedicated to providing a harassment-free conference experience for everyone",
}