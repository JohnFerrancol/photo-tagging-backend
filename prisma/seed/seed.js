import { prisma } from '../../src/config/prisma.js';
import { games, leaderboardSeed } from './data.js';
import { uploadImage } from './upload.js';

import { insertGame } from '../../src/services/games.services.js';
import { insertCharacter } from '../../src/services/characters.services.js';
import { insertLeaderboardEntry } from '../../src/services/leaderboards.services.js';

async function main() {
  console.log('Seeding Database.....');

  // Reset DB
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "GameSession" RESTART IDENTITY CASCADE;'
  );

  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Leaderboard" RESTART IDENTITY CASCADE;'
  );

  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Character" RESTART IDENTITY CASCADE;'
  );

  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Game" RESTART IDENTITY CASCADE;'
  );

  console.log('DB reset.');

  // ======================
  // Add Games
  // ======================
  for (const game of games) {
    console.log(` Uploading game image: ${game.name}`);

    // 1. Upload game image
    const gameImageUrl = await uploadImage(game.imagePath, game.folder);

    // 2. Insert game into DB
    const createdGame = await insertGame(game.name, gameImageUrl);

    console.log(`Game created: ${createdGame.name}`);

    // 3. Process characters
    for (const char of game.characters) {
      console.log(`Uploading character: ${char.name}`);

      const charImageUrl = await uploadImage(char.imagePath, game.folder);

      await insertCharacter(
        char.name,
        charImageUrl,
        char.x,
        char.y,
        char.xTol,
        char.yTol,
        createdGame.id
      );

      console.log(`Character added: ${char.name}`);
    }
  }

  // ======================
  // Add Dummy Leaderboard Data
  // ======================
  for (const game of leaderboardSeed) {
    for (const entry of game.entries) {
      await insertLeaderboardEntry(entry.name, entry.time, game.gameId);
    }
  }

  console.log('Added Leaderboard entries');

  console.log('Database Seeded!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
