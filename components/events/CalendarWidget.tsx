"use client"

import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"
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
        <div className="h-64 bg-gray-100 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="w-full relative">
      {/* Modern Calendar Design */}
      <div className={cn(
        "bg-white border border-gray-200 shadow-lg overflow-hidden",
        isMobile ? "rounded-2xl" : "rounded-2xl"
      )}>
        {/* Calendar Header with Navigation */}
        <div className="p-5 bg-gray-950 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {currentMonthEvents} event{currentMonthEvents !== 1 ? "s" : ""} this month
                  </p>
                </div>
              </div>
              {isMobile && (
                <p className="text-xs text-gray-400 mb-3 leading-5">
                  Tap on dates with events to view details
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={goToToday}
                  className="text-sm px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 font-medium touch-manipulation"
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
                    className="text-sm px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:bg-gray-800 transition-all duration-200 font-medium touch-manipulation"
                  >
                    Clear Filter
                  </button>
                )}
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="h-9 w-9 bg-white/10 rounded-lg hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-all duration-200 touch-manipulation"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="h-9 w-9 bg-white/10 rounded-lg hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-all duration-200 touch-manipulation"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Day Names Header */}
        <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-200">
          {dayNames.map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 bg-white">
          {calendarDays.map((day, index) => {
            const hasEvents = day.events.length > 0
            const isSelected = calendarSelectedDate && day.date.toDateString() === calendarSelectedDate.toDateString()

            return (
              <div
                key={index}
                className={cn(
                  "p-2 border-r border-b border-gray-100 cursor-pointer transition-all duration-200 relative",
                  isMobile ? "min-h-[64px]" : "min-h-[56px]",
                  "hover:bg-gray-50 active:bg-gray-100",
                  !day.isCurrentMonth && "bg-gray-50/50",
                  day.isToday && "bg-gray-900 text-white",
                  isSelected && !day.isToday && "bg-blue-50 ring-2 ring-blue-500 ring-inset",
                )}
                onClick={() => {
                  if (isSelected) {
                    setCalendarSelectedDate(null)
                    if (onClearFilter) {
                      onClearFilter()
                    }
                  } else {
                    setCalendarSelectedDate(day.date)
                    if (hasEvents) {
                      if (isMobile && day.events.length === 1) {
                        setSelectedEvent(day.events[0])
                        setIsEventModalOpen(true)
                      } else if (isMobile && day.events.length > 1) {
                        if (onDateFilter) {
                          onDateFilter(day.events)
                        }
                      } else {
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
                      day.isToday && "text-white font-semibold",
                      !day.isCurrentMonth && "text-gray-300",
                      hasEvents && day.isCurrentMonth && !day.isToday && "text-gray-900 font-semibold",
                      !hasEvents && day.isCurrentMonth && !day.isToday && "text-gray-700",
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                </div>

                {/* Event Indicator */}
                {hasEvents && (
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEventIndicatorClick(day)
                      }}
                      className="group relative touch-manipulation"
                    >
                      {day.events.length === 1 ? (
                        <div className={cn(
                          "rounded-full transition-all duration-200 group-hover:scale-125 group-active:scale-110",
                          day.isToday ? "bg-white" : "bg-blue-600",
                          isMobile ? "w-2.5 h-2.5" : "w-2 h-2"
                        )} />
                      ) : (
                        <div className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full transition-all duration-200 group-hover:scale-110 group-active:scale-95 font-semibold text-center min-w-[20px]",
                          day.isToday ? "bg-white text-gray-900" : "bg-blue-600 text-white"
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
