"use client"

import { useEffect, useState } from "react"
import AIM2026Popup from "../components/AIM2026Popup"
import { EventRecapCarousel } from "../components/EventRecapCarousel"
import { HeroTextSection } from "../components/ui/HeroTextSection"
import { HeroVideo } from "../components/ui/HeroVideo"
import { PartnerMarquee } from "../components/ui/PartnerMarquee"
import { additionalPartners, mainPartners } from "../data/partners"

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("aim2026-popup-shown")

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    sessionStorage.setItem("aim2026-popup-shown", "true")
  }

  return (
    <main className="relative mx-auto flex flex-col scroll-smooth" id="main-content">
      <AIM2026Popup showModal={showPopup} onClose={handleClosePopup} />

      {/* Full Screen Hero Video Section */}
      <section aria-labelledby="hero-video-heading" className="w-full">
        <h1 id="hero-video-heading" className="sr-only">
          AIM Summit - Hero Video
        </h1>
        <HeroVideo />
      </section>

      {/* Hero Text Section - Centered */}
      <section aria-labelledby="hero-text-heading" className="w-full">
        <h2 id="hero-text-heading" className="sr-only">
          AIM Summit - Advancing Innovation in Military Medicine
        </h2>
        <HeroTextSection />
      </section>

      {/* Partners Section */}
      <section aria-labelledby="partners-heading" className="w-full bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <h2 id="partners-heading" className="sr-only">
            Our Partners
          </h2>

          <div className="space-y-8">
            <PartnerMarquee partners={mainPartners} ariaLabel="Main partners and sponsors" showHeader={true} />
            <PartnerMarquee
              partners={additionalPartners}
              reverse
              speed={50}
              ariaLabel="Additional partners and sponsors"
            />
          </div>
        </div>
      </section>

      {/* Event Recap Carousel */}
      <section aria-labelledby="recap-heading" className="w-full pb-16">
        <h2 id="recap-heading" className="sr-only">
          AIM 2025 Event Recap
        </h2>
        <EventRecapCarousel />
      </section>
    </main>
  )
}
