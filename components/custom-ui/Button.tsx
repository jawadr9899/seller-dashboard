import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ok-brand text-white shadow-[0_4px_10px_rgba(59,53,214,0.25)] hover:bg-ok-brand-hover",
  secondary: "bg-ok-brand-subtle text-ok-brand hover:bg-ok-brand-surface",
  outline: "border border-ok-border text-ok-brand bg-white hover:bg-ok-brand-surface",
  danger: "border border-ok-danger-border text-ok-danger bg-white hover:bg-ok-danger-ghost-alt",
  ghost: "text-ok-brand hover:bg-ok-brand-subtle",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      icon,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {icon && <span>{icon}</span>}
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export { Button };
