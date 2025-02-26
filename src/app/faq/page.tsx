"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiArrowDownSLine } from "@remixicon/react"

const faqs = [
  {
    question: "When and where is the AIM Health R&D Summit taking place?",
    answer:
      "The AIM Health R&D Summit is scheduled for June 16-17, 2025, at the Henry B. González Convention Center in San Antonio, Texas.",
  },
  {
    question: "Who should attend the AIM Health R&D Summit?",
    answer:
      "The summit is ideal for military medical professionals, researchers, industry leaders, academics, and anyone interested in advancing military health and medical technology.",
  },
  {
    question: "How can I register for the event?",
    answer:
      "You can register for the event through our online registration portal. Early bird discounts are available until February 28, 2025.",
  },
  {
    question: "Are there opportunities for sponsorship or exhibiting?",
    answer:
      "Yes, we offer various sponsorship and exhibitor packages. Please contact our sponsorship team at sponsors@aimhealthsummit.com for more information.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Refunds are available up to 30 days before the event, minus a processing fee. Within 30 days of the event, we offer transfers to another attendee or credit for next year's summit.",
  },
  {
    question: "Is there a dress code for the summit?",
    answer:
      "The dress code is business casual for most summit events. Some evening networking events may require more formal attire.",
  },
  {
    question: "Will the presentations be available after the summit?",
    answer:
      "Yes, registered attendees will have access to presentation slides and recordings (where permitted) through our online portal after the event.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const FAQ = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div className="border-b border-gray-200 py-4" variants={fadeInUp}>
      <button className="flex w-full items-center justify-between text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <RiArrowDownSLine
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-2 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
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
        <motion.h1 className="text-4xl font-bold text-gray-900 mb-8 text-center" variants={fadeInUp}>
          Frequently Asked Questions
        </motion.h1>
        <motion.p className="text-xl text-gray-600 mb-12 text-center" variants={fadeInUp}>
          Find answers to common questions about the AIM Health R&D Summit.
        </motion.p>

        <motion.div className="space-y-4" variants={fadeInUp}>
          {faqs.map((faq, index) => (
            <FAQ key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" variants={fadeInUp}>
          <p className="text-gray-600">
            Don&apos;t see your question here? Contact us at{" "}
            <a href="mailto:barb@434media.com" className="text-orange-600 hover:underline">
              barb@434media.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

FAQPage.meta = {
  title: "FAQ",
  description: "Find answers to common questions about the AIM Health R&D Summit.",
}