"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import DNAGlobe from "./DNAGlobe"

export default function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <motion.section
      ref={containerRef}
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl shadow-[#366A79]/70 my-24"
      style={{ opacity, scale }}
    >
      <div className="absolute inset-0">
        <Image
          alt="Medical research background"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/milcityusa-2-testimonial.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#101310]/70 to-[#101310]/80" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 space-y-8 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2 lg:w-3/5 mb-8 md:mb-0 md:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <svg
              aria-hidden="true"
              className="absolute -top-12 -left-8 -z-10 h-32 w-32 stroke-[#548cac]/20 sm:h-36 sm:w-36"
              fill="none"
              viewBox="0 0 144 144"
            >
              <path
                strokeWidth={2}
                d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
              />
            </svg>
            <blockquote
              className="relative text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight text-white mb-6"
              aria-label="Testimonial quote"
            >
              <p className="text-white text-shadow-md">
                <strong className="font-semibold">
                  Forums like MMID give us the opportunity to collaborate with organizations outside of DoD
                </strong>{" "}
                so they have a better idea how to engage with the military&apos;s medical mission and advance healthcare
                innovation
              </p>
            </blockquote>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white p-2 rounded-full">
              <Image
                alt="Defense Health Agency Logo"
                src="/images/smiller.png"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
            <div className="text-lg font-medium text-white">Dr. Sean Biggerstaff</div>
              <div className="text-base text-[#548cac] font-semibold md:max-w-sm md:text-balance">
                Acting Deputy Assistant Director, Research and Engineering, Defense Health Agency
              </div>
            </div>
          </motion.div>
        </div>
        <div className="md:w-1/2 lg:w-2/5 relative">
          <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-[150%] aspect-square">
            <DNAGlobe width={600} height={600} className="opacity-95" />
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#366A79]/60 pointer-events-none"
        aria-hidden="true"
      />
    </motion.section>
  )
}

