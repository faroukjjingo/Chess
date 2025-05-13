import { Server, Socket } from 'socket.io';
import { RedisClientType } from 'redis';
import Game from '../models/Game';

export const handleSocket = (
  socket: Socket,
  io: Server,
  redis: RedisClientType,
) => {
  socket.on('createGame', async ({ fen }) => {
    const gameId = Math.random().toString(36).substring(2, 15);
    await redis.set(`game:${gameId}`, JSON.stringify({ fen }));
    socket.join(gameId);
    socket.emit('gameCreated', { gameId });
  });

  socket.on('joinGame', async ({ gameId }) => {
    const gameData = await redis.get(`game:${gameId}`);
    if (gameData) {
      socket.join(gameId);
      socket.emit('gameJoined', JSON.parse(gameData));
    }
  });

  socket.on('move', async ({ gameId, fen }) => {
    await redis.set(`game:${gameId}`, JSON.stringify({ fen }));
    io.to(gameId).emit('move', { gameId, fen });

    // Update MongoDB
    await Game.findOneAndUpdate({ gameId }, { fen });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};
