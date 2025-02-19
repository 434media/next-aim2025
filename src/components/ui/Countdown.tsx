"use client"

import type React from "react"
import { useEffect, useState, useRef, memo, useCallback } from "react"
import { motion, useScroll, useTransform, animate } from "framer-motion"
import clsx from "clsx"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownItemProps {
  value: number
  label: string
  index: number
}

interface GlowingEffectProps {
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  variant?: "default" | "orange"
  glow?: boolean
  className?: string
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lastPosition = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>(0)

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current
          if (!element) return

          const { left, top, width, height } = element.getBoundingClientRect()
          const mouseX = e?.x ?? lastPosition.current.x
          const mouseY = e?.y ?? lastPosition.current.y

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY }
          }

          const center = [left + width * 0.5, top + height * 0.5]
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1])
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0")
            return
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity

          element.style.setProperty("--active", isActive ? "1" : "0")

          if (!isActive) return

          const currentAngle = Number.parseFloat(element.style.getPropertyValue("--start")) || 0
          const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180
          const newAngle = currentAngle + angleDiff

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value))
            },
          })
        })
      },
      [inactiveZone, proximity, movementDuration],
    )

    useEffect(() => {
      if (disabled) return

      const handleScroll = () => handleMove()
      const handlePointerMove = (e: PointerEvent) => handleMove(e)

      window.addEventListener("scroll", handleScroll, { passive: true })
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      })

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        window.removeEventListener("scroll", handleScroll)
        document.body.removeEventListener("pointermove", handlePointerMove)
      }
    }, [handleMove, disabled])

    return (
      <>
        <div
          className={clsx(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "orange" && "border-orange-500",
            disabled && "!block",
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "orange"
                  ? `radial-gradient(circle, #f97316 10%, #f9731600 20%),
                    radial-gradient(circle at 40% 40%, #fb923c 5%, #fb923c00 15%),
                    radial-gradient(circle at 60% 60%, #fdba74 10%, #fdba7400 20%), 
                    radial-gradient(circle at 40% 60%, #fed7aa 10%, #fed7aa00 20%),
                    repeating-conic-gradient(
                      from 236.84deg at 50% 50%,
                      #f97316 0%,
                      #fb923c calc(25% / var(--repeating-conic-gradient-times)),
                      #fdba74 calc(50% / var(--repeating-conic-gradient-times)), 
                      #fed7aa calc(75% / var(--repeating-conic-gradient-times)),
                      #f97316 calc(100% / var(--repeating-conic-gradient-times))
                    )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                    radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                    radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                    radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                    repeating-conic-gradient(
                      from 236.84deg at 50% 50%,
                      #dd7bbb 0%,
                      #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                      #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                      #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                      #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                    )`,
            } as React.CSSProperties
          }
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden",
          )}
        >
          <div
            className={clsx(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
            )}
          />
        </div>
      </>
    )
  },
)

GlowingEffect.displayName = "GlowingEffect"

function CountdownItem({ value, label, index }: CountdownItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="relative"
    >
      <div
        className="aspect-square rounded-lg bg-neutral-100 p-2 shadow-md sm:p-3 md:p-4"
        role="timer"
        aria-label={`${value} ${label}`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="text-neutral-950 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
          <span className="font-medium text-orange-500 text-xs sm:text-sm md:text-base lg:text-lg">{label}</span>
        </div>
      </div>
      <GlowingEffect disabled={false} glow={true} blur={5} spread={30} borderWidth={2} variant="orange" />
    </motion.div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0.3, 0.7], ["50%", "0%"])

  useEffect(() => {
    const targetDate = new Date("2025-06-16T00:00:00")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const countdownItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white/5 py-12"
      aria-labelledby="countdown-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y: contentY }} className="space-y-8 sm:space-y-12">
          <h2
            id="countdown-heading"
            className="text-center tracking-tight text-balance text-neutral-950 text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Let the countdown begin
          </h2>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8" role="timer" aria-live="polite">
            {countdownItems.map(({ value, label }, index) => (
              <CountdownItem key={label} value={value} label={label} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

