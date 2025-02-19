"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import createGlobe from "cobe"

export default function Testimonial() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    let width = 0
    let height = 0
    let globeCanvas: HTMLCanvasElement | null = null

    const onResize = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        width = container.offsetWidth
        height = container.offsetHeight
        if (globeCanvas) {
          globeCanvas.width = width * 2
          globeCanvas.height = height * 2
          globeCanvas.style.width = `${width}px`
          globeCanvas.style.height = `${height}px`
        }
      }
    }

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 25000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [1, 0.5, 0.2],
      glowColor: [0.8, 0.4, 0.2],
      markers: [
        { location: [29.4241, -98.4936], size: 0.05 }, // San Antonio
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.003
      },
    })

    globeCanvas = canvasRef.current
    onResize()
    window.addEventListener("resize", onResize)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#366A79]/70">
      <div className="absolute inset-0">
        <Image
          alt="Green textured background"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/milcityusa-2-testimonial.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#366A79]/80 to-[#366A79]/95" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 lg:p-16">
        <div className="md:w-1/2 lg:w-3/5 mb-6 md:mb-0 md:pr-8">
          <div className="relative">
            <svg
              fill="none"
              viewBox="0 0 162 128"
              aria-hidden="true"
              className="absolute -top-12 -left-8 -z-10 h-32 w-32 stroke-white/20 sm:h-36 sm:w-36"
            >
              <path
                d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
              />
              <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
            </svg>
            <blockquote className="relative text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight text-white mb-4">
              <p className="before:content-&quot;&quot; after:content-&quot;&quot; before:absolute before:-left-4 before:-top-2 after:absolute after:-bottom-2 after:-right-4 text-white/90">
                <strong className="font-semibold text-white">
                  Forums like MMID give us the opportunity to collaborate with organizations outside of DoD
                </strong>{" "}
                so they have a better idea how to engage with the military&#39;s medical mission
              </p>
            </blockquote>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="relative shrink-0 rounded-full bg-white/15 p-0.5 ring-1 ring-white/20">
              <Image
                alt="Dr. Sean Biggerstaff"
                src="/images/smiller.jpeg"
                width={56}
                height={56}
                className="rounded-full border object-contain"
              />
            </div>
            <div>
              <div className="text-base font-medium text-white">Dr. Sean Biggerstaff</div>
              <div className="text-sm text-orange-300 font-semibold md:max-w-sm md:text-balance">
                Acting Deputy Assistant Director, Research and Engineering, Defense Health Agency
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 lg:w-2/5 relative">
          <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-[150%] aspect-square">
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", contain: "layout paint size" }}
              className="opacity-90"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#366A79]/80 pointer-events-none" />
    </section>
  )
}

