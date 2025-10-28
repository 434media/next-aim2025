"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiCalendarLine, RiTimeLine, RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react"
import type { Event } from "../../types/event"
import { getTagColor } from "../../lib/tag-colors"

interface PastEventsSectionProps {
  events: Event[]
}

export function PastEventsSection({ events }: PastEventsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12 pt-8 border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 mb-6 text-gray-900 hover:text-blue-600 transition-colors group"
      >
        <h2 className="text-2xl font-bold">Past Events ({events.length})</h2>
        {isExpanded ? (
          <RiArrowUpSLine className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
        ) : (
          <RiArrowDownSLine className="w-6 h-6 group-hover:translate-y-[2px] transition-transform" />
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
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  {event.event_url ? (
                    <a
                      href={event.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors block"
                    >
                      {event.title}
                    </a>
                  ) : (
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{event.title}</h3>
                  )}

                  {event.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>}

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <RiCalendarLine className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <RiTimeLine className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <RiMapPinLine className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-[10px]">👥</span>
                    </div>
                    <span>By {event.organizer}</span>
                  </div>

                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-1 rounded text-xs font-medium border ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
