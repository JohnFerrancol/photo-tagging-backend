import { prisma } from '../config/prisma.js';

const getLeaderBoardEntriesByGameId = async (gameId) => {
  return prisma.leaderboard.findMany({
    where: {
      gameId: gameId,
    },
    orderBy: {
      time: 'asc',
    },
  });
};

const insertLeaderboardEntry = async (playerName, time, gameId) => {
  return await prisma.leaderboard.create({
    data: {
      playerName: playerName,
      time: time,
      gameId: gameId,
    },
  });
};

export { getLeaderBoardEntriesByGameId, insertLeaderboardEntry };
