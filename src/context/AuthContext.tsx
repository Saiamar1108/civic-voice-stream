import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  auth,
  googleProvider,
  sendPhoneOtp,
} from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  startPhoneSignIn: (e164Phone: string) => Promise<import("firebase/auth").ConfirmationResult>;
  confirmPhoneCode: (confirmation: import("firebase/auth").ConfirmationResult, code: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async signInWithGoogle() {
      await signInWithPopup(auth, googleProvider);
    },
    async startPhoneSignIn(e164Phone: string) {
      return sendPhoneOtp(e164Phone);
    },
    async confirmPhoneCode(confirmation, code) {
      await confirmation.confirm(code);
    },
    async signOutUser() {
      await signOut(auth);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


