"use client"

import { RiCalendarLine, RiCloseLine, RiExternalLinkLine, RiMapPinLine, RiTimeLine } from "@remixicon/react"
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

export function EventCard({ event, index, isModalOpen: externalModalOpen, onModalClose }: EventCardProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false)

  // Use external modal control if provided, otherwise use internal state
  const isModalOpen = externalModalOpen !== undefined ? externalModalOpen : internalModalOpen

  // Debug logging for EventCard image rendering
  if (process.env.NODE_ENV === 'development' && index === 0) {
    console.log(`[EventCard Debug] First event image:`, {
      eventTitle: event.title,
      hasImageUrl: !!event.image_url,
      imageUrl: event.image_url,
      imageUrlLength: event.image_url?.length || 0
    })
  }

  return (
    <>
      {/* Only render card if not using external modal control */}
      {externalModalOpen === undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
          onClick={() => setInternalModalOpen(true)}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 min-w-0">
              {event.event_url ? (
                <a
                  href={event.event_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold mb-3 leading-tight text-gray-900 hover:text-blue-600 transition-colors block"
                >
                  {event.title}
                </a>
              ) : (
                <h3 className="text-xl font-bold mb-3 leading-tight text-gray-900">{event.title}</h3>
              )}

              {event.description && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
                    style={{ maxWidth: '65ch' }}>
                    {event.description}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <RiCalendarLine className="w-4 h-4" />
                <span className="font-semibold">{formatEventDate(event.date)}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <RiTimeLine className="w-4 h-4" />
                <span className="text-sm">{event.time}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs">👥</span>
                </div>
                <span>By {event.organizer}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <RiMapPinLine className="w-4 h-4" />
                <span>{event.location}</span>
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
            </div>

            <div className="md:w-[460px] w-full h-auto md:aspect-[16/9] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
              {event.image_url ? (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log(`[EventCard] Image failed to load:`, event.image_url);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show placeholder instead of hiding container
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs';
                    placeholder.textContent = 'Image not available';
                    target.parentElement!.appendChild(placeholder);
                  }}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  No image
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
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                  <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                  <button
                    onClick={() => {
                      if (onModalClose) {
                        onModalClose()
                      } else {
                        setInternalModalOpen(false)
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <RiCloseLine className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Event Image */}
                  {event.image_url && (
                    <div className="mb-6 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={event.image_url}
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
                  <div className="grid gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <RiCalendarLine className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="font-semibold text-gray-900">{formatEventDate(event.date)}</span>
                        <span className="text-gray-600 ml-2">at {event.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RiMapPinLine className="w-5 h-5 text-gray-600 mt-0.5" />
                      <span className="text-gray-900">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs">👥</span>
                      </div>
                      <span className="text-gray-900">Organized by {event.organizer}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {event.description && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">About this event</h3>
                      <div style={{ maxWidth: '70ch' }}>
                        <p className="text-gray-700 leading-relaxed text-base">{event.description}</p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <span key={tag} className={`px-3 py-1 rounded-full text-sm font-medium border ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    {event.event_url && (
                      <a
                        href={event.event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        <RiExternalLinkLine className="w-4 h-4" />
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
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
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
