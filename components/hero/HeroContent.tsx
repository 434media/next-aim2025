"use client"

import React from "react"
import { motion, type MotionStyle } from "motion/react"
import { FadeDiv } from "../Fade"
import { Button } from "../Button"

interface HeroContentProps {
  isMobile: boolean
  firstParagraphStyle?: MotionStyle
  secondParagraphStyle?: MotionStyle
}

export const HeroContent = React.memo(
  ({ isMobile, firstParagraphStyle = {}, secondParagraphStyle = {} }: HeroContentProps) => {
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }

    return (
      <motion.div className="space-y-8 bg-white">
        {/* Paragraph content with improved typography */}
        <motion.div className="space-y-6">
          <FadeDiv>
            <motion.p
              className={`${
                isMobile
                  ? "text-xl sm:text-2xl text-gray-800 leading-relaxed"
                  : "text-2xl lg:text-3xl text-gray-800 leading-relaxed"
              } max-w-5xl text-balance tracking-tight font-medium`}
              {...fadeInUp}
              style={{
                textShadow: "0 1px 3px rgba(0,0,0,0.1)",
                lineHeight: isMobile ? "1.5" : "1.4",
                maxWidth: "65ch", // Optimal reading width
                ...firstParagraphStyle,
              }}
            >
              The AIM Health R&D Summit brings together top innovators from academia, industry, and military to
              accelerate the research, development, and commercialization of transformative medical technologies.
            </motion.p>
          </FadeDiv>

          <FadeDiv>
            <motion.p
              className={`${
                isMobile
                  ? "text-lg sm:text-xl text-gray-700 leading-relaxed"
                  : "text-xl lg:text-2xl xl:text-3xl text-gray-700 leading-relaxed"
              } max-w-4xl text-balance tracking-tight font-normal`}
              {...fadeInUp}
              style={{
                textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                lineHeight: isMobile ? "1.6" : "1.5",
                maxWidth: "70ch", // Slightly wider for secondary text
                ...secondParagraphStyle,
              }}
            >
              This unique convergence of thought leaders creates pathways to discovery and commercialization while
              addressing critical challenges in both military and civilian healthcare.
            </motion.p>
          </FadeDiv>

          {/* CTA Section */}
          <FadeDiv>
            <motion.div className="space-y-6 pt-4" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }}>
              <motion.p
                className={`${
                  isMobile
                    ? "text-lg sm:text-xl text-gray-800 leading-relaxed"
                    : "text-xl lg:text-2xl xl:text-3xl text-gray-800 leading-relaxed"
                } max-w-4xl text-balance tracking-tight font-semibold`}
                style={{
                  textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  lineHeight: isMobile ? "1.5" : "1.4",
                  maxWidth: "60ch",
                }}
              >
                The future of military medicine starts here, and it continues with you.
              </motion.p>

              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              >
                <Button
                  href="/contact-us"
                  className={`${
                    isMobile ? "px-6 py-3 text-base" : "px-8 py-4 text-lg lg:text-xl"
                  } bg-gradient-to-r from-[#548cac] to-[#4f4f2c] hover:from-[#4a7a96] hover:to-[#464529] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  Get Involved
                </Button>
              </motion.div>
            </motion.div>
          </FadeDiv>
        </motion.div>
      </motion.div>
    )
  },
)

HeroContent.displayName = "HeroContent"
