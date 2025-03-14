import React from 'react';
import { Users } from 'lucide-react';

interface LoginFormProps {
  roomId: string;
  username: string;
  onRoomIdChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onJoin: () => void;
}

export function LoginForm({ roomId, username, onRoomIdChange, onUsernameChange, onJoin }: LoginFormProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-manrope">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white">Join Chat</h1>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Room ID</label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => onRoomIdChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter room ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a username"
            />
          </div>
          <button
            onClick={onJoin}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}