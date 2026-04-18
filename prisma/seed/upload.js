import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { supabase } from '../../src/config/supabase.js';

// Get current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Navigate to the dummyFiles directory
const IMAGE_DIR = path.resolve(__dirname, '../../imageFiles');

// Bucket Name
const BUCKET = 'game-images';

export const uploadImage = async (relativePath, folder) => {
  try {
    // Build the File Path
    const filePath = path.join(IMAGE_DIR, folder, relativePath);

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    const fileName = `${Date.now()}-${path.basename(relativePath)}`;
    const storagePath = `${folder}/${fileName}`;

    // Upload to Supabase
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: getContentType(fileName),
        upsert: true,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Upload error:', err);
    throw err;
  }
};

const getContentType = (fileName) => {
  if (fileName.endsWith('.png')) return 'image/png';
  if (fileName.endsWith('.webp')) return 'image/webp';
  if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg'))
    return 'image/jpeg';
  return 'application/octet-stream';
};
