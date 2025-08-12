"use client"

import { motion } from "motion/react"

export default function SurfHero2025() {
  return (
    <section className="relative bg-white pt-32 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[75vh] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h1
              className="text-6xl lg:text-9xl font-black mb-6 sm:mb-8 md:mb-10 text-neutral-900 leading-[0.9] sm:leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                className="bg-gradient-to-r from-[#548cac] via-[#8ECAE6] to-[#219EBC] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Poster
              </motion.span>{" "}
              
              <br />
              <span className="text-[#000]">Presenters</span>
            </motion.h1>
            
            <motion.div
              className="h-1 w-20 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-[#548cac] to-[#8ECAE6] mb-8 sm:mb-10 md:mb-12 lg:mb-16 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-neutral-700 mb-12 sm:mb-14 md:mb-16 lg:mb-20 leading-relaxed sm:leading-relaxed md:leading-[1.4] lg:leading-[1.5] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto font-light px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              San Antonio Military Health and Universities Research Forum <strong>(SURF)</strong> brings together military and civilian researchers, clinicians, and students to showcase cutting-edge research in military medicine and healthcare innovation.
            </motion.p>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="-mt-6 md:mt-0"
            >
              <motion.button
                className="bg-gradient-to-r from-[#548cac] to-[#8ECAE6] text-white px-8 py-4 sm:px-10 sm:py-4 md:px-12 md:py-5 lg:px-14 lg:py-6 rounded-xl font-semibold text-base sm:text-lg md:text-xl lg:text-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(84, 140, 172, 0.3), 0 10px 10px -5px rgba(84, 140, 172, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const presentersSection = document.getElementById("surf-presenters-section")
                  presentersSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Explore Presenters
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
