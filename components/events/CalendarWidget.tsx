"use client"

import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"
import { AIMLogo } from "../../public/AIMLogo"
import type { Event } from "../../types/event"
import { EventCard } from "./EventCard"

interface CalendarDay {
  date: Date
  events: Event[]
  isCurrentMonth: boolean
  isToday: boolean
}

interface CalendarWidgetProps {
  events?: Event[]
  onDateFilter?: (events: Event[]) => void
  onClearFilter?: () => void
  isMobile?: boolean
}

// Helper functions for calendar operations
const generateCalendarDays = (year: number, month: number): CalendarDay[] => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

  const days: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Add days from previous month to fill the beginning of the calendar
  // Only add if the month doesn't start on Sunday (startingDayOfWeek !== 0)
  if (startingDayOfWeek > 0) {
    // Get the last day of the previous month correctly
    const prevMonthLastDate = new Date(year, month, 0) // This gives us the last day of previous month
    const prevMonthDays = prevMonthLastDate.getDate()

    // Calculate how many days we need from previous month
    const daysNeeded = startingDayOfWeek

    // Add the days from previous month
    for (let i = daysNeeded; i > 0; i--) {
      const dayNumber = prevMonthDays - i + 1
      const date = new Date(year, month - 1, dayNumber)
      days.push({
        date,
        events: [],
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
      })
    }
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    days.push({
      date,
      events: [],
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime(),
    })
  }

  // Add days from next month to complete the grid (always 42 cells = 6 weeks)
  const totalCells = 42
  let nextMonthDay = 1
  while (days.length < totalCells) {
    const date = new Date(year, month + 1, nextMonthDay)
    days.push({
      date,
      events: [],
      isCurrentMonth: false,
      isToday: date.getTime() === today.getTime(),
    })
    nextMonthDay++
  }

  return days
}

const isEventUpcoming = (event: Event): boolean => {
  try {
    const eventDate = new Date(event.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return eventDate >= today
  } catch {
    return false
  }
}

const safeParseDate = (dateStr: string): Date | null => {
  try {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

export function CalendarWidget({ events = [], onDateFilter, onClearFilter, isMobile = false }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date | null>(null)
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [isClient, setIsClient] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const days = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth())

    // Populate each day with its events using client-side timezone
    const daysWithEvents = days.map((day) => {
      const dayString = day.date.toISOString().split("T")[0]

      // Filter events for this specific day that are upcoming (client-side check)
      const dayEvents = events.filter((event) => {
        if (!event.date) return false

        // Normalize the event date to compare with day (client-side)
        const eventDate = safeParseDate(event.date)
        if (!eventDate) return false

        const eventDateString = eventDate.toISOString().split("T")[0]
        return eventDateString === dayString && isEventUpcoming(event)
      })

      return {
        ...day,
        events: dayEvents,
      }
    })

    setCalendarDays(daysWithEvents)
  }, [currentDate, events, isClient])

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }



  const handleEventIndicatorClick = (day: CalendarDay) => {
    if (day.events.length > 0) {
      if (isMobile && day.events.length === 1) {
        // On mobile, open modal directly if only one event
        setSelectedEvent(day.events[0])
        setIsEventModalOpen(true)
      } else if (onDateFilter) {
        // Use filter for multiple events or desktop
        onDateFilter(day.events)
      }
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Count events for current month (client-side)
  const currentMonthEvents = isClient
    ? calendarDays.reduce((count, day) => {
      return count + (day.isCurrentMonth ? day.events.length : 0)
    }, 0)
    : 0



  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-64 bg-neutral-200 rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className="w-full relative">
      {/* Connected Calendar - Single Black and White Design */}
      <div className={cn(
        "bg-white border-2 border-black shadow-xl overflow-hidden",
        isMobile ? "rounded-lg" : ""
      )}>
        {/* Calendar Header with Navigation - Black and White */}
        <div className="p-4 bg-black text-white border-b-2 border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-2 tracking-tighter">
                <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              </h2>
              {isMobile && (
                <p className="text-xs text-gray-300 mb-2">
                  Tap on dates with events to view details • Scroll down for full event list
                </p>
              )}
              <div className="text-xs md:text-sm text-gray-300 flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                {currentMonthEvents} event{currentMonthEvents !== 1 ? "s" : ""} this month
                {calendarSelectedDate && (
                  <span className="text-gray-400">
                    • Filtered by {calendarSelectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                <button
                  onClick={goToToday}
                  className="text-xs px-3 py-1 bg-white text-black rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 font-medium touch-manipulation"
                >
                  Today
                </button>
                {calendarSelectedDate && (
                  <button
                    onClick={() => {
                      setCalendarSelectedDate(null)
                      if (onClearFilter) {
                        onClearFilter()
                      }
                    }}
                    className="text-xs px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-500 active:bg-gray-700 transition-all duration-200 font-medium touch-manipulation"
                  >
                    Clear Filter
                  </button>
                )}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="h-8 w-8 border border-white rounded-md hover:bg-white hover:text-black active:bg-gray-200 active:text-black flex items-center justify-center transition-all duration-200 touch-manipulation"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="h-8 w-8 border border-white rounded-md hover:bg-white hover:text-black active:bg-gray-200 active:text-black flex items-center justify-center transition-all duration-200 touch-manipulation"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* AIM Logo - Hide on mobile to save space */}
            <div className={cn("relative z-10 ml-4", isMobile && "flex")}>
              <AIMLogo variant="white" className="h-20 md:h-16 w-auto" />
            </div>
          </div>
        </div>

        {/* Day Names Header */}
        <div className="grid grid-cols-7 bg-gray-900 text-white border-b border-black">
          {dayNames.map((day) => (
            <div key={day} className="p-2 md:p-3 text-center text-xs md:text-sm font-bold border-r border-gray-700 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const hasEvents = day.events.length > 0
            const isSelected = calendarSelectedDate && day.date.toDateString() === calendarSelectedDate.toDateString()

            return (
              <div
                key={index}
                className={cn(
                  "p-2 border-r border-b border-black cursor-pointer transition-all duration-200 relative bg-white",
                  isMobile ? "min-h-[60px]" : "min-h-[50px]", // Larger touch targets on mobile
                  "hover:bg-gray-50 active:bg-gray-100", // Consistent hover states
                  !day.isCurrentMonth && "bg-gray-50 text-gray-400",
                  day.isToday && "bg-black text-white font-bold",
                  isSelected && "bg-gray-800 text-white",
                )}
                onClick={() => {
                  if (isSelected) {
                    // Clear selection if clicking on already selected date
                    setCalendarSelectedDate(null)
                    if (onClearFilter) {
                      onClearFilter()
                    }
                  } else {
                    setCalendarSelectedDate(day.date)
                    if (hasEvents) {
                      if (isMobile && day.events.length === 1) {
                        // On mobile, open modal directly if only one event
                        setSelectedEvent(day.events[0])
                        setIsEventModalOpen(true)
                      } else if (isMobile && day.events.length > 1) {
                        // On mobile with multiple events, still use filter but could show picker
                        if (onDateFilter) {
                          onDateFilter(day.events)
                        }
                      } else {
                        // Desktop behavior - always use filter
                        if (onDateFilter) {
                          onDateFilter(day.events)
                        }
                      }
                    }
                  }
                }}
              >
                {/* Day Number */}
                <div className="flex justify-start mb-1">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      day.isToday && "text-white font-bold",
                      !day.isCurrentMonth && "text-gray-400",
                      hasEvents && day.isCurrentMonth && "text-black font-bold",
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                </div>

                {/* Event Indicator - Black and White */}
                {hasEvents && (
                  <div className="flex justify-center mb-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEventIndicatorClick(day)
                      }}
                      className={cn(
                        "group relative touch-manipulation", // Better touch handling
                        isMobile && "animate-pulse" // Subtle pulse on mobile to indicate tappability
                      )}
                    >
                      {day.events.length === 1 ? (
                        // Single event - black dot (larger on mobile)
                        <div className={cn(
                          "bg-black rounded-full transition-all duration-200 group-hover:scale-125 group-active:scale-110",
                          isMobile ? "w-3 h-3" : "w-2 h-2"
                        )}>
                        </div>
                      ) : (
                        // Multiple events - black number badge (larger on mobile)
                        <div className={cn(
                          "bg-black text-white text-xs px-1.5 py-1 rounded-md transition-all duration-200 group-hover:scale-110 group-active:scale-95 font-bold text-center",
                          isMobile ? "min-w-[20px]" : "md:px-1 md:py-0.5 md:rounded-sm min-w-[16px]"
                        )}>
                          {day.events.length}
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Event Modal - Only render modal, not the card */}
      {isMobile && selectedEvent && isEventModalOpen && (
        <EventCard
          event={selectedEvent}
          index={0}
          isModalOpen={true}
          onModalClose={() => {
            setIsEventModalOpen(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </div>
  )
}
