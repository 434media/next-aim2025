"use client"

import { RiArrowRightLine, RiCheckLine, RiSpeakLine } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "../../components/Button"

const isDevelopment = process.env.NODE_ENV === "development"

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

interface SpeakerPOC {
  id: string
  name: string
  email?: string
}

interface NominationFormData {
  speakerPocId: string
  speakerPocName: string
  speakerPocCustomName?: string
  speakerName: string
  roleTitle: string
  company: string
  linkedinProfile: string
  shortJustification: string
}

export default function KeynoteNomination() {
  const [currentStep, setCurrentStep] = useState<'poc' | 'nomination'>('poc')
  const [speakerPOCs, setSpeakerPOCs] = useState<SpeakerPOC[]>([])
  const [loadingSpeakers, setLoadingSpeakers] = useState(true)
  const [selectedPOC, setSelectedPOC] = useState<string>("")
  const [customPOCName, setCustomPOCName] = useState("")
  const [isOtherSelected, setIsOtherSelected] = useState(false)

  const [formData, setFormData] = useState<NominationFormData>({
    speakerPocId: "",
    speakerPocName: "",
    speakerPocCustomName: "",
    speakerName: "",
    roleTitle: "",
    company: "",
    linkedinProfile: "",
    shortJustification: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const [turnstileWidget, setTurnstileWidget] = useState<string | null>(null)

  // Load Speaker POCs on mount
  useEffect(() => {
    async function loadSpeakerPOCs() {
      try {
        const response = await fetch("/api/speaker-pocs")
        if (response.ok) {
          const pocs = await response.json()
          setSpeakerPOCs(pocs)
        } else {
          console.error("Failed to load speaker POCs")
        }
      } catch (error) {
        console.error("Error loading speaker POCs:", error)
      } finally {
        setLoadingSpeakers(false)
      }
    }
    loadSpeakerPOCs()
  }, [])

  // Initialize Turnstile
  useEffect(() => {
    if (!isDevelopment && !window.turnstile && currentStep === 'nomination') {
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
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [turnstileWidget, currentStep])

  const handlePOCSelection = (pocId: string) => {
    if (pocId === "other") {
      setIsOtherSelected(true)
      setSelectedPOC("")
      // Update form data immediately for "other" selection
      setFormData(prev => ({
        ...prev,
        speakerPocId: "other",
        speakerPocName: "Other",
        speakerPocCustomName: customPOCName
      }))
    } else {
      setIsOtherSelected(false)
      setSelectedPOC(pocId)
      const selectedSpeaker = speakerPOCs.find(poc => poc.id === pocId)
      if (selectedSpeaker) {
        setFormData(prev => ({
          ...prev,
          speakerPocId: pocId,
          speakerPocName: selectedSpeaker.name
        }))
      }
    }
  }

  const handleCustomPOCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomPOCName(value)
    if (isOtherSelected) {
      setFormData(prev => ({
        ...prev,
        speakerPocId: "other",
        speakerPocName: "Other",
        speakerPocCustomName: value
      }))
    }
  }

  const canProceedToPOC = () => {
    if (isOtherSelected) {
      return customPOCName.trim().length > 0
    }
    return selectedPOC.length > 0
  }

  const proceedToNomination = () => {
    if (canProceedToPOC()) {
      setCurrentStep('nomination')
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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

      const response = await fetch("/api/keynote-nominations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(turnstileResponse && { "cf-turnstile-response": turnstileResponse }),
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setCurrentStep('poc')
          setFormData({
            speakerPocId: "",
            speakerPocName: "",
            speakerPocCustomName: "",
            speakerName: "",
            roleTitle: "",
            company: "",
            linkedinProfile: "",
            shortJustification: "",
          })
          setSelectedPOC("")
          setCustomPOCName("")
          setIsOtherSelected(false)
        }, 5000)

        if (!isDevelopment && turnstileWidget) {
          window.turnstile.reset(turnstileWidget)
        }
      } else {
        throw new Error(responseData.error || "Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(
        `An error occurred while submitting the nomination: ${error instanceof Error ? error.message : String(error)}. Please try again.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative isolate bg-white min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Hero Section with Image and Overlay Text */}
        <motion.div
          className="relative px-6 pt-24 pb-6 sm:pt-32 lg:static lg:px-8 lg:py-48"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="mx-auto max-w-xl mt-6 lg:mt-0 lg:mx-0 lg:max-w-lg">
            {/* Background gradient effect */}
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
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#548cac] to-[#4f4f2c] opacity-20"
                />
              </div>
            </div>

            {/* Featured image with overlay text */}
            <div className="relative mb-8">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/0P3A0007.jpg"
                  alt="Keynote speaker presenting to audience"
                  className="h-full w-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Overlay text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <motion.h1
                    className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                    variants={fadeInUp}
                  >
                    Nominate a Keynote Speaker
                  </motion.h1>
                  <motion.p className="mt-4 text-lg sm:text-xl text-white/90" variants={fadeInUp}>
                    Help us identify the most impactful voices in military health R&D for AIM 2026
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Additional content below image */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div className="flex items-start gap-4">
                <RiSpeakLine className="h-8 w-8 text-[#548cac] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Shape the Future</h3>
                  <p className="text-gray-600 mt-1">
                    Your nomination helps identify thought leaders who will inspire and guide the next generation of military health innovations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <RiCheckLine className="h-8 w-8 text-[#548cac] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Two-Step Process</h3>
                  <p className="text-gray-600 mt-1">
                    First, identify yourself as an authorized nominator, then submit your keynote speaker recommendation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <AnimatePresence mode="wait">
              {currentStep === 'poc' && (
                <motion.div
                  key="poc-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#548cac] mb-2">Step 1: Identify Yourself</h2>
                    <p className="text-gray-600">
                      Please select your name from the list of authorized nominators, or choose "Other" if you're not listed.
                    </p>
                  </div>

                  {loadingSpeakers ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#548cac] mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading authorized nominators...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="speaker-poc-select" className="block text-sm font-semibold text-[#548cac] mb-2">
                          Select your name
                        </label>
                        <select
                          id="speaker-poc-select"
                          value={isOtherSelected ? "other" : selectedPOC}
                          onChange={(e) => handlePOCSelection(e.target.value)}
                          className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                          required
                        >
                          <option value="">-- Select your name --</option>
                          <option value="other">Other / Not Listed</option>
                          {speakerPOCs.map((poc) => (
                            <option key={poc.id} value={poc.id}>
                              {poc.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {isOtherSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <label htmlFor="custom-name" className="block text-sm font-semibold text-[#548cac] mb-2">
                            Enter your full name
                          </label>
                          <input
                            id="custom-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={customPOCName}
                            onChange={handleCustomPOCChange}
                            className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                            required
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  <div className="mt-8">
                    <Button
                      onClick={proceedToNomination}
                      variant="primary"
                      className="w-full inline-flex items-center justify-center gap-2"
                      disabled={!canProceedToPOC() || loadingSpeakers}
                    >
                      Continue to Nomination
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'nomination' && (
                <motion.div
                  key="nomination-step"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full relative z-10"
                >
                  <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold text-[#548cac] mb-2">Step 2: Nominate Speaker</h2>
                      <p className="text-gray-600">
                        Provide details about your recommended keynote speaker for AIM 2026.
                      </p>
                      <div className="mt-2 text-sm text-gray-500">
                        Nominating as: <strong>{isOtherSelected ? customPOCName : speakerPOCs.find(poc => poc.id === selectedPOC)?.name}</strong>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="speakerName" className="block text-sm font-semibold text-[#548cac] mb-2">
                        Speaker Name *
                      </label>
                      <input
                        id="speakerName"
                        name="speakerName"
                        type="text"
                        value={formData.speakerName}
                        onChange={handleFormChange}
                        required
                        className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                        placeholder="Enter the speaker's full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="roleTitle" className="block text-sm font-semibold text-[#548cac] mb-2">
                        Role / Title *
                      </label>
                      <input
                        id="roleTitle"
                        name="roleTitle"
                        type="text"
                        value={formData.roleTitle}
                        onChange={handleFormChange}
                        required
                        className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                        placeholder="e.g., Chief Medical Officer, Director of Research"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-[#548cac] mb-2">
                        Company *
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleFormChange}
                        required
                        className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                        placeholder="Organization or company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedinProfile" className="block text-sm font-semibold text-[#548cac] mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        id="linkedinProfile"
                        name="linkedinProfile"
                        type="url"
                        value={formData.linkedinProfile}
                        onChange={handleFormChange}
                        className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                        placeholder="https://linkedin.com/in/speaker-name"
                      />
                    </div>

                    <div>
                      <label htmlFor="shortJustification" className="block text-sm font-semibold text-[#548cac] mb-2">
                        Short Justification *
                      </label>
                      <textarea
                        id="shortJustification"
                        name="shortJustification"
                        rows={4}
                        value={formData.shortJustification}
                        onChange={handleFormChange}
                        required
                        className="block w-full rounded-md bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#548cac] sm:text-sm sm:leading-6"
                        placeholder="Briefly explain why this person would be an excellent keynote speaker for AIM 2026. Include their expertise, impact, and relevance to military health R&D."
                      />
                    </div>

                    {!isDevelopment && (
                      <div>
                        <div ref={turnstileRef} data-size="flexible" className="w-full" />
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep('poc')}
                        variant="secondary"
                        className="flex-1"
                      >
                        Back
                      </Button>

                      <AnimatePresence mode="wait">
                        {isSuccess ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex-1 flex items-center justify-center space-x-2 text-green-500 bg-green-50 rounded-md px-3.5 py-2.5"
                          >
                            <RiCheckLine className="h-5 w-5" />
                            <span>Nomination submitted successfully!</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex-1"
                          >
                            <Button
                              type="submit"
                              variant="primary"
                              className="w-full"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Submit Nomination"}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}