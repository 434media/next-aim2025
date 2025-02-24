"use client"

import { motion } from "motion/react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function PrivacyPolicy() {
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
          Privacy Policy
        </motion.h1>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            AIM Health R&D Summit (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our website or use our
            services.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us, such as when you register for the event, sign up for
            our newsletter, or contact us with inquiries.
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Personal information (e.g., name, email address, phone number)</li>
            <li>Professional information (e.g., job title, company name)</li>
            <li>Payment information (processed securely through our payment providers)</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sharing of Information</h2>
          <p className="text-gray-700 mb-4">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Service providers who perform services on our behalf</li>
            <li>Professional advisors, such as lawyers, auditors, and insurers</li>
            <li>Government and law enforcement officials when required by law</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please note that no method of transmission over the Internet or electronic storage is
            100% secure.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, correct, or delete your personal information. You may also have the right to
            restrict or object to certain processing of your information. To exercise these rights, please contact us
            using the information provided at the end of this policy.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </motion.section>

        <motion.section variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            AIM Health R&D Summit
            <br />
            Email: barb@434media.com.com
            <br />
            Phone: +1 (210) 852-6148
          </p>
        </motion.section>
      </motion.div>
    </div>
  )
}

