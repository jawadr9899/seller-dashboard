import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, ...props }, ref) => (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 border border-[#d9d4e8] rounded-sm bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3b35d6]/20 focus:border-[#3b35d6] placeholder-gray-400",
            icon && "pl-10",
            error && "border-[#d64545]",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  ),
);

Input.displayName = "Input";

export { Input };
