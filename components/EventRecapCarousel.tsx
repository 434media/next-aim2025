"use client"

import { useState, useEffect, forwardRef } from "react"
import { motion, AnimatePresence, wrap } from "motion/react"
import { RiPlayFill, RiCloseLine, RiArrowRightLine, RiArrowLeftLine } from "@remixicon/react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { cn } from "../lib/utils"

const eventImages = [
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/keynote.jpeg",
    title: "AIM'25 Recap",
    subtitle: "The future of military medicine starts now",
    buttonText: "Watch AIM'25 Video",
    action: "video" as const,
    videoUrl: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Long+Form+V4.mp4"
  },
  {
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/mtec-speaker.jpg",
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
    url: "https://ampd-asset.s3.us-east-2.amazonaws.com/preaimweb-23.jpg",
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
        onError={(e) => {
          console.error('❌ Image failed to render:', src)
          e.currentTarget.style.display = 'none'
        }}
        onLoad={() => {
          console.log('✅ Image rendered successfully:', src)
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
      {/* Smaller Text Overlay with compact background */}
      <motion.div
        className={`relative ${isMobile ? "mb-4" : "mb-6"} overflow-hidden`}
        variants={textRevealVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Compact background for accessibility */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl" />

        <div className="relative px-4 py-3 sm:px-6 sm:py-4">
          <motion.h2
            className={`leading-tight font-bold tracking-tight text-white ${
              isMobile
                ? "text-xl sm:text-2xl"
                : isTablet
                  ? "text-2xl lg:text-3xl"
                  : "text-3xl xl:text-4xl"
            }`}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            <motion.span 
              className="block text-white font-bold mb-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {image.title}
            </motion.span>
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <span className="text-sky-200 font-semibold text-sm sm:text-base lg:text-lg">{image.subtitle}</span>
            </motion.span>
          </motion.h2>
        </div>
      </motion.div>

      {/* Smaller CTA Button */}
      <motion.div
        className="relative overflow-hidden"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        {image.action === "link" && image.link ? (
          <motion.button
            onClick={() => onCTAClick(image)}
            className={`relative transition-all duration-300 shadow-xl bg-white hover:bg-gray-50 text-black font-semibold border border-white hover:border-gray-100 ${
              isMobile
                ? "text-sm py-2 px-4 rounded-lg"
                : isTablet
                  ? "text-base py-2.5 px-5 rounded-lg"
                  : "text-base py-3 px-6 rounded-lg"
            }`}
            style={{
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <span className="flex items-center justify-center relative z-10">
              {image.buttonText}
              <RiArrowRightLine className={`${isMobile ? "ml-1.5 size-3.5" : "ml-2 size-4"}`} />
            </span>
          </motion.button>
        ) : (
          <motion.button
            onClick={() => onCTAClick(image)}
            className={`relative transition-all duration-300 shadow-xl bg-white hover:bg-gray-50 text-black font-semibold border border-white hover:border-gray-100 ${
              isMobile
                ? "text-sm py-2 px-4 rounded-lg"
                : isTablet
                  ? "text-base py-2.5 px-5 rounded-lg"
                  : "text-base py-3 px-6 rounded-lg"
            }`}
            style={{
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <span className="flex items-center justify-center relative z-10">
              {image.buttonText}
              <RiPlayFill className={`${isMobile ? "ml-1.5 size-3.5" : "ml-2 size-4"}`} />
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
  const [imageErrors, setImageErrors] = useState<string[]>([])

  const images = eventImages.map(event => event.url)

  // Load images on component mount
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
    console.log('🔄 Starting to load images:', images)
    
    try {
      const loadPromises = images.map((imageSrc, index) => {
        return new Promise<{ src: string; index: number; success: boolean }>((resolve) => {
          const img = new Image()
          
          // Set up timeout for slow loading images
          const timeout = setTimeout(() => {
            console.warn(`⏰ Image ${index + 1} timed out after 10 seconds:`, imageSrc)
            resolve({ src: imageSrc, index, success: false })
          }, 10000)
          
          img.onload = () => {
            clearTimeout(timeout)
            console.log(`✅ Successfully loaded image ${index + 1}:`, imageSrc)
            resolve({ src: imageSrc, index, success: true })
          }
          
          img.onerror = (error) => {
            clearTimeout(timeout)
            console.warn(`❌ Failed to load image ${index + 1}:`, imageSrc, error)
            setImageErrors(prev => [...prev, imageSrc])
            resolve({ src: imageSrc, index, success: false })
          }
          
          // Don't set crossOrigin to avoid CORS issues with S3
          img.src = imageSrc
        })
      })

      const results = await Promise.all(loadPromises)
      const successfulImages = results
        .filter(result => result.success)
        .map(result => result.src)
      
      console.log(`📊 Image loading complete: ${successfulImages.length}/${images.length} successful`)
      console.log('✅ Successfully loaded images:', successfulImages)
      console.log('❌ Failed images:', results.filter(r => !r.success).map(r => r.src))
      
      setLoadedImages(successfulImages)
      
      if (successfulImages.length === 0) {
        console.error('❌ No images could be loaded successfully')
        // Don't throw error, just set empty array
      }
      
    } catch (error) {
      console.error("❌ Critical error during image loading:", error)
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
      setCurrentVideoUrl(image.videoUrl || "")
      setIsVideoModalOpen(true)
    } else if (image.action === "link" && image.link) {
      window.location.href = image.link
    }
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setCurrentVideoUrl("")
  }

  const handleSlideChange = (index: number) => {
    if (index !== currentImageIndex) {
      setDirection(index > currentImageIndex ? 1 : -1)
      setCurrentImageIndex(index)
    }
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
    },
    hover: {
      scale: 1.03,
      y: -1,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.1
      }
    }
  }

  // Debug logging
  console.log('🎠 EventRecapCarousel Debug:', {
    currentImageIndex,
    totalEvents: eventImages.length,
    currentEventTitle: currentImage?.title,
    loadedImages: loadedImages.length,
    loading,
    imageErrors: imageErrors.length
  })

  // Loading state
  if (loading) {
    return (
      <section className="relative w-full h-screen overflow-hidden isolate bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-white font-medium">Loading carousel images...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a moment for external images</p>
        </div>
      </section>
    )
  }

  // Error state - but still show carousel with fallback
  if (!areImagesLoaded) {
    console.warn('⚠️ No images loaded, showing carousel with placeholders')
    // Instead of showing error, show carousel with placeholder images
    return (
      <section className="relative w-full overflow-hidden isolate bg-white">
        <div className="mx-auto max-w-7xl relative">
          {/* Navigation Buttons */}
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

          {/* Placeholder Image Container */}
          <div className="overflow-hidden h-screen w-full relative flex items-center justify-center isolate bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            {/* Overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Placeholder Pattern */}
            <div className="absolute inset-0 z-10 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-indigo-500/30"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            {/* Content Overlay */}
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

            {/* Slide indicators */}
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

        {/* Accessibility: Screen reader content */}
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
        {/* Full Viewport Slider with max-w-7xl constraint */}
        <div className="mx-auto max-w-7xl relative">
          {/* Navigation Buttons */}
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

          {/* Image Slider Container */}
          <div className={cn("overflow-hidden h-screen w-full relative flex items-center justify-center isolate bg-black")}>
            {/* Image Animation */}
            <AnimatePresence mode="wait" custom={direction}>
              <SlideImage
                key={safeCurrentIndex}
                src={loadedImages[safeCurrentIndex]}
                alt={`Slide ${safeCurrentIndex + 1}`}
                direction={direction}
              />
            </AnimatePresence>

            {/* Content Overlay */}
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

            {/* Slide indicators */}
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

        {/* Accessibility: Screen reader content */}
        <div className="sr-only">
          <p>Event recap slideshow showcasing highlights from AIM 2025</p>
          <p>{currentImage.title} - {currentImage.subtitle}</p>
          <p>Slide {currentImageIndex + 1} of {eventImages.length}</p>
        </div>
      </section>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
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
              className="relative w-full max-w-6xl mx-4 bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Close Button */}
              <motion.button
                onClick={closeVideoModal}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Close video modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RiCloseLine className="size-6" />
              </motion.button>

              {/* Video Container */}
              <div className="relative w-full bg-black rounded-3xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={currentVideoUrl}
                  className="absolute inset-0 w-full h-full rounded-3xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="AIM Event Recap Video"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
