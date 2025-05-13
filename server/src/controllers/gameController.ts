import { Request, Response } from 'express';
import Game from '../models/Game';
import { v4 as uuidv4 } from 'uuid';

export const createGame = async (req: Request, res: Response) => {
  try {
    const { fen, userId } = req.body;
    const gameId = uuidv4();
    const game = new Game({
      gameId,
      players: [userId],
      fen,
    });
    await game.save();
    res.status(201).json({ gameId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
};

export const getGame = async (req: Request, res: Response) => {
  try {
    const game = await Game.findOne({ gameId: req.params.gameId });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
};
