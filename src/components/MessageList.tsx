import React from 'react';

interface Message {
  username: string;
  content: string;
  timestamp?: Date;
}

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, currentUsername, messagesEndRef }: MessageListProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.username === currentUsername ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`relative max-w-[70%] px-4 py-2 ${
              msg.username === 'System'
                ? 'bg-gray-700 text-gray-300 italic text-center rounded-lg'
                : msg.username === currentUsername
                ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none'
                : 'bg-gray-700 text-white rounded-2xl rounded-tl-none'
            }`}
          >
            {msg.username !== 'System' && msg.username !== currentUsername && (
              <span className="block text-sm text-indigo-400 mb-1">
                {msg.username}
              </span>
            )}
            <p className="mb-1">{msg.content}</p>
            {msg.timestamp && (
              <span className="block text-xs text-gray-400 text-right">
                {formatTime(new Date(msg.timestamp))}
              </span>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}