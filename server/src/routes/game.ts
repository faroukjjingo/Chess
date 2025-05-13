import express from 'express';
import { createGame, getGame } from '../controllers/gameController';

const router = express.Router();

router.post('/', createGame);
router.get('/:gameId', getGame);

export default router;
