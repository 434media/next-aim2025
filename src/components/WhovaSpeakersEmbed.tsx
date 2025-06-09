"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Script from "next/script"

interface WhovaSpeakersEmbedProps {
  className?: string
}

export default function WhovaSpeakersEmbed({ className = "" }: WhovaSpeakersEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [speakerCount, setSpeakerCount] = useState(0)

  // Simulate loading progress and speaker count
  useEffect(() => {
    if (shouldLoad && !isLoaded && !hasError) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + Math.random() * 12
          if (newProgress >= 90) {
            clearInterval(interval)
            return 90
          }
          return newProgress
        })

        setSpeakerCount((prev) => {
          if (prev < 50) return prev + Math.floor(Math.random() * 3) + 1
          return 50
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [shouldLoad, isLoaded, hasError])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Add a small delay for better UX
          setTimeout(() => setShouldLoad(true), 200)
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    )

    observerRef.current.observe(containerRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const handleScriptLoad = useCallback(() => {
    setIsLoaded(true)
    setLoadingProgress(100)
    setSpeakerCount(50)

    setTimeout(() => {
      if (containerRef.current) {
        const loadingElement = containerRef.current.querySelector("#whova-loading") as HTMLElement
        if (loadingElement) {
          loadingElement.style.display = "none"
        }

        containerRef.current.classList.add("whova-speakers-loaded")
      }
    }, 600)
  }, [])

  const handleScriptError = useCallback(() => {
    setHasError(true)
    setLoadingProgress(0)

    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="flex h-96 items-center justify-center flex-col bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200 shadow-lg">
          <div class="text-center p-8 max-w-md">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-red-800 mb-3">Speaker Profiles Unavailable</h3>
            <p class="text-red-600 mb-6 leading-relaxed">We're having trouble loading the speaker directory. Please try again or check back shortly.</p>
            <div class="space-y-3">
              <button onclick="window.location.reload()" class="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Reload Speakers
              </button>
              <p class="text-sm text-red-500">Or visit our keynotes page for featured speakers</p>
            </div>
          </div>
        </div>
      `
    }
  }, [])

  return (
    <div ref={containerRef} className={`min-h-[600px] w-full relative ${className}`}>
      {/* Enhanced Lazy Loading State */}
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-[#548cac]/20 to-[#548cac]/40 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-[#548cac] animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full border-4 border-[#548cac]/30 animate-ping"></div>
            </div>
            <p className="text-xl text-white/80 mb-2">Preparing Speaker Directory</p>
            <p className="text-sm text-white/60">Loading when you scroll into view</p>
          </div>
        </div>
      )}

      {/* Enhanced Loading State with Speaker Counter */}
      {shouldLoad && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="h-24 w-24 mx-auto">
                <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-white/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - loadingProgress / 100)}`}
                    className="text-[#548cac] transition-all duration-500 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white">{Math.round(loadingProgress)}%</span>
                  <span className="text-xs text-white/60">{speakerCount} speakers</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-white/90 font-semibold">Loading Speaker Profiles</p>
              <p className="text-sm text-white/70">Connecting industry leaders...</p>

              {/* Loading Steps with Icons */}
              <div className="space-y-3 text-left">
                <div
                  className={`flex items-center text-sm transition-all duration-300 ${loadingProgress > 25 ? "text-[#548cac]" : "text-white/50"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${loadingProgress > 25 ? "bg-[#548cac]/20" : "bg-white/10"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  Fetching speaker database
                </div>
                <div
                  className={`flex items-center text-sm transition-all duration-300 ${loadingProgress > 60 ? "text-[#548cac]" : "text-white/50"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${loadingProgress > 60 ? "bg-[#548cac]/20" : "bg-white/10"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                  </div>
                  Loading profiles & bios
                </div>
                <div
                  className={`flex items-center text-sm transition-all duration-300 ${loadingProgress > 85 ? "text-[#548cac]" : "text-white/50"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${loadingProgress > 85 ? "bg-[#548cac]/20" : "bg-white/10"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  Optimizing interface
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Whova Widget Container */}
      {shouldLoad && (
        <>
          <div
            title="Whova event and conference app"
            id="whova-speakerwidget"
            className={`transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <p id="whova-loading" className="sr-only">
              Loading speakers...
            </p>
          </div>

          <Script
            src="https://whova.com/static/frontend/xems/js/whova-speaker-widget.js?eid=FIkfYyhB%40Bc-qmvt9iZNmxXZDlz6RPuiSVJPLRTwsIA%3D&host=https://whova.com"
            id="embeded-speaker-script"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
            onError={handleScriptError}
          />
        </>
      )}

      {/* Enhanced Whova Branding */}
      {isLoaded && (
        <div className="whova-wrap-class mt-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-3 text-sm text-white/60 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#548cac] rounded-full animate-pulse"></div>
              <span>Powered by</span>
            </div>
            <a
              className="font-semibold text-[#548cac] hover:text-[#3a6b8a] transition-colors duration-300"
              target="_blank"
              href="https://whova.com"
              rel="noopener noreferrer"
            >
              Whova
            </a>
          </div>
          <div className="mt-3">
            <a
              className="text-xs text-white/40 hover:text-[#548cac] transition-colors duration-300"
              target="_blank"
              href="https://whova.com/abstract-management/"
              rel="noopener noreferrer"
            >
              Speaker Management Platform
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .whova-speakers-loaded {
          animation: slideInUp 0.7s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
