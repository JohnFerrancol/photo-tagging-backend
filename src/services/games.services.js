import { prisma } from '../config/prisma.js';

const getAllGames = async () => {
  return await prisma.game.findMany();
};

const getSingleGame = async (gameId) => {
  return await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      characters: true,
    },
  });
};

const insertGame = async (name, imageUrl) => {
  return await prisma.game.create({
    data: {
      name: name,
      imageUrl: imageUrl,
    },
  });
};

export { getAllGames, getSingleGame, insertGame };
