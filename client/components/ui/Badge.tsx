type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "purple";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-text-secondary border-white/10",
  success: "bg-success/10 text-success border-success/25",
  warning: "bg-warning/10 text-warning border-warning/25",
  danger: "bg-danger/10 text-danger border-danger/25",
  info: "bg-info/10 text-info border-info/25",
  purple: "bg-neon-purple/10 text-neon-purple border-neon-purple/25",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-text-muted",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  purple: "bg-neon-purple",
};

export function Badge({ children, variant = "default", dot, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
        text-xs font-medium border
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-neon ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}
