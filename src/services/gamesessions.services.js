import { prisma } from '../config/prisma.js';

const getGameSessionInformation = async (sessionId) => {
  return await prisma.gameSession.findUnique({
    where: {
      id: sessionId,
    },
  });
};

const insertGameSession = async (gameId) => {
  return await prisma.gameSession.create({
    data: {
      gameId: gameId,
    },
  });
};

const insertFoundCharacter = async (sessionId, characterId) => {
  return await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: {
      foundCharacterIds: {
        push: characterId,
      },
    },
  });
};

const updateGameSession = async (sessionId, endTime) => {
  return await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: {
      endTime: endTime,
      completed: true,
    },
  });
};

export {
  getGameSessionInformation,
  insertGameSession,
  insertFoundCharacter,
  updateGameSession,
};
