import { AnimatedLogo } from "@/components/ui/AnimatedLogo"
import CatchupBanner from "@/components/ui/CatchupBanner"
import FeatureDivider from "@/components/ui/FeatureDivider"
import Features from "@/components/ui/Features"
import { HeroVideo } from "@/components/ui/HeroVideo"
import { SponsorShowcase } from "@/components/ui/SponsorShowcase"
import Testimonial from "@/components/ui/Testimonial"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col">
      <HeroVideo />
      <AnimatedLogo />
      <div className="pt-16 px-4 xl:px-0">
        <Features />
      </div>
      <div className="mt-32 px-4 xl:px-0">
        <Testimonial />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <CatchupBanner />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <SponsorShowcase />
    </main>
  )
}
