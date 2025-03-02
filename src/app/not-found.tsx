import type { Metadata } from "next"
import { Button } from "@/components/Button"
import Link from "next/link"
import { siteConfig } from "@/app/siteConfig"
import { AIMLogo } from "../../public/AIMLogo"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Sorry, we couldn't find the page you're looking for.",
}

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#101310]">
      <Link href={siteConfig.links.home} aria-label="Go to homepage">
        <AIMLogo variant="white" className="mt-6 h-10 w-auto" />
      </Link>
      <p className="mt-6 text-4xl font-semibold text-[#548cac] sm:text-5xl" aria-label="Error code">
        Error 404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-[#6a6a3d]">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Button className="group mt-8" variant="primary">
        <Link href={siteConfig.links.home}>Go to the home page</Link>
      </Button>
    </div>
  )
}

