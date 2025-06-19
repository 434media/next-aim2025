"use client"

import React from "react"
import { motion, type MotionStyle } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "../Button"
import { FadeDiv } from "../Fade"

interface HeroContentProps {
  isMobile: boolean
  firstParagraphStyle?: MotionStyle
  secondParagraphStyle?: MotionStyle
  buttonsStyle?: MotionStyle
}

export const HeroContent = React.memo(
  ({ isMobile, firstParagraphStyle = {}, secondParagraphStyle = {}, buttonsStyle = {} }: HeroContentProps) => {
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }

    return (
      <motion.div className="space-y-6 md:space-y-8">
        {/* Paragraph content with selective blur effects */}
        <motion.div>
          <FadeDiv>
            <motion.p
              className={`${
                isMobile
                  ? "text-lg sm:text-xl text-white/95 leading-relaxed"
                  : "text-xl sm:text-2xl md:text-3xl text-white/95 leading-relaxed mt-48"
              } max-w-4xl text-balance tracking-tight font-medium`}
              {...fadeInUp}
              style={{
                textShadow: "0 3px 15px rgba(0,0,0,0.8)",
                lineHeight: "1.4",
                ...firstParagraphStyle,
              }}
            >
              The AIM Health R&D Summit brings together top innovators from academia, industry, and the military to
              accelerate the research, development, and commercialization of transformative medical technologies.
            </motion.p>
          </FadeDiv>

          <FadeDiv>
            <motion.p
              className={`${
                isMobile
                  ? "text-base sm:text-lg text-white/90 leading-relaxed mt-6"
                  : "text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mt-8"
              } max-w-4xl text-balance tracking-tight`}
              {...fadeInUp}
              style={{
                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                lineHeight: "1.5",
                ...secondParagraphStyle,
              }}
            >
              This unique convergence of thought leaders creates pathways to discovery and commercialization while
              addressing critical challenges in both military and civilian healthcare.
            </motion.p>
          </FadeDiv>
        </motion.div>

        {/* Buttons with separate blur control - positioned to never scroll past sticky title */}
        <motion.div
          className={`${isMobile ? "flex flex-col gap-4 w-full max-w-md pt-8" : "flex flex-col sm:flex-row gap-4 sm:gap-6 pt-16"}`}
          {...fadeInUp}
          style={buttonsStyle}
        >
          <FadeDiv>
            <Button
              variant="primary"
              href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
              className={`${
                isMobile
                  ? "text-base py-4 px-8 w-full"
                  : "text-base sm:text-lg py-4 px-8 md:py-5 md:px-10 w-full sm:w-auto"
              } hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#548cac] shadow-xl hover:shadow-2xl font-semibold`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register Now for AIM Summit (opens in new tab)"
            >
              <span className="flex items-center justify-center">
                Register Now
                <motion.span
                  className={`ml-2 ${isMobile ? "size-5" : "size-5 md:size-6"}`}
                  whileHover={{ x: 2, y: -2 }}
                  aria-hidden="true"
                >
                  <RiArrowRightUpLine />
                </motion.span>
              </span>
            </Button>
          </FadeDiv>

          <FadeDiv>
            <Button
              variant="secondary"
              href="https://support.velocitytx.org/campaign/642575/donate"
              className={`${
                isMobile
                  ? "text-base py-4 px-8 w-full"
                  : "text-base sm:text-lg py-4 px-8 md:py-5 md:px-10 w-full sm:w-auto"
              } hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f4f2c] shadow-xl hover:shadow-2xl font-semibold`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Become a Sponsor for AIM Summit (opens in new tab)"
            >
              <span className="flex items-center justify-center">
                Become a Sponsor
                <motion.span
                  className={`ml-2 ${isMobile ? "size-5" : "size-5 md:size-6"}`}
                  whileHover={{ x: 2, y: -2 }}
                  aria-hidden="true"
                >
                  <RiArrowRightUpLine />
                </motion.span>
              </span>
            </Button>
          </FadeDiv>
        </motion.div>
      </motion.div>
    )
  },
)

HeroContent.displayName = "HeroContent"
