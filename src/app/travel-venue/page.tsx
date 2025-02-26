"use client"

import { motion } from "motion/react"
import { RiRestaurant2Line, RiHotelLine, RiMapPin2Line, RiWaterFlashLine } from "@remixicon/react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function TravelVenue() {
  return (
    <div className="bg-[#101310] min-h-screen text-white">
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/san-antonio-skyline.jpg"
          alt="San Antonio Skyline"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Welcome to San Antonio
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-[#548cac]"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            Your AIM Conference Adventure Awaits
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Where to Eat */}
        <motion.section className="mb-16" initial="initial" whileInView="animate" viewport={{ once: true }}>
          <div className="flex items-center mb-6">
            <RiRestaurant2Line className="text-3xl text-[#548cac] mr-4" />
            <h2 className="text-3xl font-bold">Where to Eat</h2>
          </div>
          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            San Antonio is a culinary paradise, offering a diverse range of flavors from smoky BBQ to vibrant
            international cuisines. Whether you&apos;re looking for a cozy cafe or an upscale dining experience, the Alamo
            City has something to satisfy every palate.
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={fadeInUp}>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Tex-Mex Delights</h3>
              <p>
                Indulge in authentic Tex-Mex flavors at local favorites like Mi Tierra and The Original Blanco Cafe.
              </p>
            </div>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">BBQ Joints</h3>
              <p>Savor smoky goodness at renowned spots like The Granary &apos;Cue & Brew and 2M Smokehouse.</p>
            </div>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Fine Dining</h3>
              <p>Experience culinary excellence at Signature, Supper, or Clementine for an unforgettable meal.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Where to Stay */}
        <motion.section className="mb-16" initial="initial" whileInView="animate" viewport={{ once: true }}>
          <div className="flex items-center mb-6">
            <RiHotelLine className="text-3xl text-[#548cac] mr-4" />
            <h2 className="text-3xl font-bold">Where to Stay</h2>
          </div>
          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            San Antonio offers a wide range of accommodations to suit every preference and budget. From luxury resorts
            to charming boutique hotels, you&apos;ll find the perfect place to rest after a day of conference activities and
            exploration.
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={fadeInUp}>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Downtown Hotels</h3>
              <p>Stay in the heart of the action with hotels offering rooftop pools and views of the Alamo.</p>
            </div>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Luxury Resorts</h3>
              <p>Indulge in five-star luxury at properties near The Pearl or in the scenic Hill Country.</p>
            </div>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Boutique Experiences</h3>
              <p>Discover unique stays in Southtown&apos;s charming bed and breakfasts and boutique hotels.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Things to Do */}
        <motion.section className="mb-16" initial="initial" whileInView="animate" viewport={{ once: true }}>
          <div className="flex items-center mb-6">
            <RiMapPin2Line className="text-3xl text-[#548cac] mr-4" />
            <h2 className="text-3xl font-bold">Things to Do</h2>
          </div>
          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            San Antonio is brimming with exciting attractions and activities. From historical sites to thrilling theme
            parks, there&apos;s something for everyone in the Alamo City.
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={fadeInUp}>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Historical Exploration</h3>
              <p>Visit the iconic Alamo and explore the San Antonio Missions National Historical Park.</p>
            </div>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Theme Park Adventures</h3>
              <p>Experience thrills at Six Flags Fiesta Texas or cool off at SeaWorld San Antonio.</p>
            </div>
            <div className="bg-[#1c1f1c] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-[#548cac]">Cultural Experiences</h3>
              <p>Immerse yourself in art at the McNay Art Museum or explore the vibrant Market Square.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* River Walk Highlight */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }}>
          <div className="flex items-center mb-6">
            <RiWaterFlashLine className="text-3xl text-[#548cac] mr-4" />
            <h2 className="text-3xl font-bold">The San Antonio River Walk</h2>
          </div>
          <motion.div className="flex flex-col md:flex-row items-center gap-8" variants={fadeInUp}>
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                No visit to San Antonio is complete without experiencing the iconic River Walk. This vibrant urban
                waterway is lined with restaurants, shops, and historic sites, offering a unique blend of culture,
                history, and entertainment.
              </p>
              <p className="text-lg">
                Take a relaxing boat tour, dine al fresco by the water, or simply stroll along the picturesque pathways
                to soak in the charm of this beloved San Antonio landmark.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/download.png"
                alt="San Antonio River Walk"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}

