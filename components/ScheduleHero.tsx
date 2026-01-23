"use client"

import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { EditableText } from "./admin/EditableText"

export function ScheduleHero() {
    return (
        <div className="mx-auto max-w-5xl text-center mb-16 sm:mb-20">
            <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center rounded-full bg-[#548cac]/10 px-6 py-2 text-sm font-medium text-[#548cac] ring-1 ring-[#548cac]/20 backdrop-blur-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <EditableText
                        textId="schedule-badge"
                        page="schedule"
                        section="hero"
                    >
                        Interactive Summit Schedule
                    </EditableText>
                </div>
            </div>

            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-white to-[#548cac] bg-clip-text text-transparent">
                    <EditableText
                        textId="schedule-title"
                        page="schedule"
                        section="hero"
                    >
                        Your Summit
                    </EditableText>
                </span>
                <br />
                <span className="text-white/90">
                    <EditableText
                        textId="schedule-subtitle"
                        page="schedule"
                        section="hero"
                    >
                        Journey Awaits
                    </EditableText>
                </span>
            </h1>

            {/* Enhanced Event Info */}
            <div className="mx-auto mb-8 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
                <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                    <Calendar className="h-6 w-6 mr-3 text-[#548cac] flex-shrink-0" />
                    <div className="text-left">
                        <div className="text-lg font-semibold text-white">
                            <EditableText
                                textId="schedule-event-date"
                                page="schedule"
                                section="hero"
                            >
                                June 16, 2025
                            </EditableText>
                        </div>
                        <div className="text-sm text-white/70">
                            <EditableText
                                textId="schedule-event-date-label"
                                page="schedule"
                                section="hero"
                            >
                                One Day of Innovation
                            </EditableText>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                    <MapPin className="h-6 w-6 mr-3 text-[#548cac] flex-shrink-0" />
                    <div className="text-left">
                        <div className="text-lg font-semibold text-white">
                            <EditableText
                                textId="schedule-event-location"
                                page="schedule"
                                section="hero"
                            >
                                San Antonio, TX
                            </EditableText>
                        </div>
                        <div className="text-sm text-white/70">
                            <EditableText
                                textId="schedule-event-venue"
                                page="schedule"
                                section="hero"
                            >
                                Henry B. González Convention Center
                            </EditableText>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mb-12 max-w-3xl text-lg sm:text-xl text-white/80 leading-relaxed">
                <p>
                    <EditableText
                        textId="schedule-description"
                        page="schedule"
                        section="hero"
                        multiline
                    >
                        Navigate through our comprehensive agenda featuring keynote presentations, interactive panels, hands-on
                        workshops, and exclusive networking opportunities. Plan your personalized summit experience with our
                        interactive schedule below.
                    </EditableText>
                </p>
            </div>

            {/* Schedule Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <Clock className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                        <div className="text-xl font-bold text-white mb-2">
                            <EditableText
                                textId="schedule-stat-sessions"
                                page="schedule"
                                section="stats"
                            >
                                20+ Sessions
                            </EditableText>
                        </div>
                        <div className="text-sm text-white/70">
                            <EditableText
                                textId="schedule-stat-sessions-label"
                                page="schedule"
                                section="stats"
                            >
                                Keynotes, panels, and workshops
                            </EditableText>
                        </div>
                    </div>
                </div>

                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <Users className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                        <div className="text-xl font-bold text-white mb-2">
                            <EditableText
                                textId="schedule-stat-tracks"
                                page="schedule"
                                section="stats"
                            >
                                5+ Tracks
                            </EditableText>
                        </div>
                        <div className="text-sm text-white/70">
                            <EditableText
                                textId="schedule-stat-tracks-label"
                                page="schedule"
                                section="stats"
                            >
                                Specialized content streams
                            </EditableText>
                        </div>
                    </div>
                </div>

                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <Calendar className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                        <div className="text-xl font-bold text-white mb-2">
                            <EditableText
                                textId="schedule-stat-networking"
                                page="schedule"
                                section="stats"
                            >
                                All-Day Networking
                            </EditableText>
                        </div>
                        <div className="text-sm text-white/70">
                            <EditableText
                                textId="schedule-stat-networking-label"
                                page="schedule"
                                section="stats"
                            >
                                Connect with industry leaders
                            </EditableText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
