"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Activity, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"doctor" | "admin" | "staff">("doctor");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success(`Welcome back, ${role === "doctor" ? "Dr." : ""} ${email.split("@")[0]}!`);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neon-purple/15 border border-neon-purple/30 mb-4 neon-glow">
            <Activity size={28} className="text-neon-purple" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">J.K. Mission</h1>
          <p className="mt-1 text-sm text-text-muted">Medical Intelligence Platform</p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.12)]">
          <h2 className="text-lg font-semibold text-text-primary mb-1">Sign in to your account</h2>
          <p className="text-sm text-text-muted mb-6">Enter your credentials to continue</p>

          {/* Role selector */}
          <div className="flex gap-2 mb-6 p-1 bg-bg-base rounded-xl border border-border">
            {(["doctor", "admin", "staff"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`
                  flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200
                  ${role === r
                    ? "bg-neon-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                    : "text-text-muted hover:text-text-secondary"
                  }
                `}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="doctor@jkmission.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={15} />}
              autoComplete="email"
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={15} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-[#8b5cf6] rounded" />
                <span className="text-xs text-text-muted">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-neon-purple hover:text-neon-violet transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
              Sign in as {role === "doctor" ? "Doctor" : role === "admin" ? "Admin" : "Staff"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-text-muted">
            Protected by enterprise-grade security.{" "}
            <span className="text-text-secondary">J.K. Mission &copy; 2025</span>
          </p>
        </div>
      </div>
    </div>
  );
}
