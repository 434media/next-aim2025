"use client"

import { ArrowUpRight, Calendar, Clock, ExternalLink, MapPin, Users, X } from "lucide-react"
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

// Format date to short form for the date badge
function formatDateParts(dateString: string): { month: string; day: string } {
  try {
    const cleanDateStr = dateString.split('T')[0]
    const [year, month, day] = cleanDateStr.split('-').map(Number)
    if (!year || !month || !day) return { month: "---", day: "--" }
    const date = new Date(year, month - 1, day)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: String(day),
    }
  } catch {
    return { month: "---", day: "--" }
  }
}

// Format time to 12-hour format with CST timezone
function formatEventTime(timeString: string): string {
  if (!timeString) return ""
  try {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm} CST`
  } catch {
    return timeString
  }
}

export function EventCard({ event, index, isModalOpen: externalModalOpen, onModalClose }: EventCardProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false)
  const isModalOpen = externalModalOpen !== undefined ? externalModalOpen : internalModalOpen
  const parsedTags = event.tags ? event.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : []
  const dateParts = formatDateParts(event.date)

  return (
    <>
      {externalModalOpen === undefined && (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          className="group relative bg-white rounded-2xl ring-1 ring-gray-200 hover:ring-[#548cac]/40 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={() => setInternalModalOpen(true)}
        >
          {/* Image header */}
          {event.image && (
            <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100">
              <img
                src={event.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="p-5 sm:p-6">
            <div className="flex gap-4">
              {/* Date badge */}
              <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[#548cac]/10 shrink-0">
                <span className="text-[10px] font-bold tracking-widest text-[#548cac] leading-none">{dateParts.month}</span>
                <span className="text-xl font-bold text-[#548cac] leading-tight">{dateParts.day}</span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Category pill */}
                {event.category && (
                  <span className="inline-flex items-center rounded-full bg-[#548cac]/10 px-2.5 py-0.5 text-xs font-semibold text-[#548cac] ring-1 ring-inset ring-[#548cac]/20 mb-2.5">
                    {event.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold leading-snug tracking-tight text-gray-900 mb-1.5 line-clamp-2">
                  {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                  <p className="text-sm text-gray-600 leading-6 line-clamp-2 mb-4" style={{ maxWidth: '55ch' }}>
                    {event.description}
                  </p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#548cac]" />
                    <span className="font-medium text-gray-700">{formatEventDate(event.date)}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#548cac]" />
                      <span>{formatEventTime(event.time)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#548cac]" />
                    <span className="truncate max-w-48">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#548cac]" />
                    <span>{event.organizer}</span>
                  </div>
                </div>

                {/* Tags */}
                {parsedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {parsedTags.map((tag) => (
                      <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow indicator */}
              <div className="hidden sm:flex items-start pt-1">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#548cac] transition-colors" />
              </div>
            </div>
          </div>
        </motion.article>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (onModalClose) onModalClose()
                else setInternalModalOpen(false)
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-gray-200"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
                  <div className="flex-1 min-w-0 pr-4">
                    {event.category && (
                      <span className="inline-flex items-center rounded-full bg-[#548cac]/10 px-2.5 py-0.5 text-xs font-semibold text-[#548cac] ring-1 ring-inset ring-[#548cac]/20 mb-2">
                        {event.category}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-gray-900 leading-7 tracking-tight">{event.title}</h2>
                  </div>
                  <button
                    onClick={() => {
                      if (onModalClose) onModalClose()
                      else setInternalModalOpen(false)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {event.image && (
                    <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="grid gap-2.5 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Calendar className="w-5 h-5 text-[#548cac]" />
                      <div>
                        <span className="font-semibold text-gray-900">{formatEventDate(event.date)}</span>
                        {event.time && <span className="text-gray-500 ml-2">at {formatEventTime(event.time)}</span>}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <MapPin className="w-5 h-5 text-[#548cac] mt-0.5" />
                      <span className="text-gray-900 leading-6">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Users className="w-5 h-5 text-[#548cac]" />
                      <span className="text-gray-900">Organized by <span className="font-semibold">{event.organizer}</span></span>
                    </div>
                  </div>

                  {event.description && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">About this event</h3>
                      <p className="text-gray-700 leading-7 text-[15px]" style={{ maxWidth: '65ch' }}>{event.description}</p>
                    </div>
                  )}

                  {parsedTags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {parsedTags.map((tag) => (
                          <span key={tag} className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#548cac] text-white px-6 py-3 rounded-xl hover:bg-[#548cac]/90 transition-colors font-medium text-sm shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Event Details
                      </a>
                    )}
                    <button
                      onClick={() => {
                        if (onModalClose) onModalClose()
                        else setInternalModalOpen(false)
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
