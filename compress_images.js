import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'client/public/images');
const files = fs.readdirSync(dir);

async function processImages() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const newPath = path.join(dir, path.basename(file, ext) + '.webp');
      console.log(`Converting ${file} to WebP...`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 75 })
          .toFile(newPath);
        
        // Remove old file
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  console.log('Done converting images.');
}

processImages().catch(console.error);
