"use client"

import { EditableText } from "../admin/EditableText"

interface PageHeroProps {
    badge?: string
    titlePrefix?: string
    titleHighlight: string
    titleSuffix?: string
    description: string
    textIdPrefix: string
    page: string
}

export function EditablePageHero({
    badge,
    titlePrefix,
    titleHighlight,
    titleSuffix,
    description,
    textIdPrefix,
    page,
}: PageHeroProps) {
    return (
        <>
            {badge && (
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-sky-100 px-6 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-200 backdrop-blur-sm">
                        <EditableText
                            textId={`${textIdPrefix}-badge`}
                            page={page}
                            section="hero"
                        >
                            {badge}
                        </EditableText>
                    </div>
                </div>
            )}

            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-tight tracking-tight">
                {titlePrefix && (
                    <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-sky-700 bg-clip-text text-transparent">
                        <EditableText
                            textId={`${textIdPrefix}-title-prefix`}
                            page={page}
                            section="hero"
                        >
                            {titlePrefix}
                        </EditableText>
                    </span>
                )}
                {!titlePrefix && (
                    <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-sky-700 bg-clip-text text-transparent">
                        <EditableText
                            textId={`${textIdPrefix}-title`}
                            page={page}
                            section="hero"
                        >
                            {titleHighlight}
                        </EditableText>
                    </span>
                )}
                {titlePrefix && (
                    <span className="text-neutral-800">
                        {" "}
                        <EditableText
                            textId={`${textIdPrefix}-title-suffix`}
                            page={page}
                            section="hero"
                        >
                            {titleSuffix || titleHighlight}
                        </EditableText>
                    </span>
                )}
            </h1>

            <div className="mx-auto mb-12 max-w-3xl text-lg sm:text-xl md:text-2xl text-neutral-700 leading-relaxed">
                <p>
                    <EditableText
                        textId={`${textIdPrefix}-description`}
                        page={page}
                        section="hero"
                        multiline
                    >
                        {description}
                    </EditableText>
                </p>
            </div>
        </>
    )
}

// Simpler version for dark backgrounds
export function EditableDarkHero({
    title,
    subtitle,
    description,
    textIdPrefix,
    page,
}: {
    title: string
    subtitle?: string
    description: string
    textIdPrefix: string
    page: string
}) {
    return (
        <>
            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-white to-[#548cac] bg-clip-text text-transparent">
                    <EditableText
                        textId={`${textIdPrefix}-title`}
                        page={page}
                        section="hero"
                    >
                        {title}
                    </EditableText>
                </span>
                {subtitle && (
                    <>
                        <br />
                        <span className="text-white/90">
                            <EditableText
                                textId={`${textIdPrefix}-subtitle`}
                                page={page}
                                section="hero"
                            >
                                {subtitle}
                            </EditableText>
                        </span>
                    </>
                )}
            </h1>

            <div className="mx-auto mb-12 max-w-3xl text-lg sm:text-xl text-white/80 leading-relaxed">
                <p>
                    <EditableText
                        textId={`${textIdPrefix}-description`}
                        page={page}
                        section="hero"
                        multiline
                    >
                        {description}
                    </EditableText>
                </p>
            </div>
        </>
    )
}
