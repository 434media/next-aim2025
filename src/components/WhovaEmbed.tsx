"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function WhovaEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cleanup function to remove any scripts or elements added by Whova
    return () => {
      if (containerRef.current) {
        // Clear the container contents when component unmounts
        containerRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-[600px] w-full">
      <div title="Whova event and conference app" id="whova-agendawidget">
        <p id="whova-loading">Loading agenda...</p>
      </div>

      <Script
        src="https://whova.com/static/frontend/xems/js/embed/embedagenda.js?eid=bf9hnl5b886PtN2KMLjwZkKh3NiAC2SWI68mkdXJSlw%3D&host=https://whova.com"
        id="embeded-agenda-script"
        strategy="afterInteractive"
        onError={() => {
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="flex h-96 items-center justify-center flex-col">
                <p class="text-lg text-red-500 mb-4">Failed to load the agenda.</p>
                <p class="text-gray-600">Please try refreshing the page or check back later.</p>
              </div>
            `
          }
        }}
      />

      <div id="whova-wrap" className="whova-wrap-class mt-4 text-center text-sm text-gray-500">
        Powered By
        <a
          className="brandlink ml-1 font-semibold text-[#548cac]"
          target="_blank"
          href="https://whova.com"
          rel="noopener noreferrer"
        >
          Whova
        </a>
        <br />
        <a
          className="whova-emslink brandanchorlink text-xs text-gray-400 hover:text-[#548cac]"
          target="_blank"
          href="https://whova.com/whova-event-app/"
          rel="noopener noreferrer"
        >
          Mobile App for Events
        </a>
      </div>
    </div>
  )
}

