"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "motion/react"
import { RiMailLine, RiPhoneLine, RiMapPin2Line, RiSendPlane2Line } from "@remixicon/react"
import { Button } from "@/components/Button"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend or a service like Formspree
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

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
          Contact Us
        </motion.h1>
        <motion.p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
          Have questions or need more information? We&apos;re here to help. Reach out to us using the form below or through
          our contact information.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                ></textarea>
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Send Message
                <RiSendPlane2Line className="ml-2" />
              </Button>
            </form>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <RiMailLine className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">barb@434media.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <RiPhoneLine className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (210) 852-6148</p>
                </div>
              </div>
              <div className="flex items-start">
                <RiMapPin2Line className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    VelocityTX 
                    <br />
                    1305 E. Houston St San Antonio, TX 78205
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">{/* Add social media icons and links here */}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

ContactUs.meta = {
  title: "Contact Us",
  description: "Have questions or need more information? Reach out to us using the form below or through our contact information.",
}