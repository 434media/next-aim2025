import { generateOGImage } from "../../lib/og-image"

export const alt = "Posters | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "SURF Poster Presentations",
        subtitle: "San Antonio Military Health & Universities Research Forum — poster presenters and abstracts",
        accentColor: "#5a5a2c",
    })
}
