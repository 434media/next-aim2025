"use client"

import { useEffect, useState } from "react"
import { getEventsAction } from "../../app/actions/events"
import { CalendarWidget } from "../../components/events/CalendarWidget"
import { EventCard } from "../../components/events/EventCard"
import { CalendarSkeleton, EventCardSkeleton } from "../../components/events/LoadingSkeleton"
import { PastEventsSection } from "../../components/events/PastEventsSection"
import { Toast } from "../../components/events/Toast"

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
        <div className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gray-950 text-white overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 px-4 sm:px-6 py-8 md:py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center">


              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
                <span className="text-white">Where Networks</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Meet Action</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Discover meaningful events that bring communities together and drive innovation in healthcare.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white relative">
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
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                      {filteredEvents ? 'Filtered Events' : 'Upcoming Events'}
                    </h2>
                    {filteredEvents && (
                      <p className="text-sm text-gray-500 mt-2 leading-6">
                        Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} for selected date
                      </p>
                    )}
                  </div>
                  {filteredEvents && (
                    <button
                      onClick={handleClearFilter}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Show All Events
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={i} />)
                ) : (() => {
                  const eventsToShow = filteredEvents || currentEvents
                  return eventsToShow.length > 0 ? (
                    eventsToShow
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((event, index) => <EventCard key={event.id} event={event} index={index} />)
                  ) : (
                    <div className="text-center py-16 px-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {filteredEvents ? 'No events found for selected date' : 'No upcoming events at the moment'}
                      </p>
                      <p className="text-sm text-gray-500 leading-6">
                        {filteredEvents ? 'Try selecting a different date.' : 'Check back soon for new events!'}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Right Side - Calendar (Desktop Only) */}
            <div className="hidden lg:block lg:w-80 space-y-6 flex-shrink-0 sticky top-24 self-start">
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
