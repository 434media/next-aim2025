"use client"

import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import Image from "next/image"
import type React from "react"
import { useEffect, useRef, useState } from "react"

const isDevelopment = process.env.NODE_ENV === "development"

interface AIM2026PopupProps {
  showModal: boolean
  onClose: () => void
}

export default function AIM2026Popup({ showModal, onClose }: AIM2026PopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Load Turnstile script only when needed
  useEffect(() => {
    if (isDevelopment || turnstileWidget || !showModal) return

    const loadTurnstile = () => {
      if (document.getElementById("turnstile-script")) return

      const script = document.createElement("script")
      script.id = "turnstile-script"
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        if (typeof window !== "undefined" && (window as any).turnstile && turnstileRef.current) {
          const widgetId = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
            callback: () => {
              // Token received, no action needed here
            },
          })
          setTurnstileWidget(widgetId)
        }
      }
    }

    loadTurnstile()

    return () => {
      // Clean up widget when component unmounts
      if (turnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          ;(window as any).turnstile.reset(turnstileWidget)
        } catch (error) {
          console.error("Error resetting Turnstile widget:", error)
        }
      }
    }
  }, [turnstileWidget, showModal])

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
      let turnstileResponse = undefined

      if (!isDevelopment) {
        if (typeof window === "undefined" || !(window as any).turnstile || !turnstileWidget) {
          throw new Error("Security verification not loaded. Please refresh and try again.")
        }

        turnstileResponse = (window as any).turnstile.getResponse(turnstileWidget)
        if (!turnstileResponse) {
          throw new Error("Please complete the security verification")
        }
      }

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnstileResponse && { "cf-turnstile-response": turnstileResponse }),
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

        // Reset Turnstile if needed
        if (!isDevelopment && turnstileWidget && typeof window !== "undefined" && (window as any).turnstile) {
          ;(window as any).turnstile.reset(turnstileWidget)
        }
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white border-4 border-black shadow-2xl overflow-hidden max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 bg-black border-2 border-black text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white rounded-lg"
            aria-label="Close AIM 2026 announcement"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col lg:flex-row min-h-[600px] md:min-h-[700px]">
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
            <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden bg-white">
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="flex justify-center mb-4">
                      <Image
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim_color_2026.png"
                        alt="AIM 2026 Logo"
                        width={200}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="w-24 h-1 bg-sky-500 mx-auto mb-4"></div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 leading-tight">
                      Join the AIM Health R&D Summit Newsletter
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
                          className="text-lg text-gray-700 leading-relaxed font-medium"
                        >
                          Get exclusive updates, speaker announcements, and be first to know about breakthrough
                          innovations in military health research and development.
                        </motion.p>
                      ) : (
                        <motion.div
                          key="success-message"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-8 bg-emerald-500/10 border-2 border-emerald-500 rounded-lg"
                          role="status"
                          aria-live="polite"
                        >
                          <div className="mb-2">
                            <div className="w-10 h-10 bg-sky-500 flex items-center justify-center mx-auto mb-2 rounded-full">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 300 }}
                              >
                                <CheckIcon className="h-6 w-6 text-white" />
                              </motion.div>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-black text-black mb-4 tracking-tight">
                              Thank You!
                            </h3>
                            <p className="text-sky-500 text-md leading-relaxed font-medium">
                              You're now connected to the future of military health innovation. Watch for exclusive
                              updates about AIM 2026!
                            </p>
                          </div>
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
                      className="space-y-6"
                      aria-label="AIM Newsletter subscription form"
                    >
                      <div className="relative">
                        <label htmlFor="aim-email" className="sr-only">
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
                          placeholder="Enter your email address"
                          className="w-full px-6 py-4 border-2 border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 text-lg font-medium rounded-lg"
                          aria-describedby={error ? "newsletter-error" : undefined}
                          disabled={isSubmitting}
                          autoComplete="email"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-sky-500 hover:bg-sky-600 border-2 border-sky-500 hover:border-sky-600 text-white py-4 px-8 font-bold text-xl tracking-wide transition-all duration-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white shadow-lg hover:shadow-xl rounded-lg"
                        aria-label="Stay connected with AIM newsletter"
                      >
                        <motion.div
                          animate={isSubmitting ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                          transition={isSubmitting ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY } : {}}
                          className="flex items-center justify-center"
                        >
                          {isSubmitting ? "CONNECTING..." : "STAY CONNECTED"}
                        </motion.div>
                      </motion.button>

                      {!isDevelopment && (
                        <div
                          ref={turnstileRef}
                          data-theme="light"
                          data-size="flexible"
                          className="w-full flex justify-center mt-6"
                          aria-label="Security verification"
                        />
                      )}

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="newsletter-error"
                          className="text-red-600 text-sm text-center font-semibold bg-red-50 border border-red-200 p-3 rounded"
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
