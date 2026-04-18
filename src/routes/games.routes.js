import { Router } from 'express';
import {
  getGamesInformation,
  getSingleGameInformation,
} from '../controllers/games.controllers.js';

const router = Router();

router.get('/', getGamesInformation);
router.get('/:gameId', getSingleGameInformation);

export default router;
