"use client"

import { Calendar, ChevronDown, ChevronUp, Clock, MapPin, Users } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { getTagColor } from "../../lib/tag-colors"
import type { Event } from "../../types/event"

interface PastEventsSectionProps {
  events: Event[]
}

// Format date from YYYY-MM-DD to "Month Day, Year" (timezone-safe)
function formatEventDate(dateString: string): string {
  try {
    const cleanDateStr = dateString.split('T')[0]
    const [year, month, day] = cleanDateStr.split('-').map(Number)
    if (!year || !month || !day) return dateString
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Format time to 12-hour format
function formatEventTime(timeString: string): string {
  if (!timeString) return ""
  try {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  } catch {
    return timeString
  }
}

export function PastEventsSection({ events }: PastEventsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 pt-10 border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 mb-8 text-gray-900 hover:text-gray-600 transition-colors group"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Past Events</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{events.length}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 group-hover:-translate-y-0.5 transition-transform" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:translate-y-0.5 transition-transform" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:bg-gray-100/50 transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {event.url ? (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors block mb-1"
                        >
                          {event.title}
                        </a>
                      ) : (
                        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-1">{event.title}</h3>
                      )}

                      {event.description && (
                        <p className="text-sm text-gray-500 line-clamp-1 leading-5 mb-3" style={{ maxWidth: '60ch' }}>
                          {event.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatEventTime(event.time)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate max-w-[200px]">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span>{event.organizer}</span>
                        </div>
                      </div>
                    </div>

                    {event.tags && (() => {
                      const parsedTags = event.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
                      return parsedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 md:justify-end md:max-w-[200px]">
                          {parsedTags.slice(0, 3).map((tag) => (
                            <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                              {tag}
                            </span>
                          ))}
                          {parsedTags.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                              +{parsedTags.length - 3}
                            </span>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
