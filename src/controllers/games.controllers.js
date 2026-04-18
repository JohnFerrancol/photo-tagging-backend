import { getAllGames } from '../services/games.services.js';

const getGamesInformation = async (req, res) => {
  try {
    const games = await getAllGames();

    res.json({
      status: 'success',
      message: 'Received all games',
      games: games,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { getGamesInformation };
