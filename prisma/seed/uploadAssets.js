import fs from 'fs';
import path from 'path';
import { games } from './data.js';
import { fileURLToPath } from 'url';
import { uploadImage } from './upload.js';

// Get current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct file path
const OUTPUT_FILE = path.resolve(__dirname, 'uploadedData.json');

async function uploadAll() {
  const uploadedGames = [];

  for (const game of games) {
    console.log(`Uploading game: ${game.name}`);

    const gameImageUrl = await uploadImage(game.imagePath, game.folder);

    const uploadedCharacters = [];

    for (const char of game.characters) {
      console.log(`Uploading character: ${char.name}`);

      const charImageUrl = await uploadImage(char.imagePath, game.folder);

      uploadedCharacters.push({
        ...char,
        imageUrl: charImageUrl,
      });
    }

    uploadedGames.push({
      name: game.name,
      imageUrl: gameImageUrl,
      characters: uploadedCharacters,
    });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uploadedGames, null, 2));

  console.log('Upload complete. Data saved to uploadedData.json');
}

uploadAll();
