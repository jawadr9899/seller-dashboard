'use client';

import React from 'react';
import { Avatar } from '@/components/custom-ui/Avatar';
import { cn } from '@/lib/utils';

interface ContactRowProps {
  id: string;
  name: string;
  avatar: string;
  time: string;
  preview: string;
  online: boolean;
  active?: boolean;
  onClick?: (id: string) => void;
}

export const ContactRow: React.FC<ContactRowProps> = ({
  id,
  name,
  avatar,
  time,
  preview,
  online,
  active,
  onClick,
}) => (
  <button
    onClick={() => onClick?.(id)}
    className={cn(
      'w-full px-3 py-3 rounded-lg transition-colors text-left hover:bg-gray-50 flex items-start gap-3',
      active && 'bg-cyan-50'
    )}
  >
    <Avatar src={avatar} size="md" online={online} alt={name} />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500 flex-shrink-0">{time}</p>
      </div>
      <p className="text-xs text-gray-500 truncate">{preview}</p>
    </div>
  </button>
);
