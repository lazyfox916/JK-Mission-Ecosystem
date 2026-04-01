import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({ children, className = "", glow, padding = "md" }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl border bg-bg-card
        transition-all duration-200
        ${glow ? "border-border-strong shadow-[0_0_30px_rgba(139,92,246,0.12)]" : "border-border"}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  icon?: ReactNode;
  accent?: string;
}

export function StatCard({ label, value, delta, deltaType = "neutral", icon, accent }: StatCardProps) {
  const deltaColor =
    deltaType === "up" ? "text-success" :
    deltaType === "down" ? "text-danger" :
    "text-text-muted";

  return (
    <Card className="group hover:border-neon-purple/30 hover:shadow-[0_0_24px_rgba(139,92,246,0.08)] transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider truncate">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-text-primary">{value}</p>
          {delta && (
            <p className={`mt-1 text-xs font-medium ${deltaColor}`}>{delta}</p>
          )}
        </div>
        {icon && (
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: accent ? `${accent}20` : "rgba(139,92,246,0.15)" }}
          >
            <span style={{ color: accent ?? "#8b5cf6" }}>{icon}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
