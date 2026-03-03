import { generateOGImage } from "../../lib/og-image"

export const alt = "Sponsors & Exhibitors | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Sponsors & Exhibitors",
        subtitle: "Our partners driving cross-sector collaboration in military health research and development",
    })
}
