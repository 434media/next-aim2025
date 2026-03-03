import { ImageResponse } from "next/og"

export const size = {
    width: 180,
    height: 180,
}
export const contentType = "image/png"

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 180,
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0d1125, #1a3f4a)",
                    borderRadius: 40,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 346.94 250.38"
                    width={150}
                    height={108}
                >
                    <path
                        d="M2.18 60.6h83.23V46.08h21.94v-7.74h11.59l28.16-14.98-.56-5.01c2.69-.4 5.38-.81 8.07-1.21 0-9.81 13.4-17.15 18.88-17.15 5.48 0 18.87 7.34 18.88 17.15 2.69.4 5.38.81 8.07 1.21l-.57 5.01 28.16 14.98h11.59v7.74h21.94V60.6h83.23v11.24H2.18V60.6z"
                        fill="#ffffff"
                        fillRule="evenodd"
                    />
                    <path d="M79.42 81.89H96.52V210.94H79.42z" fill="#ffffff" />
                    <path d="M155.29 210.95L143.57 210.95 155.29 155.49z" fill="#ffffff" />
                    <path d="M114.18 210.95L125.91 210.95 114.18 155.49z" fill="#ffffff" />
                    <path d="M114.26 81.65L134.74 170.53 155.29 81.65z" fill="#ffffff" />
                    <path d="M61.33 210.95V81.89L26.53 81.89 47.36 210.95z" fill="#ffffff" />
                    <path d="M28.18 210.95L24.87 189.71 6.4 189.71 2.09 210.95z" fill="#ffffff" />
                    <path
                        d="M28.25 157.73l-7.54 5.48 2.9 8.9-7.55-5.5-7.57 5.5 2.9-8.9-7.52-5.48h9.3l2.9-8.85 2.88 8.85h9.31z"
                        fill="#ffffff"
                    />
                    <path d="M0 222.12H346.94V250.39H0z" fill="#ffffff" />
                    <path
                        d="M180.35 80.17h6.94l4.07 20.03v.07l2.74 13.49h-5.94l-1.54-7.68h-5.61l-1.54 7.68h-5.94l6.81-33.58zm5.08 20.03l-1.6-7.88-1.6 7.88h3.2z"
                        fill="#759dbf"
                    />
                    <path
                        d="M196.77 105.6V88.24c0-4.74 3.87-8.61 8.55-8.61s8.61 3.87 8.61 8.61v4.81h-5.81v-4.81c0-1.54-1.27-2.74-2.8-2.74s-2.74 1.2-2.74 2.74v17.36c0 1.47 1.27 2.74 2.8 2.74s2.74-1.27 2.74-2.74v-4.87h5.81v4.87c0 4.67-3.81 8.55-8.55 8.55h-.07c-4.67 0-8.55-3.87-8.55-8.55z"
                        fill="#759dbf"
                    />
                    <path
                        d="M223.41 80.17h6.94l4.07 20.03v.07l2.74 13.49h-5.94l-1.54-7.68h-5.61l-1.54 7.68h-5.94l6.81-33.58zm5.08 20.03l-1.6-7.88-1.6 7.88h3.2z"
                        fill="#759dbf"
                    />
                    <path
                        d="M174.88 128.88h5.81v33.58h-5.81v-33.58z"
                        fill="#ffffff"
                    />
                    <path
                        d="M192.57 142.63v19.69h-5.81v-33.31l6.01-.13 8.55 18.96v-18.96h5.81v33.58h-5.61l-8.95-19.83z"
                        fill="#ffffff"
                    />
                    <path
                        d="M180.02 194.34v16.56h-5.81v-33.31h5.94l6.54 24.57 6.61-24.57 5.88.13v33.31h-5.81v-16.69l-3.87 16.82h-5.61l-3.87-16.82z"
                        fill="#5a5a2c"
                    />
                    <path
                        d="M206.45 177.59h5.81v33.58h-5.81v-33.58z"
                        fill="#5a5a2c"
                    />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
