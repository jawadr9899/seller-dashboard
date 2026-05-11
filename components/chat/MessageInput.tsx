'use client';

import React, { useState } from 'react';
import { Button } from '@/components/custom-ui/Button';

interface MessageInputProps {
  onSend?: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-3 md:p-4 flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-gray-50 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-colors"
      />
      <Button variant="primary" size="md" className="rounded-full px-6" onClick={handleSend} disabled={!message.trim()}>
        Send
      </Button>
    </div>
  );
};
