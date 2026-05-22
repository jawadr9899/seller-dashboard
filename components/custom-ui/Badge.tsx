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
  primary: "bg-[#e4e1ff] text-[#3b35d6]",
  secondary: "bg-[#f1e7ff] text-[#7a4bc6]",
  success: "bg-[#dcf7e9] text-[#1b8f5a] border border-[#a8e8c8]",
  warning: "bg-[#fff1d6] text-[#b9821c] border border-[#ffdca3]",
  danger: "bg-[#fde4e4] text-[#cf3c3c] border border-[#f5b5b5]",
  gray: "bg-[#f2f0ff] text-[#6b668f]",
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
