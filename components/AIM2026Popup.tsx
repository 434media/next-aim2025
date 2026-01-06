"use client"

import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import type React from "react"
import { useRef, useState } from "react"

interface AIM2026PopupProps {
  showModal: boolean
  onClose: () => void
}

export default function AIM2026Popup({ showModal, onClose }: AIM2026PopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const validateEmail = (email: string): boolean => {
    return emailPattern.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous states
    setError(null)

    // Validate email
    if (!email.trim()) {
      setError("Enter your email to stay connected")
      inputRef.current?.focus()
      return
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address")
      inputRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (response.ok) {
        setEmail("")
        setIsSuccess(true)
        // Reset form
        formRef.current?.reset()

        // Reset success state and close modal after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 3000)
      } else {
        throw new Error(responseData.error || "Failed to stay connected")
      }
    } catch (error) {
      console.error("Error subscribing to AIM newsletter:", error)
      setError(`${error instanceof Error ? error.message : "An unexpected error occurred"}. Try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-full shadow-sm"
            aria-label="Close AIM 2026 announcement"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[560px]">
            {/* Left Side - Visual Content */}
            <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sky-500 to-sky-600">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 z-10" />
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg"
                alt="AIM Health R&D Summit Collaboration"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right Side - Newsletter Form */}
            <div className="lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden bg-white">
              <div className="relative z-10 max-w-md mx-auto lg:mx-0">
                {/* Header */}
                <div className="mb-8">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="flex justify-center lg:justify-start mb-6">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim_color_2026.png"
                        alt="AIM 2026 Logo"
                        width={160}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug tracking-tight text-center lg:text-left">
                      Stay Connected with the AIM Health R&D Summit
                    </h2>
                  </motion.div>

                  {/* Value Proposition */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <AnimatePresence mode="wait">
                      {!isSuccess ? (
                        <motion.p
                          key="value-prop"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-base text-gray-600 leading-7 text-center lg:text-left"
                          style={{ maxWidth: '45ch' }}
                        >
                          Get exclusive updates, speaker announcements, and early access to breakthrough innovations in military health research.
                        </motion.p>
                      ) : (
                        <motion.div
                          key="success-message"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-6 px-4 bg-emerald-50 border border-emerald-200 rounded-xl"
                          role="status"
                          aria-live="polite"
                        >
                          <div className="w-12 h-12 bg-emerald-500 flex items-center justify-center mx-auto mb-4 rounded-full">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 300 }}
                            >
                              <CheckIcon className="h-6 w-6 text-white" />
                            </motion.div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                            You're on the list!
                          </h3>
                          <p className="text-sm text-gray-600 leading-6">
                            Watch your inbox for exclusive updates about AIM 2026.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Form */}
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      ref={formRef}
                      key="subscribe-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      aria-label="AIM Newsletter subscription form"
                    >
                      <div className="relative">
                        <label htmlFor="aim-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email address
                        </label>
                        <input
                          id="aim-email"
                          ref={inputRef}
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-200 text-base rounded-xl"
                          aria-describedby={error ? "newsletter-error" : undefined}
                          disabled={isSubmitting}
                          autoComplete="email"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 px-6 font-medium text-base transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-xl"
                        aria-label="Stay connected with AIM newsletter"
                      >
                        {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                      </motion.button>

                      <p className="text-xs text-gray-500 text-center leading-5 pt-2">
                        By subscribing, you agree to receive emails from AIM. You can unsubscribe at any time.
                      </p>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="newsletter-error"
                          className="text-red-600 text-sm text-center font-medium bg-red-50 border border-red-200 p-3 rounded-lg"
                          role="alert"
                        >
                          {error}
                        </motion.div>
                      )}
                    </motion.form>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
