"use client"

import { Calendar, Clock, ExternalLink, MapPin, Users, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { getTagColor } from "../../lib/tag-colors"
import type { Event } from "../../types/event"

interface EventCardProps {
  event: Event
  index: number
  isModalOpen?: boolean
  onModalClose?: () => void
}

// Format date from YYYY-MM-DD to "Month Day, Year" (timezone-safe)
function formatEventDate(dateString: string): string {
  try {
    // Parse date string manually to avoid timezone issues
    const cleanDateStr = dateString.split('T')[0] // Remove time portion if present
    const [year, month, day] = cleanDateStr.split('-').map(Number)

    if (!year || !month || !day) {
      return dateString
    }

    // Create date in local timezone
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString // fallback to original string if parsing fails
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

export function EventCard({ event, index, isModalOpen: externalModalOpen, onModalClose }: EventCardProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false)

  // Use external modal control if provided, otherwise use internal state
  const isModalOpen = externalModalOpen !== undefined ? externalModalOpen : internalModalOpen

  // Parse tags from comma-separated string to array
  const parsedTags = event.tags ? event.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : []

  return (
    <>
      {/* Only render card if not using external modal control */}
      {externalModalOpen === undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 cursor-pointer"
          onClick={() => setInternalModalOpen(true)}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 min-w-0">
              {event.url ? (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xl font-semibold leading-7 text-gray-900 hover:text-blue-600 transition-colors block mb-2"
                >
                  {event.title}
                </a>
              ) : (
                <h3 className="text-xl font-semibold leading-7 text-gray-900 mb-2">{event.title}</h3>
              )}

              {event.description && (
                <p className="text-sm text-gray-600 line-clamp-2 leading-6 mb-4" style={{ maxWidth: '60ch' }}>
                  {event.description}
                </p>
              )}

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{formatEventDate(event.date)}</span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm">{formatEventTime(event.time)}</span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm leading-5">{event.location}</span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-600">
                  <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm">By {event.organizer}</span>
                </div>
              </div>

              {parsedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {parsedTags.map((tag) => (
                    <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-[320px] lg:w-[400px] w-full aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center';
                    placeholder.innerHTML = '<svg class="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
                    target.parentElement!.appendChild(placeholder);
                  }}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (onModalClose) {
                  onModalClose()
                } else {
                  setInternalModalOpen(false)
                }
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl">
                  <h2 className="text-xl font-semibold text-gray-900 leading-7 pr-4">{event.title}</h2>
                  <button
                    onClick={() => {
                      if (onModalClose) {
                        onModalClose()
                      } else {
                        setInternalModalOpen(false)
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Event Image */}
                  {event.image && (
                    <div className="mb-6 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.parentElement!.style.display = 'none';
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Event Details Grid */}
                  <div className="grid gap-3 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-900">{formatEventDate(event.date)}</span>
                        <span className="text-gray-500 ml-2">at {formatEventTime(event.time)}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <span className="text-gray-900 leading-6">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-900">Organized by <span className="font-medium">{event.organizer}</span></span>
                    </div>
                  </div>

                  {/* Description */}
                  {event.description && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">About this event</h3>
                      <p className="text-gray-700 leading-7 text-base" style={{ maxWidth: '65ch' }}>{event.description}</p>
                    </div>
                  )}

                  {/* Tags */}
                  {parsedTags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {parsedTags.map((tag) => (
                          <span key={tag} className={`px-3 py-1.5 rounded-full text-sm font-medium ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Event Details
                      </a>
                    )}
                    <button
                      onClick={() => {
                        if (onModalClose) {
                          onModalClose()
                        } else {
                          setInternalModalOpen(false)
                        }
                      }}
                      className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
