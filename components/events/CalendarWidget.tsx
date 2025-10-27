"use client"

import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarEventLine } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import type { Event } from "../../types/event"

interface CalendarWidgetProps {
  events?: Event[]
  onDateFilter?: (events: Event[]) => void
  onClearFilter?: () => void
}

export function CalendarWidget({ events = [], onDateFilter, onClearFilter }: CalendarWidgetProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

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

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Helper function to format date for comparison (timezone-safe)
  const formatDateString = (day: number) => {
    return `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  // Helper function to check if a specific date has events (timezone-safe)
  const getEventsForDay = (day: number) => {
    const dateStr = formatDateString(day)
    // Direct string comparison to avoid timezone issues
    return events.filter(event => {
      // Ensure we're comparing the same date format (YYYY-MM-DD)
      const eventDateStr = event.date.split('T')[0] // Remove time portion if present
      return eventDateStr === dateStr
    })
  }

  // Handle date click for filtering
  const handleDateClick = (day: number) => {
    const dateStr = formatDateString(day)
    const dayEvents = getEventsForDay(day)

    if (dayEvents.length > 0) {
      if (selectedDate === dateStr) {
        // Deselect and clear filter
        setSelectedDate(null)
        onClearFilter?.()
      } else {
        // Select new date and filter events
        setSelectedDate(dateStr)
        onDateFilter?.(dayEvents)
      }
    }
  }

  const today = new Date()
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl p-6 border border-gray-200/50 shadow-lg backdrop-blur-sm"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 50%, #ffffff 100%)',
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Header with month navigation */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <RiCalendarEventLine className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-white/70 rounded-full p-1 backdrop-blur-sm border border-gray-200/50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={previousMonth}
            className="p-2 hover:bg-blue-50 rounded-full transition-all duration-200"
            aria-label="Previous month"
          >
            <RiArrowLeftSLine className="w-4 h-4 text-gray-600" />
          </motion.button>
          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mx-1" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 hover:bg-blue-50 rounded-full transition-all duration-200"
            aria-label="Next month"
          >
            <RiArrowRightSLine className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative line */}
      <div className="mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
          <motion.div
            key={i}
            className="text-center text-xs font-semibold text-gray-500 pb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.05) }}
          >
            {day}
          </motion.div>
        ))}

        {/* Empty cells for days before month starts */}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Calendar days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          const dateStr = formatDateString(day)
          const isToday = isCurrentMonth && day === today.getDate()
          const dayEvents = getEventsForDay(day)
          const hasEvent = dayEvents.length > 0
          const isSelected = selectedDate === dateStr

          return (
            <motion.div
              key={day}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6 + ((i % 7) * 0.05) + (Math.floor(i / 7) * 0.1),
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <motion.button
                whileHover={{ scale: hasEvent ? 1.08 : 1.02, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(day)}
                disabled={!hasEvent}
                className={`
                  w-full aspect-square flex items-center justify-center text-sm font-medium rounded-xl
                  transition-all duration-300 ease-out relative overflow-hidden
                  ${isToday
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : isSelected
                      ? "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md"
                      : hasEvent
                        ? "bg-white text-gray-900 border border-blue-200/60 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm cursor-pointer"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                  }
                `}
                title={hasEvent ? `${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''} - Click to filter` : undefined}
              >
                {/* Subtle gradient overlay for interactive days */}
                {hasEvent && !isToday && !isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}

                <span className="relative z-10">{day}</span>
              </motion.button>

              {/* Event indicator dot - centered below the date */}
              <AnimatePresence>
                {hasEvent && !isToday && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.8 + (i * 0.02), type: "spring", stiffness: 400 }}
                    className={`
                      absolute bottom-1 left-1/2 transform -translate-x-1/2
                      w-1.5 h-1.5 rounded-full
                      ${isSelected
                        ? "bg-white shadow-sm"
                        : "bg-gradient-to-r from-blue-500 to-blue-600"
                      }
                    `}
                  />
                )}
              </AnimatePresence>

              {/* Multi-event indicator */}
              {dayEvents.length > 1 && !isToday && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + (i * 0.02) }}
                  className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Filter indicator */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 pt-4 border-t border-gradient-to-r from-transparent via-blue-200 to-transparent"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                <span className="text-sm text-gray-600 font-medium">
                  Showing events for {(() => {
                    // Parse date safely without timezone issues
                    const [year, month, day] = selectedDate.split('-').map(Number)
                    const date = new Date(year, month - 1, day) // Create date in local timezone
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })
                  })()}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedDate(null)
                  onClearFilter?.()
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
              >
                Clear filter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
