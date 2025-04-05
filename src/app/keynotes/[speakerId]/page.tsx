import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RiArrowLeftLine, RiCalendarLine, RiMapPinLine, RiTimeLine } from "@remixicon/react"
import { Button } from "@/components/Button"

// Featured keynote speakers data
const keynoteSpeakers = [
  {
    id: "shan-bagby",
    name: "Dr. Shan Bagby",
    title: "DMD, MHA, FACHE",
    organization: "BAMC",
    topic: "Relational Leadership Elevated",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-40-keynote+(1).png",
    bio: "Brigadier General (Ret.) Shan Kevin Bagby is a senior healthcare executive and decorated C-suite military leader. He brings a wide range of experience and domain expertise in executive leadership, strategic planning, stakeholder engagement, budget oversight, and healthcare administration. His blended clinical and business acumen allows him to touch matrixed organizations at all levels - from developing and training clinical teams to leading large divisions.\n\n After Shan obtained a dental degree at the University of Pittsburgh, he entered his residency and subsequent fellowship for oral and maxillofacial surgery. Following residency, in 1997, he came on active duty in the US Army until officially retiring in 2023.\n\n Shan's 25-year active-duty career in the US Army included a number of progressive roles across program management, military education, medical logistics, and personnel management, while also serving as a subject matter expert and principal advisor to military C-suite on organizational safety, quality, and efficiency. He managed large teams (up to 22,000 employees), directed multibillion-dollar operational budgets, and supervised large-bed military hospitals, public health clinics, dental, and veterinary facilities across multi-state markets which served up to 500,000+ beneficiaries. ",
    sessionDate: "June 17, 2025",
    sessionTime: "3:45 PM - 4:15 PM",
    sessionLocation: "Plenary Room (302A-C)",
    keyPoints: ["Develop or enhance your leadership philosophy", "Legacy, and lifelong learning"],
    featured: true,
  },
  {
    id: "don-jenkins",
    name: "Dr. Donald Jenkins, MD",
    title: "Professor of Surgery",
    organization: "UT Health San Antonio",
    topic: "Dual-Use Medical Tech for DOD & Disaster/Combat Casualty Care",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-40-keynote+(1).png",
    bio: "Dr. Donald Jenkins earned a BS in Biochemistry from the University of Scranton in Scranton, PA and his MD at the Uniformed Services University in Bethesda MD.  He performed his surgical residency at Wilford Hall USAF Hospital in San Antonio TX, trauma fellowship at the University of Pennsylvania in Philadelphia PA, and retired after nearly 25 years of active duty from the USAF in 2008.\n\n As former Trauma Medical Director at the American College of Surgeons Level I Trauma Center at Saint Mary's Hospital at Mayo Clinic in Rochester, Dr. Jenkins had oversight for the entire spectrum of care.\n\n Dr. Jenkins has been the Trauma Director for the ACS Level I for the United States Air Force (2000-2008), and the Trauma Director for the 44th Medical Command for all medical care in Iraq (2004-2005).  He helped develop the Joint Theater Trauma System for the United States Central Command and was the Trauma Director.  He's helped develop the Joint Trauma System and was the Trauma Medical Director at Fort Sam Houston, TX from 2007-2008.\n\n  His experience in Performance Improvement, as the ACSCOT PIPS Committee Chair, and liaison to the Society of Trauma Nurses for the Trauma Outcome PI Course.  He's built rural trauma regional organizations and teaches PI in both urban Level I and rural Level III and IV centers.\n\n Dr. Jenkins is currently Professor of Surgery, Vice Chair for Quality and Associate Deputy Director of the Military Health Institute at the University of Texas Health Science Center in San Antonio.",
    sessionDate: "June 16, 2025",
    sessionTime: "10:30 AM - 11:15 AM",
    sessionLocation: "Plenary Room (302A-C)",
    keyPoints: [
      "Medical Challenges in High-Intensity Environments",
      "Technological Needs and Innovations in Crisis Medicine",
      "Enhancing Patient Care and Survivability with Emerging Technologies",
    ],
    featured: true,
  },
  {
    id: "larry-schlesinger",
    name: "Dr. Larry S. Schlesinger",
    title: "President and CEO",
    organization: "Texas Biomedical Research Institute",
    topic: "Defending the Nation: Emerging Tech & Biothreat Protection",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-40-keynote+(1).png",
    bio: "Larry S. Schlesinger, MD, is a physician-scientist and professor, president, and CEO of Texas Biomedical Research Institute, a nonprofit research organization in San Antonio, Texas.\n\n Dr. Larry S. Schlesinger is an internationally recognized authority in infectious diseases with a particular interest in tuberculosis and lung biology. As a physician scientist, his studies focus on the pathogenesis of tuberculosis and other airborne infectious agents that subvert lung immune mechanisms. TB is the deadliest infectious disease in the world",
    sessionDate: "June 17, 2025",
    sessionTime: "11:15 AM - 12:00 PM",
    sessionLocation: "Plenary Room (302A-C)",
    keyPoints: [
      "Emerging Technologies in Biodefense",
      "Science and Technology Collaboration for Public Health and National Security",
      "The Future of Biodefense",
    ],
    featured: true,
  },
]

// Update the generateMetadata function to properly await params
export async function generateMetadata({ params }: { params: Promise<{ speakerId: string }> }): Promise<Metadata> {
  // Await the params before accessing speakerId
  const { speakerId } = await params
  const speaker = keynoteSpeakers.find((s) => s.id === speakerId)

  if (!speaker) {
    return {
      title: "Speaker Not Found | AIM Health R&D Summit",
    }
  }

  return {
    title: `${speaker.name} - Keynote Speaker | AIM Health R&D Summit`,
    description: `Learn about ${speaker.name}, ${speaker.title} at ${speaker.organization}, and their keynote presentation "${speaker.topic}" at the AIM Health R&D Summit.`,
    openGraph: {
      title: `${speaker.name} - Keynote Speaker | AIM Health R&D Summit`,
      description: `Learn about ${speaker.name}, ${speaker.title} at ${speaker.organization}, and their keynote presentation "${speaker.topic}" at the AIM Health R&D Summit.`,
      images: [
        {
          url: speaker.image,
          width: 1200,
          height: 630,
          alt: speaker.name,
        },
      ],
    },
  }
}

// Update the main component to also await params
export default async function KeynoteSpeakerPage({ params }: { params: Promise<{ speakerId: string }> }) {
  // Await the params before accessing speakerId
  const { speakerId } = await params
  const speaker = keynoteSpeakers.find((s) => s.id === speakerId)

  if (!speaker) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background Image */}
        <Image
          src={speaker.image || "/placeholder.svg"}
          alt={speaker.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-[#101310]/70 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
          <div className="container mx-auto">
            <Link
              href="/keynotes"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <RiArrowLeftLine className="mr-2 h-5 w-5" />
              <span>Back to Keynote Speakers</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{speaker.name}</h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">{speaker.title}</p>
              <p className="text-lg text-white/80">{speaker.organization}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Bio */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#101310] mb-6">About {speaker.name}</h2>
            <div className="prose prose-lg max-w-none">
              {speaker.bio.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#101310] mb-6">Keynote Presentation</h2>
              <h3 className="text-xl md:text-2xl font-bold text-[#548cac] mb-4">{speaker.topic}</h3>

              <h4 className="text-lg font-semibold text-[#101310] mt-8 mb-4">Key Points</h4>
              <ul className="space-y-2">
                {speaker.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-6 w-6 flex-shrink-0 rounded-full bg-[#548cac]/20 text-[#548cac] text-center font-semibold text-sm leading-6 mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Session Details */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#101310] mb-6">Session Details</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <RiCalendarLine className="h-6 w-6 text-[#548cac] mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#101310]">Date</h4>
                    <p className="text-gray-700">{speaker.sessionDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <RiTimeLine className="h-6 w-6 text-[#548cac] mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#101310]">Time</h4>
                    <p className="text-gray-700">{speaker.sessionTime}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <RiMapPinLine className="h-6 w-6 text-[#548cac] mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#101310]">Location</h4>
                    <p className="text-gray-700">{speaker.sessionLocation}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="w-full justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register to Attend
                </Button>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    href={`https://twitter.com/intent/tweet?text=I'm excited to hear ${encodeURIComponent(speaker.name)} speak about "${encodeURIComponent(speaker.topic)}" at the AIM Health R&D Summit!&url=${encodeURIComponent(`https://aimsatx.com/keynotes/${speaker.id}`)}`}
                    className="w-full justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share This Speaker
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

