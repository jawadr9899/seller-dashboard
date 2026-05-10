import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold', {
  variants: {
    color: {
      primary: 'bg-cyan-100 text-cyan-600',
      secondary: 'bg-pink-100 text-pink-600',
      success: 'bg-green-100 text-green-600',
      warning: 'bg-yellow-100 text-yellow-600',
      danger: 'bg-red-100 text-red-600',
      gray: 'bg-gray-100 text-gray-600',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

interface BadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, color, ...props }, ref) => (
  <div ref={ref} className={cn(badgeVariants({ color, className }))} {...props} />
));

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
