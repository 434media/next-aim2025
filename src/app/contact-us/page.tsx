"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiMailLine, RiMapPin2Line, RiCheckLine } from "@remixicon/react"
import { Button } from "@/components/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

const isDevelopment = process.env.NODE_ENV === "development"

const CustomIcon = ({ icon: Icon, ...props }: { icon: React.ElementType } & React.SVGProps<SVGSVGElement>) => (
  <Icon {...props} />
)

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
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    if (!isDevelopment && !window.turnstile) {
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        if (window.turnstile && turnstileRef.current && !turnstileWidget) {
          const widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
            callback: (token: string) => {
              console.log("Turnstile token:", token)
            },
          })
          setTurnstileWidget(widgetId)
        }
      }

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [turnstileWidget])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let turnstileResponse = undefined

      if (!isDevelopment) {
        if (!window.turnstile || !turnstileWidget) {
          throw new Error("Turnstile is not initialized")
        }

        turnstileResponse = window.turnstile.getResponse(turnstileWidget)
        if (!turnstileResponse) {
          throw new Error("Failed to get Turnstile response")
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnstileResponse && { "cf-turnstile-response": turnstileResponse }),
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response.ok) {
        setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "", message: "" })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000) // Reset success state after 5 seconds
        if (!isDevelopment && turnstileWidget) {
          window.turnstile.reset(turnstileWidget)
        }
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
    <div className="relative isolate bg-[#101310]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <motion.div
          className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="mx-auto max-w-xl mt-6 lg:mt-0 lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#548cac] to-[#4f4f2c] opacity-20"
                />
              </div>
            </div>
            <motion.h2
              className="text-4xl font-semibold tracking-tight text-pretty text-[#548cac] sm:text-5xl"
              variants={fadeInUp}
            >
              Get in touch
            </motion.h2>
            <motion.p className="mt-8 text-base sm:text-lg/8 text-[#6a6a3d]" variants={fadeInUp}>
              Have questions about the AIM Health R&D Summit? We&apos;re here to help. Reach out to us using the form or
              contact information below.
            </motion.p>
            <motion.dl
              className="mt-12 space-y-4 text-base/7 text-[#6a6a3d]"
              variants={fadeInUp}
              aria-label="Contact information"
            >
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <CustomIcon icon={RiMapPin2Line} aria-hidden="true" className="h-7 w-6 text-[#548cac]" />
                </dt>
                <dd>
                  VelocityTX
                  <br />
                  1305 E. Houston St
                  <br />
                  San Antonio, TX 78205
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <CustomIcon icon={RiMailLine} aria-hidden="true" className="h-7 w-6 text-[#548cac]" />
                </dt>
                <dd>
                  <a href="mailto:barb@434media.com" className="hover:text-[#548cac]">
                    barb@434media.com
                  </a>
                </dd>
              </div>
            </motion.dl>
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          aria-label="Contact form"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <motion.div variants={fadeInUp}>
                <Label htmlFor="first-name" className="block text-sm/6 font-semibold text-[#548cac]">
                  First name
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#548cac] focus:ring-offset-[#101310]"
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Label htmlFor="last-name" className="block text-sm/6 font-semibold text-[#548cac]">
                  Last name
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#548cac] focus:ring-offset-[#101310]"
                  />
                </div>
              </motion.div>
              <motion.div className="sm:col-span-2" variants={fadeInUp}>
                <Label htmlFor="email" className="block text-sm/6 font-semibold text-[#548cac]">
                  Email
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#548cac] focus:ring-offset-[#101310]"
                  />
                </div>
              </motion.div>
              <motion.div className="sm:col-span-2" variants={fadeInUp}>
                <Label htmlFor="phone-number" className="block text-sm/6 font-semibold text-[#548cac]">
                  Phone number
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#548cac] focus:ring-offset-[#101310]"
                  />
                </div>
              </motion.div>
              <motion.div className="sm:col-span-2" variants={fadeInUp}>
                <Label htmlFor="message" className="block text-sm/6 font-semibold text-[#548cac]">
                  Message
                </Label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#548cac] focus:ring-offset-[#101310]"
                  />
                </div>
              </motion.div>
              {!isDevelopment && (
                <motion.div className="sm:col-span-2" variants={fadeInUp}>
                  <div ref={turnstileRef} className="w-full" />
                </motion.div>
              )}
            </div>
            <motion.div className="sm:col-span-2" variants={fadeInUp}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center w-full space-x-2 text-green-500"
                  >
                    <RiCheckLine className="h-5 w-5" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full"
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#548cac]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
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

