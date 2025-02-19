"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RiExternalLinkLine } from "@remixicon/react"

const sponsors = [
  {
    name: "VelocityTX",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+MAIN+RGB+(1).png",
    description: "Leading the way in cutting-edge technology solutions for healthcare and beyond.",
    website: "https://techinnovate.com",
  },
  {
    name: "UT Health",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/USAISR_LOGO_HI_RES+blank+background+black+and+white.jpg",
    description: "Pioneering advanced medical technologies to shape the future of healthcare.",
    website: "https://medifuture.com",
  },
  {
    name: "UTSA",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/59th_Medical_Wing.png",
    description: "Providing innovative defense solutions to protect and serve.",
    website: "https://defensetech.com",
  },
  {
    name: "BioAdvance",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/Bexar+Seal+High+Res+B_W+1200.png",
    description: "Advancing biotechnology for a healthier, more sustainable world.",
    website: "https://bioadvance.com",
  },
  {
    name: "AeroMed",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/City+of+San+Antonio.png",
    description: "Revolutionizing aeromedical evacuation and transport solutions.",
    website: "https://aeromed.com",
  },
  {
    name: "CyberShield",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/UTHSA_logo.svg",
    description: "Safeguarding digital assets with next-generation cybersecurity.",
    website: "https://cybershield.com",
  },
  {
    name: "NanoHealth",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/utsa-wordmark.svg",
    description: "Harnessing nanotechnology for breakthrough medical treatments.",
    website: "https://nanohealth.com",
  },
  {
    name: "EcoMilTech",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/ecomiltech-logo.png",
    description: "Developing eco-friendly technologies for military applications.",
    website: "https://ecomiltech.com",
  },
]

export function SponsorSpotlight() {
  const [selectedSponsor, setSelectedSponsor] = useState<(typeof sponsors)[0] | null>(null)

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Fueling Life-Saving Military Medical Breakthroughs
        </h2>
        <p className="text-lg text-center text-gray-700">
          Our sponsors are at the forefront of cutting-edge technology and innovation, driving advancements in military healthcare and beyond.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer"
              onClick={() => setSelectedSponsor(sponsor)}
            >
              <div
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  index === 0 ? "ring-4 ring-orange-400 ring-opacity-50 animate-pulse" : ""
                }`}
              >
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-center text-gray-700">{sponsor.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSponsor && (
          <Dialog open={!!selectedSponsor} onOpenChange={() => setSelectedSponsor(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">{selectedSponsor.name}</DialogTitle>
              </DialogHeader>
              <div className="relative aspect-square w-40 mx-auto my-4">
                <Image
                  src={selectedSponsor.logo || "/placeholder.svg"}
                  alt={`${selectedSponsor.name} logo`}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <DialogDescription className="text-gray-700">{selectedSponsor.description}</DialogDescription>
              <div className="mt-6">
                <a
                  href={selectedSponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Visit Website
                  <RiExternalLinkLine className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}

