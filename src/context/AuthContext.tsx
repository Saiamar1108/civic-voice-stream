import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AuthContextValue = {
  user: any;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  startPhoneSignIn: (e164Phone: string) => Promise<void>;
  confirmPhoneCode: (code: string, phone?: string) => Promise<void>;
  mockLogin: () => void;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async signInWithGoogle() {
      const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            prompt: "select_account",
          },
        },
      });
      if (error) throw error;
    },
    async startPhoneSignIn(e164Phone: string) {
      const { error } = await supabase.auth.signInWithOtp({ phone: e164Phone });
      if (error) throw error;
    },
    async confirmPhoneCode(code: string, phone?: string) {
      const { error } = await supabase.auth.verifyOtp({ token: code, type: "sms", phone });
      if (error) throw error;
    },
    mockLogin() {
      setUser({ id: "demo_user", email: "demo@urbanx.com", user_metadata: { name: "Demo User" } });
    },
    async signOutUser() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


