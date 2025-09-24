"use client"

import { RiArrowRightUpLine } from "@remixicon/react"
import { motion } from "motion/react"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-6 mb-16"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/powered%2Bby%2Bgeekdom%2Bsasw-33%2B%281%29-VKZn4HnJcIrzqCv1ouxttrBLpmIfa3.png"
              alt="SASW Logo"
              className="h-16 w-auto"
            />
            <span className="text-gray-400 text-2xl font-bold">×</span>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/aim-black-2026%281%29-bLjRGVEhNRzI1cscZ6l0sNDiVXlwZS.png"
              alt="AIM 2026 Logo"
              className="h-24 w-auto"
            />
            <span className="text-gray-400 text-2xl font-bold">×</span>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/VelocityTX%2BLogo%2BMAIN%2BRGB%2B%281%29%282%29-OLMMc7WyoO5hNS0BvkORtA92WEkrvl.png"
              alt="VelocityTX Logo"
              className="h-16 w-auto"
            />
          </motion.div>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Plan Your Week of Innovation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-2xl text-gray-700 font-bold mb-12 leading-relaxed">
              Don't Miss These AIM-Sponsored Events
              <br />
              at San Antonio Startup Week!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 pb-20 -mt-10">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Event 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 overflow-hidden group"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9333ea, #ec4899) border-box",
            }}
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                AI in Healthcare: The Good, The Bad, The Unknown
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                In an era where technology is transforming every aspect of our lives, healthcare stands at the forefront
                of this digital revolution.
              </p>
              <div className="flex flex-col space-y-2 text-gray-500 mb-6 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Thursday, October 16</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>8:00 AM – 10:00 AM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>VelocityTX</span>
                </div>
              </div>
              <a
                href="https://www.eventbrite.com/e/ai-in-healthcare-the-good-the-bad-and-the-unknown-registration-1628736216869"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Learn More <RiArrowRightUpLine className="inline size-4 ml-1" />
                </button>
              </a>
            </div>
          </motion.div>

          {/* Event 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 overflow-hidden group"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9333ea, #ec4899) border-box",
            }}
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Leveraging Federal Funding to Accelerate Dual-Use Solutions
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                Discover how federal programs like SBIR, STTR, and CDMRP can help entrepreneurs fund, validate, and
                scale dual-use technologies.
              </p>
              <div className="flex flex-col space-y-2 text-gray-500 mb-6 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Thursday, October 16</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>1:30–2:30 p.m.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Embassy Suites – Majestic Ballroom B</span>
                </div>
              </div>
              <a href="https://sasw.co/homepage-2/" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Learn More <RiArrowRightUpLine className="inline size-4 ml-1" />
                </button>
              </a>
            </div>
          </motion.div>

          {/* Event 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 overflow-hidden group"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9333ea, #ec4899) border-box",
            }}
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Connecting with Capability: Research Sponsorship and Collaboration in San Antonio
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                Get a preview of San Antonio's innovation ecosystem and learn how startups, corporations, and investors
                can tap into local research and collaboration opportunities.
              </p>
              <div className="flex flex-col space-y-2 text-gray-500 mb-6 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Thursday, October 16</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>3:30–4:20 p.m.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Embassy Suites – Majestic Ballroom B</span>
                </div>
              </div>
              <a href="https://sasw.co/homepage-2/" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Learn More <RiArrowRightUpLine className="inline size-4 ml-1" />
                </button>
              </a>
            </div>
          </motion.div>

          {/* Event 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 overflow-hidden group"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9333ea, #ec4899) border-box",
            }}
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Funding Forward: Equitable, Strategic Capital for Innovators
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                Learn how investors, accelerators, and ecosystem leaders are creating equitable funding pathways to help
                innovators from all backgrounds grow and scale their startups.
              </p>
              <div className="flex flex-col space-y-2 text-gray-500 mb-6 font-semibold">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Thursday, October 16</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>4:30–5:20 p.m.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"></div>
                  <span>Embassy Suites – Majestic Ballroom A</span>
                </div>
              </div>
              <a href="https://sasw.co/homepage-2/" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Learn More <RiArrowRightUpLine className="inline size-4 ml-1" />
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
