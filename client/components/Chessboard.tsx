'use client';

import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000');

export default function ChessboardComponent() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('move', ({ gameId: receivedGameId, fen: newFen }) => {
      if (receivedGameId === gameId) {
        setFen(newFen);
        game.load(newFen);
      }
    });

    socket.on('gameCreated', ({ gameId }) => {
      setGameId(gameId);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Auto-promote to queen
      });

      if (move === null) return false;

      const newFen = game.fen();
      setFen(newFen);

      if (gameId) {
        socket.emit('move', { gameId, fen: newFen });
      } else {
        socket.emit('createGame', { fen: newFen });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="w-[400px]">
      <Chessboard position={fen} onPieceDrop={onDrop} />
    </div>
  );
}
