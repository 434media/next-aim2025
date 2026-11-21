import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getAdminAuth } from "./firebase-admin"

/**
 * The admin sign-in check every admin API route runs first (security log AIM-1).
 *
 * Same rule as app/api/admin/site-text: a Firebase session cookie (`__session`), checked for
 * revocation, whose email is a 434media.com address or the one VelocityTX admin. Anything else
 * is refused.
 */
export async function verifyAdminSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("__session")?.value
    if (!sessionCookie) return null
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true)
    const email = decoded.email_verified === false ? undefined : decoded.email
    const isAuthorized = email?.endsWith("@434media.com") || email === "brian@velocitytx.org"
    return isAuthorized ? decoded : null
  } catch {
    return null
  }
}

/** A 401 response when there is no admin session, else null. */
export async function refuseUnlessAdmin(): Promise<NextResponse | null> {
  return (await verifyAdminSession()) ? null : NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
