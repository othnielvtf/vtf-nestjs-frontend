import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  isConnected: boolean;
}

export function ChatInput({ message, onMessageChange, onSend, isConnected }: ChatInputProps) {
  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={onSend} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="flex-1 bg-gray-700 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={isConnected ? "Type a message..." : "Reconnecting to server..."}
            disabled={!isConnected}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isConnected}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}