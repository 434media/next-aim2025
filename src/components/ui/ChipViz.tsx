"use client"

import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

const ChipViz = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const pulseVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <div ref={ref} className="relative flex items-center justify-center w-64 h-64">
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#101310] via-[#548cac] to-[#4f4f2c] opacity-20 blur-lg"
      />
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="relative z-0 min-h-[200px] min-w-[200px] rounded-full border bg-gradient-to-b from-white to-[#548cac]/10 shadow-xl shadow-[#548cac]/20"
      >
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="absolute inset-0 rounded-full bg-gradient-to-t from-[#101310] via-[#548cac] to-[#4f4f2c] opacity-30 shadow-[inset_0_0_16px_4px_rgba(16,19,16,0.8)]"
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#101310]/40 shadow-xs shadow-white/40">
            <div className="size-full bg-[#101310]/30" />
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="absolute inset-0 rounded-full bg-gradient-to-t from-[#101310] via-[#548cac] to-[#4f4f2c] opacity-50 shadow-[inset_0_0_16px_4px_rgba(16,19,16,1)]"
            />
            <div className="absolute inset-[6px] rounded-full bg-white/5 p-1 backdrop-blur-[1px]">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-[#548cac]/30 shadow-lg shadow-[#101310]/40">
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png"
                  alt="DHA Logo"
                  fill
                  sizes="(max-width: 200px) 100vw, 200px"
                  className="rounded-full p-4 object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ChipViz

