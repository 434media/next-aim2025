import { cert, getApps, initializeApp, type App, type ServiceAccount } from "firebase-admin/app"
import { getAuth, type Auth } from "firebase-admin/auth"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

let app: App | null = null
let adminAuth: Auth | null = null
let adminDb: Firestore | null = null

function initializeFirebaseAdmin() {
  if (app) return { adminAuth, adminDb }
  
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_PRIVATE_KEY

  // Handle different formats of the private key
  // Vercel may store it with literal \n or actual newlines
  if (privateKey) {
    // Replace literal \n with actual newlines
    privateKey = privateKey.replace(/\\n/g, "\n")
    // Remove any surrounding quotes that might have been added
    privateKey = privateKey.replace(/^["']|["']$/g, "")
  }

  // Check if all required env vars are present
  if (!projectId || !clientEmail || !privateKey) {
    console.warn("[Firebase Admin] Missing configuration - some admin features may not work")
    console.warn("[Firebase Admin] Project ID:", projectId ? "✓" : "✗")
    console.warn("[Firebase Admin] Client Email:", clientEmail ? "✓" : "✗")
    console.warn("[Firebase Admin] Private Key:", privateKey ? "✓" : "✗")
    return { adminAuth: null, adminDb: null }
  }

  try {
    const serviceAccount: ServiceAccount = {
      projectId,
      clientEmail,
      privateKey,
    }

    // Validate private key format
    if (!privateKey.includes("-----BEGIN PRIVATE KEY-----") || !privateKey.includes("-----END PRIVATE KEY-----")) {
      console.error("[Firebase Admin] Private key format is invalid - missing BEGIN/END markers")
      return { adminAuth: null, adminDb: null }
    }

    // Initialize Firebase Admin
    app = getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert(serviceAccount),
          databaseURL: `https://${projectId}.firebaseio.com`,
        })

    adminAuth = getAuth(app)
    // Use the aimsatx database specifically
    adminDb = getFirestore(app, "aimsatx")

    // Configure Firestore settings
    adminDb.settings({ ignoreUndefinedProperties: true })

    return { adminAuth, adminDb }
  } catch (error) {
    console.error("[Firebase Admin] Initialization error:", error)
    // Log more details for debugging
    if (error instanceof Error) {
      console.error("[Firebase Admin] Error message:", error.message)
      if (error.message.includes("DECODER") || error.message.includes("unsupported")) {
        console.error("[Firebase Admin] This is likely a private key format issue. Ensure the key has proper newlines.")
      }
    }
    return { adminAuth: null, adminDb: null }
  }
}

// Lazy initialization - only initialize when needed
export function getAdminDb() {
  const { adminDb } = initializeFirebaseAdmin()
  if (!adminDb) {
    throw new Error("Firebase Admin not configured")
  }
  return adminDb
}

export function getAdminAuth() {
  const { adminAuth } = initializeFirebaseAdmin()
  if (!adminAuth) {
    throw new Error("Firebase Admin not configured")
  }
  return adminAuth
}

// For backwards compatibility - these will throw if not configured
const lazyAdminDb = new Proxy({} as Firestore, {
  get(_, prop) {
    return getAdminDb()[prop as keyof Firestore]
  }
})

const lazyAdminAuth = new Proxy({} as Auth, {
  get(_, prop) {
    return getAdminAuth()[prop as keyof Auth]
  }
})

export { lazyAdminAuth as adminAuth, lazyAdminDb as adminDb }

