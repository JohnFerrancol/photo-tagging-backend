import { Router } from 'express';
import { getGamesInformation } from '../controllers/games.controllers.js';

const router = Router();

router.get('/', getGamesInformation);

export default router;
