import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { LoginForm } from './components/LoginForm';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';

// Socket connection
// Use environment variable or fallback to localhost for development
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://localhost:3000';

const socket = io(BACKEND_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  pingInterval: 25000,
  pingTimeout: 20000
});

// Message interface
interface Message {
  username: string;
  content: string;
  timestamp?: Date;
}

// App component
function App() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      if (isJoined && roomId && username) {
        socket.emit('join_room', { roomId, username });
        setMessages(prev => [...prev, {
          username: 'System',
          content: 'Reconnected to server',
          timestamp: new Date()
        }]);
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setMessages(prev => [...prev, {
        username: 'System',
        content: 'Disconnected from server. Attempting to reconnect...',
        timestamp: new Date()
      }]);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('new_message', (message: Message) => {
      setMessages(prev => [...prev, { ...message, timestamp: new Date() }]);
    });

    socket.on('user_joined', (data: { username: string }) => {
      setMessages(prev => [...prev, {
        username: 'System',
        content: `${data.username} joined the room`,
        timestamp: new Date()
      }]);
    });

    // Ping to keep connection alive
    const pingInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit('ping');
      }
    }, 20000);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('new_message');
      socket.off('user_joined');
      clearInterval(pingInterval);
    };
  }, [isJoined, roomId, username]);

  const handleJoinRoom = () => {
    if (roomId && username) {
      socket.emit('join_room', { roomId, username });
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && roomId) {
      socket.emit('send_message', { roomId, content: message });
      setMessage('');
    }
  };

  if (!isJoined) {
    return (
      <LoginForm
        roomId={roomId}
        username={username}
        onRoomIdChange={setRoomId}
        onUsernameChange={setUsername}
        onJoin={handleJoinRoom}
      />
    );
  }

  const messageCount = messages.filter(m => m.username !== 'System').length;

  return (
    <div className="h-screen bg-gray-900 flex flex-col font-manrope">
      <ChatHeader 
        roomId={roomId} 
        messageCount={messageCount} 
        isConnected={isConnected}
      />
      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto overflow-hidden">
        <MessageList
          messages={messages}
          currentUsername={username}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          message={message}
          onMessageChange={setMessage}
          onSend={handleSendMessage}
          isConnected={isConnected}
        />
      </main>
    </div>
  );
}

export default App;