"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Activity, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent! Check your inbox.");
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neon-purple/15 border border-neon-purple/30 mb-4 neon-glow">
            <Activity size={28} className="text-neon-purple" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Reset Password</h1>
          <p className="mt-1 text-sm text-text-muted">We&#39;ll send you a recovery link</p>
        </div>

        <div className="glass-strong rounded-2xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.12)]">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/25 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-success" />
              </div>
              <h2 className="text-base font-semibold text-text-primary mb-2">Check your inbox</h2>
              <p className="text-sm text-text-muted mb-6">
                We sent a password reset link to <strong className="text-text-secondary">{email}</strong>
              </p>
              <Link href="/login">
                <Button variant="secondary" size="md" className="w-full">
                  <ArrowLeft size={16} />
                  Back to login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-1">Forgot your password?</h2>
              <p className="text-sm text-text-muted mb-6">
                Enter your registered email and we&#39;ll send a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="doctor@jkmission.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail size={15} />}
                />
                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  Send reset link
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-neon-purple transition-colors"
                >
                  <ArrowLeft size={13} />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
