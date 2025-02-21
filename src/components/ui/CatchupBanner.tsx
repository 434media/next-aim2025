"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { RiPlayFill } from "@remixicon/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

const stats = [
  {
    name: "Total Registered 2024",
    value: "977",
  },
  {
    name: "Total Registered 2023",
    value: "347",
  },
  {
    name: "Increase YoY",
    value: "2.8x",
  },
]

export default function CatchupBanner() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#366A79]/70">
      <div className="absolute inset-0">
        <Image
          alt="AIM Summit 2024 background"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/d43879fd-7968-40bb-a498-9950749bf6cd_1.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#366A79]/80 to-[#366A79]/95" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 lg:p-16">
        <div className="md:w-1/2 lg:w-3/5 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Help Drive Military Medical Innovation
          </h2>
          <p className="text-lg text-white/90 mb-6 text-balance tracking-tight">
            <strong>AIM Health R&D Summit</strong> provides an unparalleled epicenter for the convergence of professionals from academia, industry, and the military
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button onClick={() => setIsOpen(true)} variant="primary" className="w-full sm:w-auto text-lg py-3 px-6">
              <RiPlayFill className="mr-2 size-5" aria-hidden="true" />
              Watch highlights
            </Button>
            <Button
              href="https://support.velocitytx.org/campaign/642575/donate"
              variant="secondary"
              className="w-full sm:w-auto text-lg py-3 px-6"
            >
              Become a Sponsor
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-y-8 border-t border-white/20 pt-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <dd className="text-4xl font-bold text-white">{stat.value}</dd>
                <dt className="mt-1 text-sm text-white/70">{stat.name}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:w-1/2 lg:w-2/5 relative">
          <div className="aspect-square w-full max-w-md mx-auto">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+30.png"
              alt="AIM Summit 2024 visual"
              width={500}
              height={500}
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black border-0">
          <DialogTitle>
            <VisuallyHidden>AIM Summit 2024 Highlights Video</VisuallyHidden>
          </DialogTitle>
          <div className="relative aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={isOpen ? "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM2025_V3.mp4" : ""}
              title="AIM Summit 2024 Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

