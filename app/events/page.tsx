"use client"

import { useEffect, useState } from "react"
import { getEventsAction } from "../../app/actions/events"
import { CalendarWidget } from "../../components/events/CalendarWidget"
import { EventCard } from "../../components/events/EventCard"
import { CalendarSkeleton, EventCardSkeleton } from "../../components/events/LoadingSkeleton"
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
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning"; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  })

  // Fix hydration by ensuring component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load events on component mount
  useEffect(() => {
    if (mounted) {
      loadEvents()
    }
  }, [mounted])

  // Filter events on client side when allEvents changes
  useEffect(() => {
    if (mounted && allEvents.length > 0) {
      // Client-side filtering using local timezone
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

  // Calendar filter handlers
  const handleDateFilter = (events: Event[]) => {
    setFilteredEvents(events)
  }

  const handleClearFilter = () => {
    setFilteredEvents(null)
  }



  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FadeIn>
        {/* Hero */}
        <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-linear-to-br from-slate-900 via-neutral-950 to-black text-white overflow-hidden">
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* Accent glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#548cac]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#4f4f2c]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-4 sm:px-6 py-8 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-gray-300 ring-1 ring-inset ring-white/20 mb-6 tracking-wide uppercase">
                Community Events
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-[0.95]">
                <span className="text-white">
                  <EditableText textId="events-hero-title-1" page="events" section="hero">
                    Where Networks
                  </EditableText>
                </span>
                <br />
                <span className="bg-linear-to-r from-[#548cac] to-[#7ab8d4] bg-clip-text text-transparent">
                  <EditableText textId="events-hero-title-2" page="events" section="hero">
                    Meet Action
                  </EditableText>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 leading-7 max-w-2xl mx-auto">
                <EditableText textId="events-hero-description" page="events" section="hero" multiline>
                  Discover meaningful events that bring communities together and drive innovation in healthcare.
                </EditableText>
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium text-center">
              {error}
              <button
                onClick={loadEvents}
                className="ml-3 text-red-600 underline hover:text-red-800 transition-colors duration-200 font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Mobile Calendar - Full Width (Above Events) */}
          <div className="block lg:hidden mb-8">
            {isLoading ? (
              <CalendarSkeleton />
            ) : (
              <CalendarWidget
                events={allEvents}
                onDateFilter={handleDateFilter}
                onClearFilter={handleClearFilter}
                isMobile={true}
              />
            )}
          </div>

          <div className="lg:flex lg:gap-8">
            {/* Left Side - Event List */}
            <div className="lg:flex-1">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
                      {filteredEvents ? 'Filtered Events' : 'Upcoming Events'}
                    </h2>
                    {filteredEvents && (
                      <p className="text-sm text-gray-500 mt-1.5 leading-6 font-medium">
                        Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} for selected date
                      </p>
                    )}
                  </div>
                  {filteredEvents && (
                    <button
                      onClick={handleClearFilter}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                    >
                      Show All Events
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
                ) : (() => {
                  const eventsToShow = filteredEvents || currentEvents
                  return eventsToShow.length > 0 ? (
                    eventsToShow
                      .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())
                      .map((event, index) => <EventCard key={event.id} event={event} index={index} />)
                  ) : (
                    <div className="text-center py-20 px-6 rounded-2xl bg-white ring-1 ring-gray-200">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#548cac]/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#548cac]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-1.5 tracking-tight">
                        {filteredEvents ? 'No events found for selected date' : 'No upcoming events at the moment'}
                      </p>
                      <p className="text-sm text-gray-500 leading-6 font-medium">
                        {filteredEvents ? 'Try selecting a different date.' : 'Check back soon for new events!'}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Right Side - Calendar (Desktop Only) */}
            <div className="hidden lg:block lg:w-80 space-y-6 shrink-0 sticky top-24 self-start">
              {isLoading ? (
                <CalendarSkeleton />
              ) : (
                <>
                  <CalendarWidget
                    events={allEvents}
                    onDateFilter={handleDateFilter}
                    onClearFilter={handleClearFilter}
                    isMobile={false}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {!isLoading && pastEvents.length > 0 && <PastEventsSection events={pastEvents} />}
      </FadeIn>

      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
    </div>
  )
}
