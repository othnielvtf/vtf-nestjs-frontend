import React from 'react';
import { Users } from 'lucide-react';

interface ChatHeaderProps {
  roomId: string;
  messageCount: number;
  isConnected: boolean;
}

export function ChatHeader({ roomId, messageCount, isConnected }: ChatHeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold">{roomId}</h1>
              <p className="text-sm text-gray-400">
                {messageCount} messages
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-400">
              {isConnected ? 'Connected' : 'Reconnecting...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}