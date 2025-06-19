"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { RiArrowLeftLine, RiDownloadLine, RiFullscreenLine, RiPlayLine, RiPauseLine } from "@remixicon/react"
import Link from "next/link"
import { ComingSoonVideo } from "../../components/ui/ComingSoonVideo"

export default function VideoPlayer() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  const title = searchParams.get("title") || "Video"
  const comingSoon = searchParams.get("comingSoon") === "true"

  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const [transcriptText, setTranscriptText] = useState<string | null>(null)

  useEffect(() => {
    // Load transcript if available
    if (url) {
      const transcriptUrl = `/transcripts/${url.split("/").pop()?.replace(".mp4", "")}.txt`

      fetch(transcriptUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Transcript not available")
          }
          return response.text()
        })
        .then((text) => {
          setTranscriptText(text)
        })
        .catch((error) => {
          console.log("No transcript available:", error)
        })
    }
  }, [url])

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause()
      } else {
        videoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoRef = (element: HTMLVideoElement) => {
    setVideoRef(element)
  }

  return (
    <main className="min-h-screen bg-black text-white mt-16 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/pre-conference-symposiums"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="mr-2 h-5 w-5" />
            <span>Back to Symposiums</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        {comingSoon ? (
          <ComingSoonVideo title={title} fullPage={true} />
        ) : url ? (
          <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl">
            <div className="relative">
              <video
                ref={handleVideoRef}
                className="w-full aspect-video"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <RiFullscreenLine className="h-5 w-5" />
                </button>
                <button
                  className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                  aria-label="Download video"
                >
                  <RiDownloadLine className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center border-t border-zinc-800">
              <button
                onClick={togglePlay}
                className="flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
              >
                {isPlaying ? (
                  <>
                    <RiPauseLine className="mr-2 h-5 w-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <RiPlayLine className="mr-2 h-5 w-5" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <div className="text-sm text-gray-400">AIM Summit 2025</div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-lg overflow-hidden p-8 text-center">
            <p className="text-xl text-gray-400">No video source available</p>
          </div>
        )}

        {transcriptText && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Transcript</h2>
            <div className="bg-zinc-900 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {transcriptText}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
