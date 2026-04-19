import { getAllGames, getSingleGame } from '../services/games.services.js';
import { getSingleCharacterData } from '../services/characters.services.js';
import { insertGameSession } from '../services/gamesessions.services.js';

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

const startGame = async (req, res) => {
  try {
    const gameId = Number(req.params.gameId);

    const gameSessionData = await insertGameSession(gameId);

    res.status(201).json({
      status: 'success',
      message: `Create Game session id: ${gameSessionData.id}`,
      session: {
        id: gameSessionData.id,
        startTime: gameSessionData.startTime,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const guessCharacter = async (req, res) => {
  try {
    const gameId = Number(req.params.gameId);
    const { characterName, x, y } = req.body;

    const characterData = await getSingleCharacterData(gameId, characterName);

    if (!characterData) {
      return res.status(404).json({
        status: 'error',
        message: 'Character not found',
        correct: false,
      });
    }

    const withinX =
      Math.abs(x - characterData.x_value) <= characterData.x_tolerance;

    const withinY =
      Math.abs(y - characterData.y_value) <= characterData.y_tolerance;

    const correct = withinX && withinY;

    res.json({
      status: 'success',
      message: 'Verification Done',
      correct,
      character: characterData.name,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export {
  getGamesInformation,
  getSingleGameInformation,
  startGame,
  guessCharacter,
};
