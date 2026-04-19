import { getAllGames, getSingleGame } from '../services/games.services.js';
import { getSingleCharacterData } from '../services/characters.services.js';
import { insertLeaderboardEntry } from '../services/leaderboards.services.js';
import {
  getGameSessionInformation,
  insertGameSession,
  insertFoundCharacter,
  updateGameSession,
} from '../services/gamesessions.services.js';

import newGuessValidator from '../validators/guesses.validators.js';
import finishGameValidator from '../validators/finish.validators.js';
import { validationResult, matchedData } from 'express-validator';

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

const guessCharacter = [
  newGuessValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid data',
          errors: errors.array(),
        });
      }

      const gameId = Number(req.params.gameId);
      const { characterName, x, y, sessionId } = matchedData(req);

      // Checking whether the session is in the database
      const sessionData = await getGameSessionInformation(sessionId);
      if (!sessionData) {
        return res.status(404).json({
          status: 'error',
          message: 'Session not found',
        });
      }

      // Checking whether the session even belongs to the game
      if (sessionData.gameId !== gameId) {
        return res.status(400).json({
          status: 'error',
          message: 'Session does not belong to this game',
        });
      }

      // Checking whether the character is in the database
      const characterData = await getSingleCharacterData(gameId, characterName);
      if (!characterData) {
        return res.status(404).json({
          status: 'error',
          message: 'Character not found',
        });
      }

      // Checking whether the character is already found
      if (sessionData.foundCharacterIds.includes(characterData.id)) {
        return res.status(400).json({
          status: 'error',
          message: 'Character already found',
          correct: false,
        });
      }

      // Checking the tolerance and whether the x and y values given by the user is correct
      const withinX =
        Math.abs(x - characterData.x_value) <= characterData.x_tolerance;

      const withinY =
        Math.abs(y - characterData.y_value) <= characterData.y_tolerance;

      const correct = withinX && withinY;

      if (correct) {
        await insertFoundCharacter(sessionId, characterData.id);
      }

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
  },
];

const finishGame = [
  finishGameValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid data',
          errors: errors.array(),
        });
      }

      const gameId = Number(req.params.gameId);
      const { sessionId, playerName } = matchedData(req);

      // Checking whether the session is in the database
      const sessionData = await getGameSessionInformation(sessionId);
      if (!sessionData) {
        return res.status(404).json({
          status: 'error',
          message: 'Session not found',
        });
      }

      // Checking whether the session even belongs to the game
      if (sessionData.gameId !== gameId) {
        return res.status(400).json({
          status: 'error',
          message: 'Session does not belong to this game',
        });
      }

      // Checking whether the session is already completed
      if (sessionData.completed) {
        return res.status(400).json({
          status: 'error',
          message: 'Session is already completed',
        });
      }

      // Checking all characters are found
      const gameData = await getSingleGame(gameId);
      if (sessionData.foundCharacterIds.length !== gameData.characters.length) {
        return res.status(400).json({
          status: 'error',
          message: 'All Characters have not been found yet',
        });
      }

      // Compute the time
      const endTime = new Date();
      const startTime = new Date(sessionData.startTime);

      const completionTime =
        Math.round(((endTime - startTime) / 1000) * 10) / 10;

      // Update the game session entry
      await updateGameSession(sessionId, endTime);

      // Insert leaderboard entry
      await insertLeaderboardEntry(playerName, completionTime, gameId);

      res.json({
        status: 'success',
        message: 'Game Completed',
        data: {
          time: completionTime,
          completed: true,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
];

export {
  getGamesInformation,
  getSingleGameInformation,
  startGame,
  guessCharacter,
  finishGame,
};
