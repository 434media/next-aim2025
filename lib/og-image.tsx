import { ImageResponse } from "next/og"

/**
 * Shared OG image generator for consistent branding across all pages.
 * Uses the AIM Health R&D Summit design system:
 * - Dark navy background (#0d1125)
 * - Teal accent gradient (#1a3f4a / #366A79)
 * - Blue accent text (#759dbf)
 * - Olive accent (#5a5a2c)
 */
export function generateOGImage({
    title,
    subtitle,
    accentColor = "#759dbf",
}: {
    title: string
    subtitle?: string
    accentColor?: string
}) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 1200,
                    height: 630,
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(135deg, #0d1125 0%, #1a3f4a 50%, #0d1125 100%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle grid pattern overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        opacity: 0.05,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Top accent bar */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        display: "flex",
                        background: `linear-gradient(90deg, ${accentColor}, #5a5a2c, ${accentColor})`,
                    }}
                />

                {/* Content container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "60px 80px",
                        flex: 1,
                    }}
                >
                    {/* AIM Logo mark - simplified monument silhouette */}
                    <div
                        style={{
                            display: "flex",
                            marginBottom: 40,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 346.94 250.38"
                            width={200}
                            height={144}
                        >
                            <path
                                d="M2.18 60.6h83.23V46.08h21.94v-7.74h11.59l28.16-14.98-.56-5.01c2.69-.4 5.38-.81 8.07-1.21 0-9.81 13.4-17.15 18.88-17.15 5.48 0 18.87 7.34 18.88 17.15 2.69.4 5.38.81 8.07 1.21l-.57 5.01 28.16 14.98h11.59v7.74h21.94V60.6h83.23v11.24H2.18V60.6z"
                                fill="#ffffff"
                                fillRule="evenodd"
                            />
                            <path d="M79.42 81.89H96.52V210.94H79.42z" fill="#fff" />
                            <path d="M155.29 210.95L143.57 210.95 155.29 155.49z" fill="#fff" />
                            <path d="M114.18 210.95L125.91 210.95 114.18 155.49z" fill="#fff" />
                            <path d="M114.26 81.65L134.74 170.53 155.29 81.65z" fill="#fff" />
                            <path d="M61.33 210.95V81.89L26.53 81.89 47.36 210.95z" fill="#fff" />
                            <path d="M28.18 210.95L24.87 189.71 6.4 189.71 2.09 210.95z" fill="#fff" />
                            <path
                                d="M28.25 157.73l-7.54 5.48 2.9 8.9-7.55-5.5-7.57 5.5 2.9-8.9-7.52-5.48h9.3l2.9-8.85 2.88 8.85h9.31z"
                                fill="#fff"
                            />
                            <path d="M0 222.12H346.94V250.39H0z" fill="#fff" />
                            <path
                                d="M180.35 80.17h6.94l4.07 20.03v.07l2.74 13.49h-5.94l-1.54-7.68h-5.61l-1.54 7.68h-5.94l6.81-33.58zm5.08 20.03l-1.6-7.88-1.6 7.88h3.2zM196.77 105.6V88.24c0-4.74 3.87-8.61 8.55-8.61s8.61 3.87 8.61 8.61v4.81h-5.81v-4.81c0-1.54-1.27-2.74-2.8-2.74s-2.74 1.2-2.74 2.74v17.36c0 1.47 1.27 2.74 2.8 2.74s2.74-1.27 2.74-2.74v-4.87h5.81v4.87c0 4.67-3.81 8.55-8.55 8.55h-.07c-4.67 0-8.55-3.87-8.55-8.55zM223.41 80.17h6.94l4.07 20.03v.07l2.74 13.49h-5.94l-1.54-7.68h-5.61l-1.54 7.68h-5.94l6.81-33.58zm5.08 20.03l-1.6-7.88-1.6 7.88h3.2zM241.17 80.23h9.01c4.74 0 8.61 3.87 8.61 8.61v16.29c0 4.74-3.87 8.61-8.61 8.61h-9.01V80.23zm9.01 27.71c1.54 0 2.8-1.27 2.8-2.8V88.85c0-1.54-1.27-2.8-2.8-2.8h-3.2v21.9h3.2zM264.14 80.23h14.69v5.81h-8.88v8.01h5.81v5.81h-5.81v8.08h8.88v5.81h-14.69V80.24zM289.3 96.93v16.56h-5.81V80.18h5.94l6.54 24.57 6.61-24.57 5.88.13v33.31h-5.81V96.93l-3.87 16.82h-5.61l-3.87-16.82zM313.8 80.17h5.81v33.58h-5.81V80.17zM331.09 80.17h6.94l4.07 20.03v.07l2.74 13.49h-5.94l-1.54-7.68h-5.61l-1.54 7.68h-5.94l6.81-33.58zm5.08 20.03l-1.6-7.88-1.6 7.88h3.2z"
                                fill="#759dbf"
                            />
                            <path
                                d="M174.88 128.88h5.81v33.58h-5.81v-33.58zM192.57 142.63v19.69h-5.81v-33.31l6.01-.13 8.55 18.96v-18.96h5.81v33.58h-5.61l-8.95-19.83zM212.53 128.94h9.01c4.74 0 8.61 3.87 8.61 8.61v16.29c0 4.74-3.87 8.61-8.61 8.61h-9.01v-33.51zm9.01 27.71c1.54 0 2.8-1.27 2.8-2.8v-16.29c0-1.54-1.27-2.8-2.8-2.8h-3.2v21.9h3.2zM235.56 154.18v-25.3h5.81v25.3c0 1.54 1.27 2.74 2.8 2.74s2.74-1.2 2.74-2.74v-25.3h5.81v25.3c0 4.74-3.81 8.61-8.55 8.61s-8.61-3.87-8.61-8.61zM258.13 154.45v-2.8h5.61v3.14c0 2.07.73 3 2.47 3s2.47-.93 2.47-3c0-2.47-1.13-4.27-4.47-7.14-4.41-3.87-5.94-6.68-5.94-10.82 0-5.67 2.87-8.81 8.14-8.81s8.08 3.14 8.08 8.81v1.4h-5.61v-1.74c0-2.14-.73-3.07-2.34-3.07s-2.4.93-2.4 3.07c0 2.4 1.13 4.21 4.47 7.14 4.41 3.87 5.94 6.68 5.94 10.82 0 5.67-2.94 8.75-8.21 8.75s-8.21-3.07-8.21-8.75zM284.63 134.75h-6.68v-5.88h19.23v5.88h-6.74v27.71h-5.81v-27.71zM302.59 128.88h9.01c4.74 0 8.61 3.87 8.61 8.61v2.8c0 2.47-1.07 4.67-2.74 6.28 1.07 1.4 1.67 3.2 1.67 5.07v10.82h-5.81v-10.82c0-1.54-1.2-2.74-2.74-2.74h-2.2v13.55h-5.81v-33.58zm9.01 14.22c1.54 0 2.8-1.27 2.8-2.8v-2.8c0-1.54-1.27-2.8-2.8-2.8h-3.2v8.41h3.2zM330.36 148.1l-8.08-19.23h6.28l4.74 11.15 4.67-11.15h6.34l-8.14 19.23v14.35h-5.81V148.1z"
                                fill="#ffffff"
                            />
                            <path
                                d="M180.02 194.34v16.56h-5.81v-33.31h5.94l6.54 24.57 6.61-24.57 5.88.13v33.31h-5.81v-16.69l-3.87 16.82h-5.61l-3.87-16.82zM206.45 177.59h5.81v33.58h-5.81v-33.58zM219.54 177.59h5.81v27.77h8.88v5.81h-14.69v-33.58zM241.5 177.59h5.81v33.58h-5.81v-33.58zM260.59 183.46h-6.68v-5.88h19.23v5.88h-6.74v27.71h-5.81v-27.71zM281.89 177.59h6.94l4.07 20.03v.07l2.74 13.49h-5.94l-1.54-7.68h-5.61l-1.54 7.68h-5.94l6.81-33.58zm5.07 20.03l-1.6-7.88-1.6 7.88h3.2zM301.58 177.59h9.01c4.74 0 8.61 3.87 8.61 8.61v2.8c0 2.47-1.07 4.67-2.74 6.28 1.07 1.4 1.67 3.2 1.67 5.07v10.82h-5.81v-10.82c0-1.54-1.2-2.74-2.74-2.74h-2.2v13.55h-5.81v-33.58zm9.02 14.22c1.54 0 2.8-1.27 2.8-2.8v-2.8c0-1.54-1.27-2.8-2.8-2.8h-3.2v8.41h3.2zM330.56 196.81l-8.08-19.23h6.28l4.74 11.15 4.67-11.15h6.34l-8.14 19.23v14.35h-5.81v-14.35z"
                                fill="#5a5a2c"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: title.length > 40 ? 48 : 56,
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.2,
                            marginBottom: subtitle ? 16 : 0,
                            maxWidth: 900,
                        }}
                    >
                        {title}
                    </div>

                    {/* Subtitle */}
                    {subtitle && (
                        <div
                            style={{
                                fontSize: 24,
                                color: accentColor,
                                lineHeight: 1.5,
                                maxWidth: 800,
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>

                {/* Bottom bar with site info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 80px",
                        borderTop: "1px solid rgba(117, 157, 191, 0.2)",
                    }}
                >
                    <div
                        style={{
                            fontSize: 18,
                            color: "rgba(255, 255, 255, 0.6)",
                            display: "flex",
                        }}
                    >
                        aimsatx.com
                    </div>
                    <div
                        style={{
                            fontSize: 16,
                            color: "rgba(255, 255, 255, 0.4)",
                            display: "flex",
                        }}
                    >
                        San Antonio, TX
                    </div>
                </div>

                {/* Bottom accent bar */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        display: "flex",
                        background: `linear-gradient(90deg, ${accentColor}, #5a5a2c, ${accentColor})`,
                    }}
                />
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
