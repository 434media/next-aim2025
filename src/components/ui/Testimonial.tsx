"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Button } from "@/components/Button"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const particleColors = ["#548cac", "#0891b2", "#0e7490", "#ffffff"]

export default function Testimonial() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [particles, setParticles] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const generateParticles = () => {
      return [...Array(isMobile ? 30 : 60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            backgroundColor: particleColors[Math.floor(Math.random() * particleColors.length)],
            right: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))
    }

    setParticles(generateParticles())
  }, [isMobile])

  return (
    <motion.section
      className="my-12 md:my-16 relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl shadow-[#366A79]/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-[#101310]/95 md:bg-gradient-to-br md:from-white/20 md:to-[#101310]/95" />
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">{particles}</div>

      <div className="relative z-10 flex flex-col items-center justify-between p-8 sm:p-12 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">SPONSOR SPOTLIGHT</h2>
          <div className="h-1 w-24 bg-[#0891b2] mx-auto mb-8"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/The+METIS+Foundation.png"
                alt="The Metis Foundation - AIM Health R&D Summit Sponsor"
                width={600}
                height={400}
                className=""
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:w-1/2"
          >
            <blockquote className="relative text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight text-white mb-6 mt-2 md:mt-0">
              <svg
                aria-hidden="true"
                className="absolute -top-10 -left-8 h-16 w-16 text-[#0891b2]/20"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-white relative z-10">
                <strong className="font-semibold text-[#0891b2]">
                  At Metis Foundation, we are scientists serving scientists
                </strong>
                —advancing military medicine through mission-focused innovation, strategic collaboration, and
                sustainable funding to deliver real-world solutions from bench to battlefield.
              </p>
            </blockquote>

            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white p-1 rounded-full">
                  <Image
                    alt="Aners Carlsson profile"
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/metis-profile.jpeg"
                    width={80}
                    height={80}
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="text-lg font-medium text-white">Anders Carlsson, PhD</div>
                  <div className="text-base text-[#0891b2] font-semibold">COO, The Metis Foundation</div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  href="https://metisfoundationusa.org/"
                  variant="primary"
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white"
                >
                  Learn More About Our Sponsor
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0891b2]/30 pointer-events-none"
        aria-hidden="true"
      />
    </motion.section>
  )
}
