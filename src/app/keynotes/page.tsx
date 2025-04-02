import type { Metadata } from "next"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import Image from "next/image"
import { Button } from "@/components/Button"
import { RiArrowRightUpLine } from "@remixicon/react"

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description: "Distinguished keynote speakers at the AIM Health R&D Summit leading the future of military medicine.",
  openGraph: {
    title: "Keynote Speakers | AIM Health R&D Summit",
    description: "Distinguished keynote speakers at the AIM Health R&D Summit leading the future of military medicine.",
    url: "/keynotes",
  },
}

interface KeynoteSpeaker {
  name: string
  title: string
  organization: string
  image: string
  bio: string
  topic: string
}

const keynoteSpeakers: KeynoteSpeaker[] = [
  {
    name: "Dr. Don Jenkins",
    title: "Director of Medical Innovation",
    organization: "Defense Health Agency",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Donald+Jenkins+headshot.png",
    bio: "Dr. Don Jenkins leads groundbreaking research in combat casualty care and has pioneered several field-deployable medical technologies. Her work bridges the gap between military requirements and civilian applications, resulting in life-saving innovations for both sectors.",
    topic: "Battlefield to Bedside: Accelerating Medical Innovation Through Military-Civilian Collaboration",
  },
  {
    name: "Dr. Larry S Schlesinger",
    title: "Chief Medical Officer",
    organization: "Military Health System",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Headshot.png",
    bio: "Dr. Larry S Schlesinger has over 20 years of experience in military medicine and has served in multiple combat deployments. His research focuses on trauma systems and emergency medicine protocols that have been adopted by civilian healthcare systems worldwide.",
    topic: "Resilient Medical Systems: Lessons from Military Medicine for Global Healthcare Challenges",
  },
  {
    name: "Dr. Shan Bagby",
    title: "VP of Research & Development",
    organization: "BioMedTech Innovations",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Dr. Shan Bagby has led the development of over 15 FDA-approved medical devices and has been instrumental in creating public-private partnerships between industry and military research institutions. Her work focuses on translational research and commercialization pathways.",
    topic: "From Concept to Commercialization: Creating Sustainable Pathways for Military Medical Innovations",
  },
]

export default function KeynotesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#101310] to-black py-16 md:py-24 mt-20 md:mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2a]/80 to-[#101310]/90 backdrop-blur-sm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeContainer className="flex flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#548cac]">VISIONARY LEADERS</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <FadeSpan>Keynote Speakers</FadeSpan>
            </h1>
            <p className="mt-6 max-w-2xl text-center text-lg text-gray-300">
              <FadeSpan>
                Hear from distinguished leaders shaping the future of military medicine through groundbreaking research,
                innovation, and cross-sector collaboration.
              </FadeSpan>
            </p>
          </FadeContainer>
        </div>
      </section>

      {/* Keynote Speakers Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeContainer className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#101310] sm:text-4xl">
              Featured Keynote Presentations
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join us for these transformative sessions that will shape the future of military health innovation.
            </p>
          </FadeContainer>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {keynoteSpeakers.map((speaker) => (
              <FadeDiv
                key={speaker.name}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={speaker.image || "/placeholder.svg"}
                    alt={speaker.name}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101310]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-xl font-bold text-white">{speaker.name}</h3>
                    <p className="mt-1 text-sm text-gray-200">{speaker.title}</p>
                    <p className="text-sm font-semibold text-[#548cac]">{speaker.organization}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-[#101310]">{speaker.topic}</h4>
                    <p className="text-gray-600">{speaker.bio}</p>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="secondary"
                      href="#"
                      className="w-full justify-center bg-[#548cac] text-white hover:bg-[#548cac]/90"
                    >
                      <span className="flex items-center justify-center">
                        Session Details
                        <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
                      </span>
                    </Button>
                  </div>
                </div>
              </FadeDiv>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

