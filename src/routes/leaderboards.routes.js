import { Router } from 'express';
import { getLeaderBoardEntries } from '../controllers/leaderboards.controllers.js';

const router = Router();

router.get('/:gameId', getLeaderBoardEntries);

export default router;
