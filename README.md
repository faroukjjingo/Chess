# Chess App

A feature-rich, real-time web-based chess game similar to Chess.com.

## Features
- Multiplayer mode with WebSocket-based real-time moves
- Authentication via NextAuth.js (Google, GitHub)
- Chessboard with react-chessboard and chess.js
- Game history and user profiles stored in MongoDB
- Real-time game state sync with Redis
- Tailwind CSS for modern UI
- Deployed on Vercel (frontend) and Railway (backend)

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install client dependencies: `cd client && npm install`
3. Install server dependencies: `cd server && npm install`
4. Set up environment variables (see `.env` examples)
5. Run MongoDB and Redis: `docker-compose up -d`
6. Start server: `cd server && npm run dev`
7. Start client: `cd client && npm run dev`

## Deployment
- Frontend: Deploy on Vercel
- Backend: Deploy on Railway
- Database: Use MongoDB Atlas
