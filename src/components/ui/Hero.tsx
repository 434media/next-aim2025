"use client"

import { FadeContainer, FadeDiv, FadeSpan } from "../Fade"
import GameOfLife from "./HeroBackground"
import { Button } from "../Button"
import ErrorBoundary from "./ErrorBoundary"
import { RiArrowRightUpLine } from "@remixicon/react"

export function Hero() {
  return (
    <ErrorBoundary>
      <section aria-label="hero" className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 z-0" />
        <FadeContainer className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="mt-12 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101310]">
            <FadeSpan className="block text-[#548cac]">Two Days</FadeSpan>
            <FadeSpan className="block">One Mission</FadeSpan>
          </h1>
          <p className="mt-6 max-w-2xl text-center text-base sm:text-lg md:text-xl text-gray-600">
            <FadeSpan>
              The <strong className="font-semibold text-[#101310]">AIM Health R&D Summit</strong> serves as a premier
              platform uniting{" "}
              <strong className="font-semibold text-[#101310]">academia, industry, and the military</strong> to drive
              collaboration and innovation in life sciences.
            </FadeSpan>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <FadeDiv>
              <Button
                variant="primary"
                href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  Register to Attend
                  <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                </span>
              </Button>
            </FadeDiv>
            <FadeDiv>
              <Button
                variant="secondary"
                href="https://support.velocitytx.org/campaign/642575/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  Become a Sponsor
                  <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                </span>
              </Button>
            </FadeDiv>
          </div>
        </FadeContainer>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <GameOfLife />
        </div>
      </section>
    </ErrorBoundary>
  )
}

