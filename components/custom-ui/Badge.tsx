import React from "react";
import { cn } from "@/lib/utils";

type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "gray";

const colorClasses: Record<BadgeColor, string> = {
  primary: "bg-ok-brand-ghost text-ok-brand",
  secondary: "bg-ok-brand-secondary-bg text-ok-brand-secondary-text",
  success: "bg-ok-success-bg text-ok-success border border-ok-success-border",
  warning: "bg-ok-warning-bg text-ok-warning border border-ok-warning-border",
  danger: "bg-ok-danger-bg text-ok-danger border border-ok-danger-border",
  gray: "bg-ok-gray-badge text-ok-text-muted",
};

interface BadgeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color"
> {
  color?: BadgeColor;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, color = "primary", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
        colorClasses[color],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

export { Badge };
