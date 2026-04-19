import { Router } from 'express';
import {
  getGamesInformation,
  getSingleGameInformation,
  guessCharacter,
} from '../controllers/games.controllers.js';

const router = Router();

router.get('/', getGamesInformation);
router.get('/:gameId', getSingleGameInformation);
router.post('/:gameId/guess', guessCharacter);

export default router;
