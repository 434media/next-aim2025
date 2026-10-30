import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"

// Gate for the one-off seed and migration routes. SEED_SECRET comes only from
// the environment; with no value set, the routes are disabled (fail closed).
// Returns a response to send when the request must be refused, or null.
export function rejectUnlessSeedSecret(secret: unknown): NextResponse | null {
    const expected = process.env.SEED_SECRET
    if (!expected) {
        return NextResponse.json(
            { success: false, error: "Seeding is disabled: SEED_SECRET is not set" },
            { status: 503 }
        )
    }

    // Compare digests so the comparison is constant-time and length-independent.
    const given = createHash("sha256").update(typeof secret === "string" ? secret : "").digest()
    const wanted = createHash("sha256").update(expected).digest()
    if (typeof secret !== "string" || !timingSafeEqual(given, wanted)) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        )
    }

    return null
}
