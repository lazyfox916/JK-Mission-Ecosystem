"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-text-muted pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-bg-elevated border rounded-xl text-text-primary placeholder-text-muted
              transition-all duration-200 outline-none
              focus:border-neon-purple/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-danger/50 focus:border-danger/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]" : "border-border"}
              ${leftIcon ? "pl-10" : "pl-4"}
              ${rightIcon ? "pr-10" : "pr-4"}
              h-10 text-sm
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-text-muted">{rightIcon}</span>
          )}
        </div>
        {error && (
          <p className="text-xs text-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
