const fs = require('fs');
const content = fs.readFileSync('client/src/components/galleryImages.ts', 'utf-8');
const lines = content.split('\n');
let idx = 1;
lines.forEach((line, i) => {
  if (line.trim().startsWith('"')) {
    console.log(idx + ': ' + line.trim());
    idx++;
  }
});
