import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeContainer, FadeDiv, FadeSpan } from "../Fade"
import GameOfLife from "./HeroBackground"

export function Hero() {
  return (
    <section aria-label="hero" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <FadeContainer className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <FadeDiv className="mx-auto w-full max-w-xs text-center">
          <a
            aria-label="View latest update: AIM Webinars Announced"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center gap-3 rounded-full bg-white/5 px-2.5 py-1.5 pr-3 pl-1.5 font-medium text-gray-900 ring-1 ring-black/10 shadow-lg shadow-orange-400/20 backdrop-blur-[1px] transition-colors hover:bg-orange-500/[2.5%] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <span className="shrink-0 rounded-full border bg-gray-50 px-2.5 py-1 text-xs sm:text-sm text-gray-600">
              News
            </span>
            <span className="flex items-center gap-1 truncate text-xs sm:text-sm">
              <span className="truncate">Monthly Webinars Announced</span>
              <RiArrowRightUpLine className="size-4 shrink-0 text-gray-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </FadeDiv>
        <h1 className="mt-8 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#10131d]">
          <FadeSpan>Two</FadeSpan> <FadeSpan>Events</FadeSpan>
          <br className="block" />
          <FadeSpan>One</FadeSpan> <FadeSpan>Mission</FadeSpan>
        </h1>
        <p className="mt-5 max-w-3xl text-center text-base sm:text-lg md:text-xl text-gray-700 sm:mt-8 tracking-tight">
          <FadeSpan>Join us <strong className="font-semibold text-[#10131d]">June 16-17, 2025</strong> for{" "}
            <strong className="font-semibold text-[#10131d]">Military Medical Industry Day (MMID)</strong>{" "}
            <FadeSpan>and the <strong className="font-semibold text-[#10131d]">SURF conference</strong>,</FadeSpan>
          </FadeSpan>{" "}
          <FadeSpan>a powerful combination driving innovation in military medicine</FadeSpan>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <FadeDiv>
            <a
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-500 px-6 py-3 text-base font-medium tracking-wide text-white shadow-md transition-all duration-200 ease-in-out hover:from-orange-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
            >
              Register to Attend
              <RiArrowRightUpLine className="size-5" />
            </a>
          </FadeDiv>
          <FadeDiv>
            <a
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-b from-neutral-600 to-[#10131d] px-6 py-3 text-base font-medium tracking-wide text-white shadow-md transition-all duration-200 ease-in-out hover:from-neutral-700 hover:to-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
              href="https://support.velocitytx.org/campaign/642575/donate"
            >
              Become a Sponsor
              <RiArrowRightUpLine className="size-5" />
            </a>
          </FadeDiv>
        </div>

        <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
          <GameOfLife />
        </div>
      </FadeContainer>
    </section>
  )
}

