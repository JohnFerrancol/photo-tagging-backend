import { prisma } from '../config/prisma.js';

const getAllGames = async () => {
  return await prisma.game.findMany();
};

const insertGame = async (name, imageUrl) => {
  return await prisma.game.create({
    data: {
      name: name,
      imageUrl: imageUrl,
    },
  });
};

export { getAllGames, insertGame };
