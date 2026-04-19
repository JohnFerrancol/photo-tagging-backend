import { Router } from 'express';
import {
  getGamesInformation,
  getSingleGameInformation,
  guessCharacter,
  startGame,
} from '../controllers/games.controllers.js';

const router = Router();

router.get('/', getGamesInformation);
router.get('/:gameId', getSingleGameInformation);
router.post('/:gameId/start', startGame);
router.post('/:gameId/guess', guessCharacter);

export default router;
