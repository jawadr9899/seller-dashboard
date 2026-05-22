import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#3b35d6] text-white shadow-[0_4px_10px_rgba(59,53,214,0.25)] hover:bg-[#2f2ab8]",
  secondary: "bg-[#eeeaff] text-[#3b35d6] hover:bg-[#e3ddff]",
  outline: "border border-[#d9d4e8] text-[#3b35d6] bg-white hover:bg-[#f3f0ff]",
  danger: "border border-[#f2b8b8] text-[#d64545] bg-white hover:bg-[#fff1f1]",
  ghost: "text-[#3b35d6] hover:bg-[#eeeaff]",
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
