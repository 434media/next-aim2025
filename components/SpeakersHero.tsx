"use client"

import { Star } from "lucide-react"
import { EditableText } from "./admin/EditableText"

export function SpeakersHero() {
    return (
        <div className="mx-auto max-w-5xl text-center mb-16 md:mb-20">
            <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center rounded-full bg-sky-100 px-6 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-200 backdrop-blur-sm">
                    <Star className="mr-2 h-4 w-4" />
                    <EditableText
                        textId="speakers-badge"
                        page="speakers"
                        section="hero"
                    >
                        AIM&apos;25 Speaker Lineup
                    </EditableText>
                </div>
            </div>

            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-sky-700 bg-clip-text text-transparent">
                    <EditableText
                        textId="speakers-title-highlight"
                        page="speakers"
                        section="hero"
                    >
                        Leaders
                    </EditableText>
                </span>
                <span className="text-neutral-800">
                    {" "}
                    <EditableText
                        textId="speakers-title-suffix"
                        page="speakers"
                        section="hero"
                    >
                        Shaping Tomorrow
                    </EditableText>
                </span>
            </h1>

            <div className="mx-auto mb-12 max-w-3xl text-lg sm:text-xl md:text-2xl text-neutral-700 leading-relaxed">
                <p>
                    <EditableText
                        textId="speakers-description"
                        page="speakers"
                        section="hero"
                        multiline
                    >
                        Our speakers represent the forefront of medical advancement across military defense and civilian sectors.
                    </EditableText>
                </p>
            </div>
        </div>
    )
}
