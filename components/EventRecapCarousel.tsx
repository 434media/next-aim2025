"use client"

import { useState, useEffect, forwardRef } from "react"
import { motion, AnimatePresence, wrap } from "framer-motion"
import { RiPlayFill, RiCloseLine, RiArrowRightLine, RiArrowLeftLine } from "@remixicon/react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { cn } from "../lib/utils"

const eventImages = [
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/recap+poster.png",
    title: "AIM'25 Recap",
    subtitle: "The future of military medicine starts now",
    buttonText: "Watch AIM'25 Video",
    action: "video" as const,
    videoUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Long+Form+V4.mp4"
  },
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/keynote.jpeg",
    title: "Leaders Shaping Tomorrow",
    subtitle: "Across military defense and civilian sectors",
    buttonText: "View AIM'25 Speakers",
    action: "link" as const,
    link: "/speakers"
  },
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/posters.jpg",
    title: "Poster Presenters",
    subtitle: "Bringing together military and civilian researchers",
    buttonText: "Browse AIM'25 Posters",
    action: "link" as const,
    link: "/posters"
  },
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/preaimweb-20.jpg",
    title: "Pre-Conference Symposiums",
    subtitle: "Focused sessions with deep insights into military healthcare innovation",
    buttonText: "View AIM'25 Sessions",
    action: "link" as const,
    link: "/pre-conference-symposiums"
  },
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    title: "Powered by Innovation",
    subtitle: "Our success is built on the foundation of strategic partnerships",
    buttonText: "Get Involved",
    action: "link" as const,
    link: "/contact-us"
  },
]

const SlideImage = forwardRef<HTMLImageElement, { src: string; alt: string; direction: number }>(
  function SlideImage({ src, alt, direction }, ref) {
    return (
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        initial={{ 
          opacity: 0, 
          x: direction * 50,
          scale: 1.05
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          },
        }}
        exit={{ 
          opacity: 0, 
          x: direction * -50,
          scale: 0.95,
          transition: {
            duration: 0.25,
            ease: [0.76, 0, 0.24, 1]
          }
        }}
        className="image h-full w-full absolute inset-0 object-cover object-center z-10"
        style={{
          aspectRatio: '4/5'
        }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }
)

const SlideContent = forwardRef<HTMLDivElement, {
  image: typeof eventImages[0]
  onCTAClick: (image: typeof eventImages[0]) => void
  isMobile: boolean
  isTablet: boolean
  textRevealVariants: any
  buttonVariants: any
  direction: number
}>(function SlideContent({ image, onCTAClick, isMobile, isTablet, textRevealVariants, buttonVariants, direction }, ref) {
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onCTAClick(image)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        x: direction * 30,
        y: 15
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          delay: 0.15,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        },
      }}
      exit={{ 
        opacity: 0, 
        x: direction * -30,
        y: -15,
        transition: {
          duration: 0.2,
          ease: [0.76, 0, 0.24, 1]
        }
      }}
      className="z-30 absolute bottom-0 left-0 right-0 flex flex-col justify-end items-center px-4 sm:px-6 lg:px-8 text-center pb-8 sm:pb-12 lg:pb-16"
    >
      <motion.div
        className={`relative ${isMobile ? "mb-4" : "mb-6"} overflow-hidden max-w-sm mx-auto`}
        variants={textRevealVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm rounded-xl" />

        <div className="relative px-4 py-3 sm:px-6 sm:py-4">
          <motion.h2
            className={`leading-tight tracking-tight text-white ${
              isMobile
                ? "text-2xl font-black mb-1"
                : isTablet
                  ? "text-3xl font-bold mb-2"
                  : "text-4xl font-bold mb-2"
            }`}
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {image.title}
            </motion.span>
          </motion.h2>
          
          <motion.p
            className={`text-sky-100 leading-snug tracking-tighter ${
              isMobile
                ? "text-sm font-medium"
                : isTablet
                  ? "text-base font-medium"
                  : "text-lg font-medium"
            }`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {image.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="relative"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        {image.action === "link" && image.link ? (
          <motion.button
            onClick={handleButtonClick}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className={`relative transition-all duration-300 shadow-xl bg-white hover:bg-gray-50 text-black border border-white hover:border-gray-100 cursor-pointer select-none ${
              isMobile
                ? "text-sm font-bold py-3 px-6 rounded-lg"
                : isTablet
                  ? "text-base font-semibold py-3 px-6 rounded-lg"
                  : "text-lg font-semibold py-4 px-8 rounded-lg"
            }`}
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              pointerEvents: "auto",
              zIndex: 100
            }}
          >
            <span className="flex items-center justify-center relative z-10 pointer-events-none">
              {image.buttonText}
              <RiArrowRightLine className={`${isMobile ? "ml-2 size-4" : "ml-2 size-5"}`} />
            </span>
          </motion.button>
        ) : (
          <motion.button
            onClick={handleButtonClick}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className={`relative transition-all duration-300 shadow-xl bg-white hover:bg-gray-50 text-black border border-white hover:border-gray-100 cursor-pointer select-none ${
              isMobile
                ? "text-sm font-bold py-3 px-6 rounded-lg"
                : isTablet
                  ? "text-base font-semibold py-3 px-6 rounded-lg"
                  : "text-lg font-semibold py-4 px-8 rounded-lg"
            }`}
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              pointerEvents: "auto",
              zIndex: 100
            }}
          >
            <span className="flex items-center justify-center relative z-10 pointer-events-none">
              {image.buttonText}
              <RiPlayFill className={`${isMobile ? "ml-2 size-4" : "ml-2 size-5"}`} />
            </span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
})

export function EventRecapCarousel() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [loading, setLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const [, setImageErrors] = useState<string[]>([])
  const [videoError, setVideoError] = useState<string | null>(null)

  const images = eventImages.map(event => event.url)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    if (!images || images.length === 0) {
      setLoading(false)
      return
    }

    setLoading(true)
    setImageErrors([])
    
    try {
      const loadPromises = images.map((imageSrc, index) => {
        return new Promise<{ src: string; index: number; success: boolean }>((resolve) => {
          const img = new Image()
          
          const timeout = setTimeout(() => {
            resolve({ src: imageSrc, index, success: false })
          }, 10000)
          
          img.onload = () => {
            clearTimeout(timeout)
            resolve({ src: imageSrc, index, success: true })
          }
          
          img.onerror = () => {
            clearTimeout(timeout)
            setImageErrors(prev => [...prev, imageSrc])
            resolve({ src: imageSrc, index, success: false })
          }
          
          img.src = imageSrc
        })
      })

      const results = await Promise.all(loadPromises)
      const successfulImages = results
        .filter(result => result.success)
        .map(result => result.src)
      
      setLoadedImages(successfulImages)
      
    } catch (error) {
      setLoadedImages([])
    } finally {
      setLoading(false)
    }
  }

  function setSlide(newDirection: 1 | -1) {
    const nextIndex = wrap(0, eventImages.length, currentImageIndex + newDirection)
    setCurrentImageIndex(nextIndex)
    setDirection(newDirection)
  }

  const handleCTAClick = (image: typeof eventImages[0]) => {
    if (image.action === "video") {
      setVideoError(null)
      setCurrentVideoUrl(image.videoUrl || "")
      setIsVideoModalOpen(true)
    } else if (image.action === "link" && image.link) {
      if (image.link.startsWith('/')) {
        window.location.href = image.link
      } else {
        window.open(image.link, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setCurrentVideoUrl("")
    setVideoError(null)
  }

  const handleSlideChange = (index: number) => {
    if (index !== currentImageIndex) {
      setDirection(index > currentImageIndex ? 1 : -1)
      setCurrentImageIndex(index)
    }
  }

  const handleVideoError = (error: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = error.currentTarget
    const errorMessage = `Video failed to load: ${videoElement.error?.message || 'Unknown error'}`
    setVideoError(errorMessage)
  }

  const currentImage = eventImages[currentImageIndex]
  const areImagesLoaded = loadedImages.length > 0
  const safeCurrentIndex = Math.max(0, Math.min(currentImageIndex, loadedImages.length - 1))

  const textRevealVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden isolate bg-black flex items-center justify-center" style={{ aspectRatio: isMobile ? '4/5' : '16/9', minHeight: isMobile ? '100vh' : '100vh' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-white font-medium">Loading carousel images...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a moment for external images</p>
        </div>
      </section>
    )
  }

  if (!areImagesLoaded) {
    return (
      <section className="relative w-full overflow-hidden isolate bg-white">
        <div className="mx-auto max-w-7xl relative">
          <motion.button
            initial={false}
            animate={{ 
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)"
            }}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center text-gray-900 shadow-lg border border-white/20 hover:bg-white transition-colors duration-200"
            onClick={() => setSlide(-1)}
            whileFocus={{ outline: "2px solid rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <RiArrowLeftLine className="w-6 h-6" />
          </motion.button>

          <motion.button
            initial={false}
            animate={{ 
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)"
            }}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center text-gray-900 shadow-lg border border-white/20 hover:bg-white transition-colors duration-200"
            onClick={() => setSlide(1)}
            whileFocus={{ outline: "2px solid rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <RiArrowRightLine className="w-6 h-6" />
          </motion.button>

          <div className="overflow-hidden w-full relative flex items-center justify-center isolate bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" style={{ aspectRatio: isMobile ? '4/5' : '16/9', minHeight: isMobile ? '100vh' : '100vh' }}>
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 z-10 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-indigo-500/30"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <SlideContent
                key={currentImageIndex}
                image={currentImage}
                onCTAClick={handleCTAClick}
                isMobile={isMobile}
                isTablet={isTablet}
                textRevealVariants={textRevealVariants}
                buttonVariants={buttonVariants}
                direction={direction}
              />
            </AnimatePresence>

            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {eventImages.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                    index === currentImageIndex 
                      ? 'bg-white border-white shadow-lg' 
                      : 'bg-white/30 border-white/50 hover:bg-white/60 hover:border-white/80'
                  }`}
                  onClick={() => handleSlideChange(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="sr-only">
          <p>Event recap slideshow showcasing highlights from AIM 2025</p>
          <p>{currentImage.title} - {currentImage.subtitle}</p>
          <p>Slide {currentImageIndex + 1} of {eventImages.length}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative w-full overflow-hidden isolate bg-white">
        <div className="mx-auto max-w-7xl relative">
          <motion.button
            initial={false}
            animate={{ 
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)"
            }}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center text-gray-900 shadow-lg border border-white/20 hover:bg-white transition-colors duration-200"
            onClick={() => setSlide(-1)}
            whileFocus={{ outline: "2px solid rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <RiArrowLeftLine className="w-6 h-6" />
          </motion.button>

          <motion.button
            initial={false}
            animate={{ 
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)"
            }}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center text-gray-900 shadow-lg border border-white/20 hover:bg-white transition-colors duration-200"
            onClick={() => setSlide(1)}
            whileFocus={{ outline: "2px solid rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <RiArrowRightLine className="w-6 h-6" />
          </motion.button>

          <div className={cn("overflow-hidden w-full relative flex items-center justify-center isolate bg-black")} style={{ aspectRatio: isMobile ? '4/5' : '16/9', minHeight: isMobile ? '100vh' : '100vh' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <SlideImage
                key={safeCurrentIndex}
                src={loadedImages[safeCurrentIndex]}
                alt={`Slide ${safeCurrentIndex + 1}`}
                direction={direction}
              />
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <SlideContent
                key={currentImageIndex}
                image={currentImage}
                onCTAClick={handleCTAClick}
                isMobile={isMobile}
                isTablet={isTablet}
                textRevealVariants={textRevealVariants}
                buttonVariants={buttonVariants}
                direction={direction}
              />
            </AnimatePresence>

            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {eventImages.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                    index === currentImageIndex 
                      ? 'bg-white border-white shadow-lg' 
                      : 'bg-white/30 border-white/50 hover:bg-white/60 hover:border-white/80'
                  }`}
                  onClick={() => handleSlideChange(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="sr-only">
          <p>Event recap slideshow showcasing highlights from AIM 2025</p>
          <p>{currentImage.title} - {currentImage.subtitle}</p>
          <p>Slide {currentImageIndex + 1} of {eventImages.length}</p>
        </div>
      </section>

      <AnimatePresence>
        {isVideoModalOpen && currentVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4
              }}
              className={`relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 ${
                isMobile ? 'max-w-sm' : 'max-w-6xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Close video modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RiCloseLine className="size-5" />
              </motion.button>

              <div 
                className="relative w-full bg-black rounded-3xl overflow-hidden" 
                style={{ 
                  paddingBottom: isMobile ? "125%" : "56.25%" // 4:5 for mobile, 16:9 for desktop
                }}
              >
                {videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-white p-6 text-center">
                    <div>
                      <div className="text-red-400 mb-4">
                        <RiPlayFill className="size-12 mx-auto mb-3 opacity-50" />
                      </div>
                      <h3 className={`font-semibold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>Video Unavailable</h3>
                      <p className={`text-gray-300 mb-4 ${isMobile ? 'text-sm' : 'text-base'}`}>{videoError}</p>
                      <a 
                        href={currentVideoUrl} 
                        className={`inline-flex items-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200 ${
                          isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2 text-base'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try Direct Link
                        <RiArrowRightLine className="ml-2 size-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full rounded-3xl object-cover"
                    controls
                    autoPlay
                    preload="metadata"
                    onError={handleVideoError}
                  >
                    <source src={currentVideoUrl} type="video/mp4" />
                    <p className="text-white p-4">
                      Your browser doesn't support HTML5 video. 
                      <a href={currentVideoUrl} className="text-blue-400 hover:text-blue-300 underline ml-1">
                        Download the video instead
                      </a>
                    </p>
                  </video>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
