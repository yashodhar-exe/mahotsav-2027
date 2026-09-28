const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDirs = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../src/clouds')
];

const processFiles = async () => {
  for (const dir of inputDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
        const inputPath = path.join(dir, file);
        const parsedPath = path.parse(inputPath);
        const outputPath = path.join(dir, parsedPath.name + '.avif');
        
        console.log(`Converting ${file} to AVIF...`);
        try {
          await sharp(inputPath)
            .avif({ quality: 50 })
            .toFile(outputPath);
          console.log(`Successfully converted ${file}`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
  }
};

processFiles();
