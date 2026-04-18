import { prisma } from '../config/prisma.js';

const insertCharacter = async (
  name,
  imageUrl,
  x_val,
  x_tol,
  y_val,
  y_tol,
  gameId
) => {
  return await prisma.character.create({
    data: {
      name: name,
      imageUrl: imageUrl,
      x_value: x_val,
      x_tolerance: x_tol,
      y_value: y_val,
      y_tolerance: y_tol,
      gameId: gameId,
    },
  });
};

export { insertCharacter };
