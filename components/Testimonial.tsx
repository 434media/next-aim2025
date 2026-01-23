"use client"

import { ArrowRight, ExternalLink } from "lucide-react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

// Define the testimonial data structure
type Testimonial = {
  quote: string
  highlightedText: string
  author: string
  title: string
  image: string
  organization?: string
  logo: string
  logoAlt: string
  websiteUrl: string
  sponsorName: string
}

// Define our testimonials
const testimonials: Testimonial[] = [
  {
    quote:
      "At Audicin, we develop audio solutions to enhance focus, recovery, and sleep for active duty service members and veterans. Engineered for operational demands and post-service care for PTSD, Audicin supports cognitive readiness, stress regulation, and long-term resilience through mission-tested sound therapy",
    highlightedText: "At Audicin, we develop audio solutions to enhance focus, recovery, and sleep",
    author: "Laura Avonius",
    title: "Founder & CEO, Audicin",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/laura-audicin.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/HorizontalLogo_Audicin-02.png",
    logoAlt: "Audicin Logo",
    websiteUrl: "https://www.audicin.com/",
    sponsorName: "Audicin",
  },
  {
    quote:
      "At Metis Foundation, we are scientists serving scientists—advancing military medicine through mission-focused innovation, strategic collaboration, and sustainable funding to deliver real-world solutions from bench to battlefield.",
    highlightedText: "At Metis Foundation, we are scientists serving scientists",
    author: "Anders Carlsson, PhD",
    title: "COO, The Metis Foundation",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/metis-profile.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/High+resolution%2C+no+background+logo.png",
    logoAlt: "The Metis Foundation Logo",
    websiteUrl: "https://metisfoundationusa.org/",
    sponsorName: "The Metis Foundation",
  },
  {
    quote:
      "We're grateful to the AIM Summit for providing a powerful platform to connect with academic, industry, and military leaders",
    highlightedText:
      "We're grateful to the AIM Summit for providing a powerful platform to connect with academic, industry, and military leaders",
    author: "Christina Spencer",
    title: "Director, Research Operations, TRC4",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/spenser-trc4.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/TRC4+UT+System+Logo.png",
    logoAlt: "TRC4 Logo",
    websiteUrl: "https://trc4.org/",
    sponsorName: "TRC4",
  },
  {
    quote:
      "StemBioSys develops primary cell-derived extracellular matrices that bring in vitro research closer to human biology. By enhancing the relevance and reliability of preclinical data, we support AIM's mission to accelerate transformative healthcare innovations for military and civilian populations.",
    highlightedText: "StemBioSys develops primary cell-derived extracellular matrices",
    author: "Bob Hutchens",
    title: "CEO, StemBioSys",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/bob-stembios.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/stembiosys.png",
    logoAlt: "StemBioSys Logo",
    websiteUrl: "https://www.stembiosys.com/",
    sponsorName: "StemBioSys",
  },
  {
    quote:
      "At Molecular You, we believe in honouring those who serve by helping them stay mission-ready and healthy—long after the mission ends. Our pre-diagnostic health assessment offers early detection of chronic disease risks through a single blood test, empowering active military personnel to extend their service and supporting veterans with personalized health insights to thrive in civilian life.",
    highlightedText:
      "At Molecular You, we believe in honouring those who serve by helping them stay mission-ready and healthy",
    author: "Rob Fraser",
    title: "CSO & Co-Founder, Molecular You",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Rob+Fraser+1.1+(3).png",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/MYHi+logo+file+copy+sideways-01+(2).png",
    logoAlt: "Molecular You Logo",
    websiteUrl: "https://www.molecularyou.com/",
    sponsorName: "Molecular You",
  },
  {
    quote:
      "Forums like AIM give us the opportunity to collaborate with organizations outside of DoD so they have a better idea how to engage with the military's medical mission and advance healthcare innovation",
    highlightedText: "Forums like AIM give us the opportunity to collaborate with organizations outside of DoD",
    author: "Dr. Sean Biggerstaff",
    title: "Acting Deputy Assistant Director, Research and Engineering, Defense Health Agency",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/biggerstaff.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png",
    logoAlt: "Defense Health Agency Logo",
    websiteUrl: "https://dha.mil/",
    sponsorName: "The Defense Health Agency",
  },
]

function TestimonialCard({ testimonial, pairIndex, index }: { testimonial: Testimonial, pairIndex: number, index: number }) {
  return (
    <article
      key={testimonial.sponsorName}
      className={`flex flex-col px-8 py-12 ${index === 1 && testimonials.length > 1
        ? "border-l pt-12 pl-12"
        : "pb-12 pr-6"
        }`}
      aria-labelledby={`testimonial-${pairIndex}-${index}-author`}
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="mb-10">
        <div className="relative h-16 w-full max-w-sm">
          <Image
            src={testimonial.logo || "/placeholder.svg"}
            alt={testimonial.logoAlt}
            fill
            className="object-contain object-left"
            sizes="400px"
            priority={pairIndex === 0}
          />
        </div>
      </motion.div>

      {/* Quote and Author */}
      <figure className="flex flex-auto flex-col justify-between">
        <blockquote className="text-xl leading-8 text-neutral-900 mb-10">
          <p>
            <span className="font-semibold text-sky-600">&quot;{testimonial.highlightedText}</span>
            {testimonial.quote.substring(testimonial.highlightedText.length)}&quot;
          </p>
        </blockquote>

        <div className="space-y-6">
          <figcaption className="flex items-center gap-x-6">
            <div className="relative">
              <Image
                alt=""
                src={testimonial.image || "/placeholder.svg"}
                width={56}
                height={56}
                className="w-full h-full rounded-full bg-neutral-50 object-cover ring-2 ring-white shadow-lg"
              />
            </div>
            <div className="text-base">
              <div
                id={`testimonial-${pairIndex}-${index}-author`}
                className="font-semibold text-neutral-900"
              >
                {testimonial.author}
              </div>
              <div className="mt-1 text-neutral-500 leading-tight">{testimonial.title}</div>
            </div>
          </figcaption>

          <motion.a
            href={testimonial.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg group w-fit focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            aria-label={`Visit ${testimonial.sponsorName} website (opens in new tab)`}
          >
            <span>Visit {testimonial.sponsorName}</span>
            <ExternalLink
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </div>
      </figure>
    </article>
  )
}

function MobileTestimonialCard({ testimonial, isInView, index }: { testimonial: Testimonial, isInView: boolean, index: number }) {
  return (
    <motion.div
      key={`mobile-${testimonial.sponsorName}`}
      className="flex-none w-full snap-start h-full"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <article
        className="flex flex-col px-6 py-8 h-full"
        aria-labelledby={`mobile-testimonial-${index}-author`}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="">
          <div className="relative h-16 w-full max-w-xs">
            <Image
              src={testimonial.logo || "/placeholder.svg"}
              alt={testimonial.logoAlt}
              fill
              className="object-contain object-left"
              sizes="300px"
              priority={index === 0}
            />
          </div>
        </motion.div>

        {/* Quote and Author */}
        <figure className="flex flex-auto flex-col justify-around">
          <blockquote className="text-lg leading-7 text-neutral-900">
            <p>
              <span className="font-semibold text-sky-600">&quot;{testimonial.highlightedText}</span>
              {testimonial.quote.substring(testimonial.highlightedText.length)}&quot;
            </p>
          </blockquote>

          <div className="space-y-4">
            <figcaption className="flex items-center gap-x-4">
              <div className="relative">
                <Image
                  alt="profile"
                  src={testimonial.image || "/placeholder.svg"}
                  width={48}
                  height={48}
                  className="w-full h-full rounded-full bg-neutral-50 object-cover ring-2 ring-white shadow-lg"
                />
              </div>
              <div className="text-sm">
                <div
                  id={`mobile-testimonial-${index}-author`}
                  className="font-semibold text-neutral-900"
                >
                  {testimonial.author}
                </div>
                <div className="mt-1 text-neutral-500 leading-tight">{testimonial.title}</div>
              </div>
            </figcaption>

            <motion.a
              href={testimonial.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg group w-fit focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              aria-label={`Visit ${testimonial.sponsorName} website (opens in new tab)`}
            >
              <span>Visit {testimonial.sponsorName}</span>
              <ExternalLink
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </div>
        </figure>
      </article>
    </motion.div>
  )
}

export default function SponsorSpotlight() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Group testimonials into pairs for desktop side-by-side layout
  const testimonialPairs = []
  for (let i = 0; i < testimonials.length; i += 2) {
    testimonialPairs.push(testimonials.slice(i, i + 2))
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
      aria-labelledby="sponsor-spotlight-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-600/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Header - Updated to match reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center mb-16"
        >
          <h2
            id="sponsor-spotlight-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[0.9] mb-6"
          >
            Special thanks to our sponsors
          </h2>
          <p className="text-lg leading-8 text-neutral-600 mb-8 max-w-2xl mx-auto">
            Interested in sponsoring <strong>AIM&apos;26</strong>?{" "}
            <Link
              href="/contact-us"
              className="block md:inline-flex font-semibold text-sky-600 hover:text-sky-700 transition-colors duration-200 underline decoration-sky-600/30 hover:decoration-sky-700/50"
            >
              Contact us
            </Link>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/sponsors-exhibitors"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-neutral-900 border border-transparent rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 transition-all duration-200"
            >
              View AIM&apos;25 Sponsors
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Desktop: Scrollable container with pairs */}
          <motion.div
            className="hidden lg:flex gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            role="region"
            aria-label="Sponsor testimonials carousel"
            tabIndex={0}
          >
            {testimonialPairs.map((pair, pairIndex) => (
              <motion.div
                key={`pair-${pairIndex}`}
                className="flex-none w-full snap-start grid grid-cols-2 gap-0 min-h-[600px]"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: pairIndex * 0.2 }}
              >
                {pair.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.sponsorName}
                    testimonial={testimonial}
                    pairIndex={pairIndex}
                    index={index}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: Individual testimonials with fixed height */}
          <motion.div
            className="lg:hidden flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              height: "600px", // Fixed height to show only one testimonial
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            role="region"
            aria-label="Sponsor testimonials carousel"
            tabIndex={0}
          >
            {testimonials.map((testimonial, index) => (
              <MobileTestimonialCard
                key={`mobile-${testimonial.sponsorName}`}
                testimonial={testimonial}
                isInView={isInView}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center mt-8"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>Scroll to see more testimonials</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="text-sky-600"
            >
              →
            </motion.div>
          </div>
        </motion.div>

        {/* Screen reader navigation instructions */}
        <div className="sr-only">
          <p>
            Use arrow keys or swipe to navigate between testimonials. On desktop, testimonials are shown in pairs side by side. On mobile, testimonials are shown individually.
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
