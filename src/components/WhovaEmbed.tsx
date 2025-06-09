"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Script from "next/script"

interface WhovaEmbedProps {
  className?: string
}

export default function WhovaEmbed({ className = "" }: WhovaEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [shouldLoad, setShouldLoad] = useState(false)

  // Simulate loading progress for better UX
  useEffect(() => {
    if (shouldLoad && !isLoaded && !hasError) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 200)

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
          setTimeout(() => setShouldLoad(true), 300)
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
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

    // Enhanced loading completion
    setTimeout(() => {
      if (containerRef.current) {
        const loadingElement = containerRef.current.querySelector("#whova-loading") as HTMLElement
        if (loadingElement) {
          loadingElement.style.display = "none"
        }

        // Add loaded class for animations
        containerRef.current.classList.add("whova-loaded")
      }
    }, 500)
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-red-800 mb-3">Schedule Temporarily Unavailable</h3>
            <p class="text-red-600 mb-6 leading-relaxed">We're experiencing technical difficulties loading the interactive schedule. Our team is working to resolve this quickly.</p>
            <div class="space-y-3">
              <button onclick="window.location.reload()" class="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Retry Loading
              </button>
              <p class="text-sm text-red-500">Or download the Whova app for offline access</p>
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
                <div className="h-8 w-8 rounded-full bg-[#548cac] animate-pulse"></div>
              </div>
              <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full border-4 border-[#548cac]/30 animate-ping"></div>
            </div>
            <p className="text-xl text-white/80 mb-2">Preparing Interactive Schedule</p>
            <p className="text-sm text-white/60">Loading when you're ready to explore</p>
          </div>
        </div>
      )}

      {/* Enhanced Loading State with Progress */}
      {shouldLoad && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="h-20 w-20 mx-auto">
                <svg className="h-20 w-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-white/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - loadingProgress / 100)}`}
                    className="text-[#548cac] transition-all duration-300 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{Math.round(loadingProgress)}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-white/90 font-semibold">Loading Interactive Schedule</p>
              <p className="text-sm text-white/70">Connecting to Whova platform...</p>

              {/* Loading Steps */}
              <div className="space-y-2 text-left">
                <div
                  className={`flex items-center text-sm ${loadingProgress > 20 ? "text-[#548cac]" : "text-white/50"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${loadingProgress > 20 ? "bg-[#548cac]" : "bg-white/30"}`}
                  ></div>
                  Establishing connection
                </div>
                <div
                  className={`flex items-center text-sm ${loadingProgress > 50 ? "text-[#548cac]" : "text-white/50"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${loadingProgress > 50 ? "bg-[#548cac]" : "bg-white/30"}`}
                  ></div>
                  Loading session data
                </div>
                <div
                  className={`flex items-center text-sm ${loadingProgress > 80 ? "text-[#548cac]" : "text-white/50"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${loadingProgress > 80 ? "bg-[#548cac]" : "bg-white/30"}`}
                  ></div>
                  Preparing interface
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
            id="whova-agendawidget"
            className={`transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <p id="whova-loading" className="sr-only">
              Loading agenda...
            </p>
          </div>

          <Script
            src="https://whova.com/static/frontend/xems/js/embed/embedagenda.js?eid=bf9hnl5b886PtN2KMLjwZkKh3NiAC2SWI68mkdXJSlw%3D&host=https://whova.com"
            id="embeded-agenda-script"
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
              href="https://whova.com/whova-event-app/"
              rel="noopener noreferrer"
            >
              Interactive Event Platform
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .whova-loaded {
          animation: slideInUp 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
