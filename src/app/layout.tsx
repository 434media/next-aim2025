import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

import Footer from "@/components/ui/Footer"
import NavBar from "@/components/ui/Navbar"
import { siteConfig } from "@/app/siteConfig"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Military Health", "Research & Development", "Innovation", "Collaboration"],
  authors: [
    {
      name: "AIM Health R&D Summit",
      url: siteConfig.url,
    },
  ],
  creator: "AIM Health R&D Summit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@AIMHealthSummit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: siteConfig.name,
            description: siteConfig.description,
            startDate: "2025-06-16T09:00",
            endDate: "2025-06-17T17:00",
            location: {
              "@type": "Place",
              name: "Henry B. González Convention Center",
              address: {
                "@type": "PostalAddress",
                streetAddress: "900 E Market St",
                addressLocality: "San Antonio",
                addressRegion: "TX",
                postalCode: "78205",
                addressCountry: "US",
              },
            },
            organizer: {
              "@type": "Organization",
              name: "AIM Health R&D Summit",
              url: siteConfig.url,
            },
          })}
        </script>
      </head>
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden scroll-auto bg-[#101310] text-white antialiased selection:bg-[#548cac] selection:text-white`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
