"use client"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useInView } from "react-intersection-observer"
import { useRef, useState, useEffect } from "react"

/**
 * A component that showcases the AIM Summit mission with animated content
 */
export function SummitMission() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mobileContentRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
    threshold: 0.1,
  })

  const prefersReducedMotion = useReducedMotion()

  // Desktop scroll tracking
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  })

  // Mobile scroll tracking
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileContentRef,
    offset: ["start end", "end start"],
  })

  // Desktop scroll effects for sticky header
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0.95, 0.9])
  const headerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.96])
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.7])

  // Desktop parallax effects for paragraphs - Y movement only, no opacity
  const p1Y = useTransform(scrollYProgress, [0, 0.2], [30, 0])
  const p2Y = useTransform(scrollYProgress, [0.1, 0.3], [30, 0])
  const p3Y = useTransform(scrollYProgress, [0.2, 0.4], [30, 0])

  // Mobile scroll effects for sticky header
  const mobileHeaderOpacity = useTransform(mobileScrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0.95, 0.9])
  const mobileHeaderScale = useTransform(mobileScrollYProgress, [0, 0.5, 1], [1, 0.99, 0.98])
  const mobileLineWidth = useTransform(mobileScrollYProgress, [0, 0.3], ["0%", "100%"])
  const mobileLineOpacity = useTransform(mobileScrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.7])

  // Mobile parallax effects for paragraphs - Y movement only, no opacity
  const mobileP1Y = useTransform(mobileScrollYProgress, [0, 0.2], [20, 0])
  const mobileP2Y = useTransform(mobileScrollYProgress, [0.1, 0.3], [20, 0])
  const mobileP3Y = useTransform(mobileScrollYProgress, [0.2, 0.4], [20, 0])

  // Mouse parallax effect for desktop only
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only update on desktop
      if (window.innerWidth >= 1024) {
        const { clientX, clientY } = e
        const x = (clientX / window.innerWidth - 0.5) * 20
        const y = (clientY / window.innerHeight - 0.5) * 10
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={(el) => {
        if (el) {
          containerRef.current = el
          ref(el)
        }
      }}
      className="relative bg-white"
    >
      {inView && (
        <section
          id="summit-mission"
          aria-labelledby="summit-mission-heading"
          className="relative w-full -mt-24 overflow-hidden"
        >
          {/* Mobile Layout - Now with Sticky Header */}
          <div className="lg:hidden h-screen overflow-hidden">
            {/* Mobile Sticky Header - Fixed navbar offset */}
            <motion.header
              className="sticky top-20 z-20 w-full bg-gradient-to-b from-white via-white to-transparent backdrop-blur-sm pt-20 pb-6 px-4 sm:px-6"
              style={{
                opacity: mobileHeaderOpacity,
                scale: mobileHeaderScale,
              }}
            >
              <div className="max-w-5xl mx-auto">
                <motion.h2
                  id="summit-mission-heading"
                  className="font-extrabold tracking-tight text-gray-900 leading-[1.1] text-left"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="text-5xl text-[#0369A1] drop-shadow-sm mb-3 sm:mb-4">From The Bench</div>
                  <div className="text-5xl relative">To The Battlefield</div>
                </motion.h2>

                {/* Mobile animated line that grows as you scroll */}
                <motion.div
                  className="h-2 sm:h-3 bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0EA5E9] rounded-full shadow-sm mt-4 sm:mt-6"
                  style={{
                    width: mobileLineWidth,
                    opacity: mobileLineOpacity,
                    boxShadow: "0 0 15px rgba(3, 105, 161, 0.3)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.header>

            {/* Mobile Scrollable Content */}
            <div
              ref={mobileContentRef}
              className="h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0284C7]/20 scrollbar-track-transparent"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="px-4 sm:px-6 py-8 max-w-5xl mx-auto">
                <div className="space-y-16 sm:space-y-20 pb-16">
                  {/* First paragraph with mobile parallax */}
                  <motion.div
                    className="group"
                    style={{
                      y: mobileP1Y,
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-16 flex-shrink-0">
                        <motion.div
                          className="w-1 h-16 sm:h-20 bg-gradient-to-b from-[#0369A1] to-transparent rounded-full"
                          animate={{ height: [0, 64] }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <div>
                        <p className="mt-16 text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
                          Designed to advance emerging technologies from the bench to the battlefield, the{" "}
                          <span className="text-[#0369A1] font-semibold">AIM Health R&D Summit</span> brings together
                          academia, industry, and the military in a unified forum to promote cross-sector partnership in
                          the development of{" "}
                          <span className="text-gray-900 font-semibold">life-saving medical innovations</span>.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Second paragraph with mobile parallax */}
                  <motion.div
                    className="group"
                    style={{
                      y: mobileP2Y,
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-2 flex-shrink-0">
                        <motion.div
                          className="w-1 h-16 sm:h-20 bg-gradient-to-b from-[#0369A1] to-transparent rounded-full"
                          animate={{ height: [0, 64] }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
                          By connecting top innovators across sectors,{" "}
                          <span className="text-[#0369A1] font-semibold">AIM</span> creates pathways to discovery and
                          commercialization while addressing common critical challenges in military and civilian
                          healthcare, encouraging the{" "}
                          <span className="text-gray-900 font-semibold">cross-pollination of ideas and expertise</span>{" "}
                          to drive forward the next generation of breakthroughs.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Third paragraph with mobile parallax */}
                  <motion.div
                    className="group"
                    style={{
                      y: mobileP3Y,
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-2 flex-shrink-0">
                        <motion.div
                          className="w-1 h-16 sm:h-20 bg-gradient-to-b from-[#0369A1] to-transparent rounded-full"
                          animate={{ height: [0, 64] }}
                          transition={{ duration: 1.5, delay: 1.5 }}
                        />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
                          The collaboration between researchers, innovators, and military leaders serves as a{" "}
                          <span className="text-gray-900 font-semibold">catalyst for medical advancements</span> that
                          not only enhance military readiness but also have the potential to{" "}
                          <span className="text-[#0369A1] font-semibold">
                            improve healthcare outcomes on a global scale
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Sticky Header with Scrollable Content */}
          <div className="hidden lg:block lg:h-screen lg:overflow-hidden">
            {/* Desktop Sticky Header - Fixed navbar offset */}
            <motion.header
              className="sticky top-20 z-20 w-full bg-gradient-to-b from-white via-white to-transparent backdrop-blur-sm pt-20 pb-8 px-8"
              style={{
                opacity: headerOpacity,
                scale: headerScale,
                y: headerY,
              }}
            >
              <div className="max-w-7xl mx-auto">
                <motion.div
                  className="relative flex flex-col items-center justify-center text-center mx-auto"
                  style={{
                    x: prefersReducedMotion ? 0 : mousePosition.x * -0.5,
                    y: prefersReducedMotion ? 0 : mousePosition.y * -0.3,
                  }}
                >
                  <h2
                    id="summit-mission-heading-desktop"
                    className="font-extrabold tracking-tight text-gray-900 leading-tight"
                  >
                    <motion.div
                      className="text-7xl xl:text-8xl 2xl:text-9xl text-[#0369A1] drop-shadow-sm inline-block mr-6"
                      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    >
                      From The Bench
                    </motion.div>
                    <motion.div
                      className="text-7xl xl:text-8xl 2xl:text-9xl relative inline-block"
                      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    >
                      To The Battlefield
                    </motion.div>
                  </h2>

                  {/* Desktop animated line that grows as you scroll */}
                  <motion.div
                    className="h-1.5 bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0EA5E9] rounded-full shadow-sm mt-6 mx-auto"
                    style={{
                      width: lineWidth,
                      opacity: lineOpacity,
                      boxShadow: "0 0 20px rgba(3, 105, 161, 0.3)",
                    }}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Desktop decorative elements */}
                <motion.div
                  className="absolute top-0 right-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-[#0369A1]/10 to-[#0284C7]/20 blur-2xl"
                  style={{
                    x: prefersReducedMotion ? 0 : mousePosition.x * 1.5,
                    y: prefersReducedMotion ? 0 : mousePosition.y * 1.2,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.header>

            {/* Desktop Scrollable Content */}
            <div
              ref={contentRef}
              className="h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0284C7]/20 scrollbar-track-transparent"
            >
              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-32 pb-32">
                  {/* First paragraph with desktop parallax */}
                  <motion.div
                    className="group"
                    style={{
                      y: p1Y,
                      x: prefersReducedMotion ? 0 : mousePosition.x * 0.3,
                    }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-24">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#0369A1] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <div>
                        <p className="mt-24 text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 leading-relaxed font-light">
                          Designed to advance emerging technologies from the bench to the battlefield, the{" "}
                          <span className="text-[#0369A1] font-semibold group-hover:text-blue-700 transition-colors duration-300">
                            AIM Health R&D Summit
                          </span>{" "}
                          brings together academia, industry, and the military in a unified forum to promote
                          cross-sector partnership in the development of{" "}
                          <span className="text-gray-900 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                            life-saving medical innovations
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Second paragraph with desktop parallax */}
                  <motion.div
                    className="group"
                    style={{
                      y: p2Y,
                      x: prefersReducedMotion ? 0 : mousePosition.x * 0.2,
                    }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#0369A1] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                      </div>
                      <div>
                        <p className="text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 leading-relaxed font-light">
                          By connecting top innovators across sectors,{" "}
                          <span className="text-[#0369A1] font-semibold group-hover:text-blue-700 transition-colors duration-300">
                            AIM
                          </span>{" "}
                          creates pathways to discovery and commercialization while addressing common critical
                          challenges in military and civilian healthcare, encouraging the{" "}
                          <span className="text-gray-900 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                            cross-pollination of ideas and expertise
                          </span>{" "}
                          to drive forward the next generation of breakthroughs.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Third paragraph with desktop parallax */}
                  <motion.div
                    className="group"
                    style={{
                      y: p3Y,
                      x: prefersReducedMotion ? 0 : mousePosition.x * 0.1,
                    }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#0369A1] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 1.5 }}
                        />
                      </div>
                      <div>
                        <p className="text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 leading-relaxed font-light">
                          The collaboration between researchers, innovators, and military leaders serves as a{" "}
                          <span className="text-gray-900 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                            catalyst for medical advancements
                          </span>{" "}
                          that not only enhance military readiness but also have the potential to{" "}
                          <span className="text-[#0369A1] font-semibold group-hover:text-blue-700 transition-colors duration-300">
                            improve healthcare outcomes on a global scale
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
