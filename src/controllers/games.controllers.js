import { getAllGames, getSingleGame } from '../services/games.services.js';

const getGamesInformation = async (req, res) => {
  try {
    const games = await getAllGames();

    if (games) {
      res.json({
        status: 'success',
        message: 'Received all games',
        games: games,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Games not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getSingleGameInformation = async (req, res) => {
  try {
    const gameId = Number(req.params.gameId);
    const game = await getSingleGame(gameId);

    if (game) {
      res.json({
        status: 'success',
        message: 'Received game information',
        game: game,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Game not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { getGamesInformation, getSingleGameInformation };
