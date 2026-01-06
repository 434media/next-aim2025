"use client"

import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import { useState } from "react"
import { Button } from "../../components/Button"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response.ok) {
        setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "", message: "" })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(responseData.error || "Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(
        `An error occurred while submitting the form: ${error instanceof Error ? error.message : String(error)}. Please try again.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <motion.div
          className="relative px-6 pt-28 pb-12 sm:pt-36 lg:static lg:px-8 lg:py-48"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-gray-100 lg:w-1/2">
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#548cac] to-[#4f4f2c] opacity-10"
                />
              </div>
            </div>

            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center rounded-full bg-[#548cac]/10 px-3 py-1 text-sm font-medium text-[#548cac] ring-1 ring-inset ring-[#548cac]/20">
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              variants={fadeInUp}
            >
              Get in touch
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600"
              variants={fadeInUp}
            >
              Have questions about the AIM Health R&D Summit? We&apos;re here to help. Reach out to us using the form or contact information below.
            </motion.p>

            <motion.dl
              className="mt-10 space-y-6"
              variants={fadeInUp}
              aria-label="Contact information"
            >
              <div className="flex gap-x-4 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#548cac]">
                    <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="flex flex-col justify-center">
                  <p className="text-sm font-semibold text-gray-900">VelocityTX</p>
                  <p className="mt-0.5 text-sm leading-6 text-gray-600">
                    1305 E. Houston St, San Antonio, TX 78205
                  </p>
                </dd>
              </div>

              <div className="flex gap-x-4 rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#548cac]">
                    <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="flex flex-col justify-center">
                  <p className="text-sm font-semibold text-gray-900">Email us</p>
                  <a
                    href="mailto:build@434media.com"
                    className="mt-0.5 text-sm leading-6 text-[#548cac] hover:text-[#3d6a82] transition-colors"
                  >
                    build@434media.com
                  </a>
                </dd>
              </div>
            </motion.dl>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="px-6 pt-12 pb-24 sm:pb-32 lg:px-8 lg:py-48"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          aria-label="Contact form"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <motion.div
              className="rounded-2xl bg-white p-8 ring-1 ring-gray-200 shadow-sm"
              variants={fadeInUp}
            >
              <h2 className="text-xl font-semibold text-gray-900">Send us a message</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className="block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#548cac] text-sm leading-6 transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className="block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#548cac] text-sm leading-6 transition-shadow"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#548cac] text-sm leading-6 transition-shadow"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone number <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone-number"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#548cac] text-sm leading-6 transition-shadow"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#548cac] text-sm leading-6 transition-shadow resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-700 ring-1 ring-green-200"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Message sent successfully!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full"
                    >
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#548cac] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

ContactUs.meta = {
  title: "Contact Us | AIM Health R&D Summit",
  description:
    "Get in touch with the AIM Health R&D Summit team. We're here to answer your questions and provide more information about the event.",
}
