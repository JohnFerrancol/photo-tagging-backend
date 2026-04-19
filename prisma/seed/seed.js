import { prisma } from '../../src/config/prisma.js';
import { leaderboardSeed } from './data.js';
import { insertGame } from '../../src/services/games.services.js';
import { insertCharacter } from '../../src/services/characters.services.js';
import { insertLeaderboardEntry } from '../../src/services/leaderboards.services.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadedGames = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './uploadedData.json'), 'utf-8')
);

async function main() {
  console.log('Seeding Database.....');

  // ======================
  // Add Games
  // ======================
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

  console.log('DB reset.\n');

  // ======================
  // Add Games
  // ======================
  for (const game of uploadedGames) {
    console.log(`\nCreating game: ${game.name}`);

    const createdGame = await insertGame(game.name, game.imageUrl);

    console.log(`Game created: ${createdGame.name}`);

    for (const char of game.characters) {
      console.log(`Adding character: ${char.name}`);

      await insertCharacter(
        char.name,
        char.imageUrl,
        char.x,
        char.xTol,
        char.y,
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
