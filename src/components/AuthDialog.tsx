import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export const AuthDialog = () => {
  const { signInWithGoogle, startPhoneSignIn, confirmPhoneCode } = useAuth();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [awaitingCode, setAwaitingCode] = useState(false);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStartPhone() {
    setError(null);
    setSubmitting(true);
    try {
      // Expecting E.164 like +919876543210
      await startPhoneSignIn(phone);
      setAwaitingCode(true);
    } catch (e: any) {
      const msg = e?.message || e?.error_description || e?.error || (typeof e === "string" ? e : JSON.stringify(e));
      setError(msg || "Failed to send OTP");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirm() {
    setError(null);
    setSubmitting(true);
    try {
      await confirmPhoneCode(code, phone);
      setOpen(false);
    } catch (e: any) {
      const msg = e?.message || e?.error_description || e?.error || (typeof e === "string" ? e : JSON.stringify(e));
      setError(msg || "Invalid code");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      setOpen(false);
    } catch (e: any) {
      const msg = e?.message || e?.error_description || e?.error || (typeof e === "string" ? e : JSON.stringify(e));
      setError(msg || "Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button variant="default" className="w-full" onClick={handleGoogle} disabled={submitting}>
            Continue with Google
          </Button>
          <Separator />
          <div className="space-y-2">
            <label className="text-sm">Mobile number (E.164, e.g. +919876543210)</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." disabled={awaitingCode || submitting} />
            {!awaitingCode ? (
              <Button onClick={handleStartPhone} disabled={submitting || !phone} className="w-full">Send OTP</Button>
            ) : (
              <div className="space-y-2">
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter OTP" />
                <Button onClick={handleConfirm} disabled={submitting || code.length === 0} className="w-full">Verify OTP</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


