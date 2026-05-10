import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ size = 'md', online, className, ...props }, ref) => (
    <div className="relative inline-block">
      <img
        ref={ref}
        className={cn('rounded-full object-cover', sizeMap[size], className)}
        alt="avatar"
        {...props}
      />
      {online && <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />}
    </div>
  )
);

Avatar.displayName = 'Avatar';

export { Avatar };
