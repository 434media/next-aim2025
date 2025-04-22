"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import {
  RiPlayLine,
  RiPauseLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiFullscreenLine,
  RiDownloadLine,
  RiArrowLeftLine,
  RiCloseLine,
  RiSearchLine,
  RiSpeedLine,
  RiToggleFill,
} from "@remixicon/react"
import Link from "next/link"

export default function VideoPlayer() {
  const searchParams = useSearchParams()
  const videoUrl = searchParams.get("url") || ""
  const videoTitle = searchParams.get("title") || "Video"
  const transcriptUrl = searchParams.get("transcript") || ""

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [playbackRate, setPlaybackRate] = useState(1)
  // Add a fallback mechanism for when the transcript can't be loaded
  const [transcriptError, setTranscriptError] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Load transcript if available
  // Update the transcript loading logic with better error handling
  useEffect(() => {
    if (transcriptUrl && transcriptUrl !== "") {
      // Reset error state when attempting to load a new transcript
      setTranscriptError(false)

      // For external URLs, use fetch with proper error handling
      fetch(transcriptUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.text()
        })
        .then((text) => {
          setTranscript(text)
        })
        .catch((error) => {
          console.error("Error loading transcript:", error)
          setTranscriptError(true)

          // Fall back to a sample transcript
          fetch("/transcripts/sample-transcript.txt")
            .then((response) => response.text())
            .then((text) => {
              setTranscript(
                text + "\n\n[Note: This is a sample transcript. The actual transcript could not be loaded.]",
              )
            })
            .catch((fallbackError) => {
              console.error("Error loading fallback transcript:", fallbackError)
              setTranscript("Transcript could not be loaded. Please try downloading it directly.")
            })
        })
    }
  }, [transcriptUrl])

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
      setIsLoading(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    if (!videoRef.current) return

    videoRef.current.volume = newVolume
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
      videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      videoRef.current.muted = false
    }
  }

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return

    const progressRect = progressRef.current.getBoundingClientRect()
    const seekPosition = (e.clientX - progressRect.left) / progressRect.width
    const seekTime = seekPosition * duration

    videoRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
  }

  // Highlight search terms in transcript
  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="min-h-screen bg-black pt-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/pre-conference-symposiums"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="mr-2" />
            Back to Symposiums
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-light text-white mb-6">{videoTitle}</h1>

        {/* Video player container */}
        <div ref={videoContainerRef} className="relative bg-black rounded-lg overflow-hidden shadow-xl mb-8">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#548cac]"></div>
            </div>
          )}

          {/* Video element */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full aspect-video"
            poster="/abstract-thumbnail.png"
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
          >
            {transcriptUrl && <track kind="subtitles" src={transcriptUrl} label="English" srcLang="en" />}
            Your browser does not support the video tag.
          </video>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress bar */}
            <div
              ref={progressRef}
              className="w-full h-2 bg-gray-700 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-[#548cac] rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause button */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-full p-1"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <RiPauseLine className="w-6 h-6" /> : <RiPlayLine className="w-6 h-6" />}
                </button>

                {/* Volume control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-full p-1"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <RiVolumeMuteLine className="w-6 h-6" /> : <RiVolumeUpLine className="w-6 h-6" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-[#548cac]"
                    aria-label="Volume"
                  />
                </div>

                {/* Time display */}
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Playback speed */}
                <div className="relative group">
                  <button
                    className="text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-full p-1 flex items-center"
                    aria-label="Playback speed"
                  >
                    <RiSpeedLine className="w-5 h-5 mr-1" />
                    <span className="text-xs">{playbackRate}x</span>
                  </button>
                  <div className="absolute bottom-full mb-2 right-0 bg-zinc-800 rounded-md p-2 hidden group-hover:block">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`block w-full text-left px-3 py-1 text-sm rounded ${
                          playbackRate === rate ? "bg-[#548cac] text-white" : "text-white hover:bg-zinc-700"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transcript toggle */}
                {transcriptUrl && (
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className={`text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-full p-1 ${
                      showTranscript ? "text-[#548cac]" : ""
                    }`}
                    aria-label={showTranscript ? "Hide transcript" : "Show transcript"}
                    aria-pressed={showTranscript}
                  >
                    <RiToggleFill className="w-6 h-6" />
                  </button>
                )}

                {/* Download button */}
                <a
                  href={videoUrl}
                  download
                  className="text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-full p-1"
                  aria-label="Download video"
                >
                  <RiDownloadLine className="w-6 h-6" />
                </a>

                {/* Fullscreen button */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-full p-1"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <RiFullscreenLine className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript section */}
        {showTranscript && (
          <div className="bg-zinc-900 rounded-lg p-6 mb-8 max-h-[500px] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-light text-white">Transcript</h2>
              <div className="flex items-center space-x-4">
                {/* Search input */}
                <div className="relative">
                  <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search in transcript..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-zinc-800 text-white rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                  />
                </div>
                <button
                  onClick={() => setShowTranscript(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close transcript"
                >
                  <RiCloseLine className="w-6 h-6" />
                </button>
              </div>
            </div>

            {transcriptError && (
              <div className="bg-red-900/20 border border-red-900/30 rounded-md p-4 mb-4">
                <p className="text-red-400 text-sm">
                  The original transcript could not be loaded. A sample transcript is shown below.
                </p>
              </div>
            )}

            <div className="text-gray-300 whitespace-pre-wrap">
              {searchTerm ? highlightSearchTerm(transcript) : transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
