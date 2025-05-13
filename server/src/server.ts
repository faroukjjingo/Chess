import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { RedisClientType, createClient } from 'redis';
import gameRoutes from './routes/game';
import { handleSocket } from './sockets/gameSocket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/game', gameRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Redis Connection
const redis: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});
redis.on('error', (err) => console.error('Redis error:', err));
redis.connect().then(() => console.log('Redis connected'));

// Socket.IO
io.on('connection', (socket) => handleSocket(socket, io, redis));

// Start Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
