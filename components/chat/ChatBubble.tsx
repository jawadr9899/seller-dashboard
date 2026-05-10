'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  type: 'inbound' | 'outbound';
  text: string;
  timestamp?: string;
  avatar?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ type, text, timestamp, avatar }) => {
  const isOutbound = type === 'outbound';

  return (
    <div className={cn('flex gap-2 mb-3', isOutbound && 'justify-end')}>
      {!isOutbound && avatar && (
        <img src={avatar} alt="avatar" className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
      )}
      <div className={cn('flex flex-col', isOutbound && 'items-end')}>
        <div
          className={cn(
            'px-4 py-2 rounded-2xl max-w-xs',
            isOutbound
              ? 'bg-cyan-500 text-white rounded-tr-none'
              : 'bg-white text-gray-900 rounded-tl-none border border-gray-200'
          )}
        >
          <p className="text-sm">{text}</p>
        </div>
        {timestamp && <p className="text-xs text-gray-500 mt-1">{timestamp}</p>}
      </div>
    </div>
  );
};
