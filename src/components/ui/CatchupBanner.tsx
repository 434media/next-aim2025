"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { RiPlayFill } from "@remixicon/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export default function CatchupBanner() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="relative w-full max-w-6xl mx-auto rounded-xl shadow-2xl shadow-[#366A79]/70 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width=&apos;40&apos; height=&apos;40&apos; viewBox=&apos;0 0 40 40&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos;%3E%3Cg fill=&apos;none&apos; fill-rule=&apos;evenodd&apos;%3E%3Cpath stroke=&apos;rgba(255,255,255,1)&apos; d=&apos;M0 40h40V0H0z&apos;/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 p-8 sm:p-10">
          <div className="flex-1 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Relive AIM Health R&D Summit 2024
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Check out the highlights and catch anything you might have missed from last year&apos;s groundbreaking event.
              </p>
              <Button onClick={() => setIsOpen(true)} variant="primary" className="w-full sm:w-auto text-lg py-6 px-8">
                <RiPlayFill className="mr-2 size-6" aria-hidden="true" />
                Watch highlights
              </Button>
            </div>
          </div>

          <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-square">
            <div className="absolute inset-0">
              {/* Animated Decorative Elements */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), linear-gradient(45deg, rgba(255,122,0,0.1) 0%, rgba(255,122,0,0) 100%)",
                }}
              />
              <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border-4 border-orange-500/20 animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border-4 border-blue-500/20 animate-pulse [animation-delay:1s]" />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                  animation: "shine 3s infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black border-0">
          <DialogTitle asChild>
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

      <style jsx>{`
        @keyframes shine {
          0% {
            opacity: 0.5;
            transform: translateX(-100%) rotate(45deg);
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.5;
            transform: translateX(100%) rotate(45deg);
          }
        }
      `}</style>
    </section>
  )
}

