import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const app = getFirebaseApp();
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function ensureRecaptcha(containerId = "recaptcha-container") {
  if (typeof window === "undefined") return undefined as unknown as RecaptchaVerifier;
  // Reuse if it already exists to avoid multiple widgets
  const existing = (window as unknown as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier;
  if (existing) return existing;

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
  (window as unknown as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier = verifier;
  return verifier;
}

export async function sendPhoneOtp(fullE164Phone: string): Promise<ConfirmationResult> {
  const verifier = ensureRecaptcha();
  return signInWithPhoneNumber(auth, fullE164Phone, verifier);
}


