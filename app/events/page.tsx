"use client"

import { useEffect, useState } from "react"
import { getEventsAction } from "../../app/actions/events"
import { CalendarWidget } from "../../components/events/CalendarWidget"
import { EventCard } from "../../components/events/EventCard"
import { CalendarSkeleton, EventCardSkeleton } from "../../components/events/LoadingSkeleton"
import { PastEventsSection } from "../../components/events/PastEventsSection"
import { Toast } from "../../components/events/Toast"
import { VideoWidget } from "../../components/events/VideoWidget"
import { FadeIn } from "../../components/FadeIn"
import { isEventUpcoming } from "../../lib/event-utils"
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
    <div className="min-h-screen bg-white">
      <FadeIn>
        <div className="relative pt-28 pb-16 md:pt-40 md:pb-20 bg-black text-white overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <h4 className="text-white font-medium text-sm">
                  <span>Build connections that matter</span>
                </h4>
              </div>

              <div className="mb-6 sm:mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 text-balance">
                  <span className="text-white">Where Networks</span>
                  <br />
                  <span className="text-white">Meet Action</span>
                </h1>
              </div>

              <div className="mb-8 sm:mb-10">
                <p className="text-xl text-gray-300 leading-relaxed mb-2 text-pretty">
                  Discover meaningful events that bring communities together.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-white relative">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
              {error}
              <button
                onClick={loadEvents}
                className="ml-3 text-red-600 underline hover:text-red-800 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="lg:flex lg:gap-6">
            {/* Left Side - Event List */}
            <div className="lg:flex-1">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {filteredEvents ? 'Filtered Events' : 'Upcoming Events'}
                </h2>
                {filteredEvents && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} for selected date
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={i} />)
                ) : (() => {
                  const eventsToShow = filteredEvents || currentEvents
                  return eventsToShow.length > 0 ? (
                    eventsToShow
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((event, index) => <EventCard key={event.id} event={event} index={index} />)
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-600">
                        {filteredEvents ? 'No events found for selected date.' : 'No upcoming events at the moment.'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {filteredEvents ? 'Try selecting a different date.' : 'Check back soon for new events!'}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Right Side - Calendar & Video */}
            <div className="hidden lg:block lg:w-80 space-y-6 flex-shrink-0 sticky top-24 self-start">
              {isLoading ? (
                <CalendarSkeleton />
              ) : (
                <>
                  <CalendarWidget
                    events={allEvents}
                    onDateFilter={handleDateFilter}
                    onClearFilter={handleClearFilter}
                  />
                  <VideoWidget />
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
