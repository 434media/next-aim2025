import type { Metadata } from "next"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiArrowRightUpLine, RiCalendarLine, RiMapPinLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import ParticleBackground from "@/components/ParticleBackground"

export const metadata: Metadata = {
  title: "Keynote Speakers | AIM Health R&D Summit",
  description:
    "Learn about the distinguished keynote speakers at the AIM Health R&D Summit who are leading innovation in military healthcare.",
  openGraph: {
    title: "Keynote Speakers | AIM Health R&D Summit",
    description: "Learn about the distinguished keynote speakers at the AIM Health R&D Summit",
    url: "/keynotes",
    type: "website",
  },
}

// Featured keynote speakers data
const keynoteSpeakers = [
  {
    id: "general-miller",
    name: "Lt. Gen. Robert Miller",
    title: "Associate Vice President & Director",
    organization: "Military Health Institute",
    topic: "The Future of Military Medicine: A Vision for 2030",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/210621-F-XA123-1011.jpeg",
    bio: "Lieutenant General Robert I. Miller, U.S. Army (Retired), is a highly respected leader in military medicine with over 35 years of service.",
    featured: true,
  },
]

// SpeakerImage component with error handling
const SpeakerImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src || "/placeholder.svg?height=400&width=300"}
        alt={alt}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101310]/90 via-[#101310]/40 to-transparent md:bg-gradient-to-r md:from-[#101310]/90 md:via-[#101310]/40 md:to-transparent"></div>
    </div>
  )
}

export default function KeynotesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Combined Hero and Keynote Speakers Section with Particle Background */}
      <ParticleBackground className="w-full py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
          <FadeContainer className="flex flex-col items-center text-center mb-12 md:mb-16">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Featured Keynote Speaker
            </h1>

            <div className="mx-auto mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-base sm:text-lg md:text-xl text-white/80">
              <div className="flex items-center justify-center">
                <RiCalendarLine className="h-5 w-5 mr-2 text-white/90" aria-hidden="true" />
                <span>June 16, 2025</span>
              </div>

              <span className="hidden sm:block mx-2 h-1 w-1 rounded-full bg-white/50"></span>

              <div className="flex items-center justify-center">
                <RiMapPinLine className="h-5 w-5 mr-2 text-white/90" aria-hidden="true" />
                <span>Plenary Room (302A-C)</span>
              </div>
            </div>

            <p className="mx-auto max-w-2xl text-center text-base sm:text-lg text-white/80">
              Hear from Lt. Gen. Robert Miller, a visionary leader who is transforming military healthcare through
              innovation, research, and strategic partnerships. Our keynote address will highlight the future of
              military medicine and healthcare delivery.
            </p>
          </FadeContainer>

          {/* Keynote Speaker Cards */}
          <div className="max-w-5xl mx-auto pb-16">
            {keynoteSpeakers.map((speaker) => (
              <FadeDiv
                key={speaker.id}
                className="group relative flex flex-col md:flex-row overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm shadow-lg border border-white/10 transition-all duration-300 hover:shadow-xl hover:border-white/20"
              >
                <Link
                  href={`/keynotes/${speaker.id}`}
                  className="flex flex-col md:flex-row w-full focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-xl"
                  aria-label={`View details for ${speaker.name}`}
                >
                  {/* Speaker Image - adjusted for horizontal layout on larger screens */}
                  <div className="md:w-2/5 lg:w-1/3">
                    <SpeakerImage
                      src={speaker.image}
                      alt={speaker.name}
                      className="aspect-[3/4] md:aspect-square w-full h-full rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                    />
                  </div>

                  {/* Content - now takes more space horizontally on larger screens */}
                  <div className="relative md:w-3/5 lg:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="mb-4 flex items-center">
                      <span className="inline-flex items-center rounded-full bg-[#548cac]/20 px-3 py-1 text-xs font-medium text-[#548cac] backdrop-blur-sm">
                        Keynote Speaker
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{speaker.name}</h3>
                    <p className="text-lg md:text-xl text-white/90 font-medium">{speaker.title}</p>
                    <p className="text-white/80">{speaker.organization}</p>

                    <div className="mt-6 pt-6 border-t border-white/20">
                      <h4 className="text-xl font-semibold text-white mb-3">{speaker.topic}</h4>
                      <p className="text-white/80 mb-4 line-clamp-3">{speaker.bio}</p>
                      <div className="flex items-center mt-4 text-white/90 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">View Full Profile</span>
                        <RiArrowRightUpLine className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeDiv>
            ))}
          </div>
        </div>
      </ParticleBackground>
    </main>
  )
}
