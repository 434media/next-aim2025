"use client"

import { ImageIcon, Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label?: string
    placeholder?: string
    aspectRatio?: "square" | "landscape" | "logo"
    required?: boolean
}

export function ImageUpload({
    value,
    onChange,
    label = "Image",
    placeholder = "https://example.com/image.png",
    aspectRatio = "landscape",
    required = false,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)

    const aspectClasses = {
        square: "aspect-square",
        landscape: "aspect-video",
        logo: "h-24",
    }

    const handleFileUpload = useCallback(
        async (file: File) => {
            setError(null)
            setIsUploading(true)

            try {
                const formData = new FormData()
                formData.append("file", file)

                const response = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                })

                const data = await response.json()

                if (data.success) {
                    onChange(data.url)
                } else {
                    setError(data.error || "Upload failed")
                }
            } catch {
                setError("Failed to upload image")
            } finally {
                setIsUploading(false)
            }
        },
        [onChange]
    )

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setDragActive(false)

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0])
            }
        },
        [handleFileUpload]
    )

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0])
            }
        },
        [handleFileUpload]
    )

    const handleUrlChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
            setError(null)
        },
        [onChange]
    )

    const clearImage = useCallback(() => {
        onChange("")
        setError(null)
    }, [onChange])

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                {label} {required && "*"}
            </label>

            {/* Preview / Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative w-full ${aspectClasses[aspectRatio]} min-h-[6rem] bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed transition-colors ${dragActive
                        ? "border-[#548cac] bg-[#548cac]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
            >
                {value ? (
                    <>
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            onError={() => setError("Failed to load image")}
                        />
                        <button
                            type="button"
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 rounded-lg shadow-sm transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer text-gray-400 hover:text-gray-500 transition-colors">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-8 w-8 mb-2 animate-spin text-[#548cac]" />
                                <span className="text-sm font-medium">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="h-8 w-8 mb-2" />
                                <span className="text-sm font-medium">
                                    Drop image here or click to upload
                                </span>
                                <span className="text-xs mt-1">
                                    PNG, JPG, GIF, WebP, SVG up to 4.5MB
                                </span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                            onChange={handleInputChange}
                            className="hidden"
                            disabled={isUploading}
                        />
                    </label>
                )}
            </div>

            {/* URL Input */}
            <div className="relative">
                <input
                    type="url"
                    value={value}
                    onChange={handleUrlChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                    placeholder={placeholder}
                    disabled={isUploading}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    or paste URL
                </span>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
        </div>
    )
}
