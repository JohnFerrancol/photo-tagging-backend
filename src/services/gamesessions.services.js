import { prisma } from '../config/prisma.js';

const insertGameSession = async (gameId) => {
  return await prisma.gameSession.create({
    data: {
      gameId: gameId,
    },
  });
};

export { insertGameSession };
