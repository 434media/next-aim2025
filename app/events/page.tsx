"use client"

import { useEffect, useState } from "react"
import { getEventsAction } from "../../app/actions/events"
import { EventCard } from "../../components/events/EventCard"
import { EventCardSkeleton } from "../../components/events/LoadingSkeleton"
import { PastEventsSection } from "../../components/events/PastEventsSection"
import { Toast } from "../../components/events/Toast"

import { EditableText } from "../../components/admin/EditableText"
import { FadeIn } from "../../components/FadeIn"
import { isEventUpcoming, parseLocalDate } from "../../lib/event-utils"
import type { Event } from "../../types/event"

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [currentEvents, setCurrentEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning"; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      loadEvents()
    }
  }, [mounted])

  useEffect(() => {
    if (mounted && allEvents.length > 0) {
      const upcoming = allEvents.filter((event) => isEventUpcoming(event))
      const past = allEvents.filter((event) => !isEventUpcoming(event))
      setCurrentEvents(upcoming)
      setPastEvents(past)
    }
  }, [allEvents, mounted])

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  const loadEvents = async () => {
    setIsLoading(true)
    setError("")
    try {
      const result = await getEventsAction()
      if (result.success) {
        setAllEvents(result.events)
      } else {
        setError(result.error || "Failed to load events")
      }
    } catch (error) {
      setError("An unexpected error occurred")
      console.error("[v0] Error loading events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-dvh bg-white">
      <FadeIn>
        <div className="relative overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, #548cac 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            {/* Mobile: stacked layout */}
            <div className="lg:hidden pt-36 pb-10">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] text-gray-950">
                <EditableText textId="events-hero-title-1" page="events" section="hero">
                  Where Networks
                </EditableText>
                <br />
                <span className="text-[#548cac]">
                  <EditableText textId="events-hero-title-2" page="events" section="hero">
                    Meet Action
                  </EditableText>
                </span>
              </h1>
              <p className="text-base text-gray-600 leading-relaxed max-w-md">
                <EditableText textId="events-hero-description" page="events" section="hero" multiline>
                  Discover meaningful events that bring communities together and drive innovation in healthcare.
                </EditableText>
              </p>

              {/* Mobile events */}
              <div className="mt-10">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 ring-1 ring-red-200 rounded-xl text-red-700 text-sm font-medium">
                    {error}
                    <button
                      onClick={loadEvents}
                      className="ml-3 text-red-600 underline hover:text-red-800 transition-colors font-semibold"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-5">
                  Upcoming Events
                </h2>

                <div className="space-y-4">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
                  ) : currentEvents.length > 0 ? (
                    currentEvents
                      .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())
                      .map((event, index) => <EventCard key={event.id} event={event} index={index} />)
                  ) : (
                    <div className="text-center py-16 px-6 rounded-2xl bg-gray-50 ring-1 ring-gray-200">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#548cac]/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#548cac]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">
                        No upcoming events at the moment
                      </p>
                      <p className="text-sm text-gray-500 leading-6">
                        Check back soon for new events!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop: side-by-side layout */}
            <div className="hidden lg:flex lg:gap-16 xl:gap-20 min-h-dvh pt-40 pb-16">
              {/* Left column — sticky hero text */}
              <div className="lg:w-[36%] xl:w-[34%] shrink-0">
                <div className="sticky top-36">
                  <h1 className="text-5xl xl:text-6xl font-bold tracking-tighter mb-6 leading-[0.9] text-gray-950">
                    <EditableText textId="events-hero-title-1" page="events" section="hero">
                      Where Networks
                    </EditableText>
                    <br />
                    <span className="text-[#548cac]">
                      <EditableText textId="events-hero-title-2" page="events" section="hero">
                        Meet Action
                      </EditableText>
                    </span>
                  </h1>

                  <p className="text-[15px] text-gray-500 leading-relaxed max-w-sm mb-10">
                    <EditableText textId="events-hero-description" page="events" section="hero" multiline>
                      Discover meaningful events that bring communities together and drive innovation in healthcare.
                    </EditableText>
                  </p>

                  {/* Divider */}
                  <div className="w-10 h-px bg-gray-200 mb-6" />

                  {!isLoading && (
                    <div className="flex items-center gap-6 text-sm">
                      {currentEvents.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-gray-600 font-medium">{currentEvents.length} upcoming</span>
                        </div>
                      )}
                      {pastEvents.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-300" />
                          <span className="text-gray-400 font-medium">{pastEvents.length} past</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right column — scrollable event cards */}
              <div className="lg:flex-1 min-w-0">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 ring-1 ring-red-200 rounded-xl text-red-700 text-sm font-medium">
                    {error}
                    <button
                      onClick={loadEvents}
                      className="ml-3 text-red-600 underline hover:text-red-800 transition-colors font-semibold"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-400">
                    Upcoming Events
                  </h2>
                </div>

                <div className="space-y-5">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
                  ) : currentEvents.length > 0 ? (
                    currentEvents
                      .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())
                      .map((event, index) => <EventCard key={event.id} event={event} index={index} />)
                  ) : (
                    <div className="text-center py-16 px-6 rounded-2xl bg-gray-50 ring-1 ring-gray-200">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#548cac]/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#548cac]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">
                        No upcoming events at the moment
                      </p>
                      <p className="text-sm text-gray-500 leading-6">
                        Check back soon for new events!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isLoading && pastEvents.length > 0 && <PastEventsSection events={pastEvents} />}
      </FadeIn>

      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
    </div>
  )
}
