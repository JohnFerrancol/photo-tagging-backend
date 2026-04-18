import { prisma } from '../config/prisma.js';

const insertGame = async (name, imageUrl) => {
  return await prisma.game.create({
    data: {
      name: name,
      imageUrl: imageUrl,
    },
  });
};

export { insertGame };
