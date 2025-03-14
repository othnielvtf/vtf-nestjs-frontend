# VTF Live Chat Frontend

A modern, responsive React-based frontend for the VTF Live Chat application. This project provides a real-time chat interface that connects to the [VTF NestJS Live Chat Backend](https://github.com/othnielvtf/vtf-nestjs-livechat).

## Features

- **Real-time Communication**: Instant messaging using Socket.IO
- **Room-based Chat**: Join specific chat rooms with unique IDs
- **User Presence**: See when users join or leave rooms
- **Connection Status**: Visual indicators for connection state
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean interface built with React and Tailwind CSS

## Technologies

- React 18
- TypeScript
- Socket.IO Client
- Tailwind CSS
- Vite

## Project Structure

```
src/
├── components/           # UI Components
│   ├── ChatHeader.tsx    # Room information and status
│   ├── ChatInput.tsx     # Message input form
│   ├── LoginForm.tsx     # Room joining interface
│   └── MessageList.tsx   # Displays chat messages
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- [VTF NestJS Live Chat Backend](https://github.com/othnielvtf/vtf-nestjs-livechat) running

### Installation

1. Clone this repository
   ```
   git clone <your-frontend-repo-url>
   cd <your-frontend-directory>
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn
   ```

3. Configure backend URL
   
   Open `src/App.tsx` and update the Socket.IO connection URL to match your backend:
   ```typescript
   const socket = io('https://your-backend-url', {
     // connection options
   });
   ```

4. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Deployment to Vercel

This project is configured for easy deployment to Vercel.

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI
   ```
   npm install -g vercel
   ```

2. Login to Vercel
   ```
   vercel login
   ```

3. Deploy from the project directory
   ```
   vercel
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project in the [Vercel Dashboard](https://vercel.com/import)

3. Vercel will automatically detect your Vite project and use the correct build settings

### Environment Variables

If your backend is also deployed, make sure to update the Socket.IO connection URL in `src/App.tsx` or set it as an environment variable in the Vercel dashboard:

| Name | Value |
|------|-------|
| `VITE_BACKEND_URL` | `https://your-backend-url` |

## WebSocket Events

This frontend implements the following Socket.IO events to communicate with the backend:

### Client to Server Events
- `join_room`: Join a chat room
- `send_message`: Send a message to a room
- `ping`: Keep connection alive

### Server to Client Events
- `connect`: Socket connection established
- `disconnect`: Socket connection lost
- `new_message`: New message received in a room
- `user_joined`: Notification when a user joins a room

## Backend Integration

This frontend is designed to work with the [VTF NestJS Live Chat Backend](https://github.com/othnielvtf/vtf-nestjs-livechat). Make sure to set up and run the backend before using this frontend.

## License

MIT

## Author

Othniel VTF
