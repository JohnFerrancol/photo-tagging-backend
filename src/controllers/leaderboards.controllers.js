import { getLeaderBoardEntriesByGameId } from '../services/leaderboards.services.js';
import { getSingleGame } from '../services/games.services.js';

const getLeaderBoardEntries = async (req, res) => {
  try {
    const gameId = Number(req.params.gameId);
    const leaderboard = await getLeaderBoardEntriesByGameId(gameId);
    const gameInformation = await getSingleGame(gameId);

    if (leaderboard.length > 0) {
      res.json({
        status: 'success',
        message: 'Received leaderboard information',
        leaderboard: leaderboard,
        game: { id: gameInformation.id, name: gameInformation.name },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Leaderboard not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { getLeaderBoardEntries };
