import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public/landing-pages/secret-pathways-assets/generated');

const projects = [
  { svg: 'kage-logicure.svg', webp: 'kage-logicure.webp' },
  { svg: 'kage-mayavihin.svg', webp: 'kage-mayavihin.webp' },
  { svg: 'kage-synqro.svg', webp: 'kage-synqro.webp' },
  { svg: 'kage-satqueryx.svg', webp: 'kage-satqueryx.webp' }
];

async function generateHiResWebP() {
  console.log('Rendering ultra-high resolution WebP thumbnails...');
  for (const proj of projects) {
    const svgPath = path.join(assetsDir, proj.svg);
    const webpPath = path.join(assetsDir, proj.webp);

    if (fs.existsSync(svgPath)) {
      const svgBuffer = fs.readFileSync(svgPath);
      await sharp(svgBuffer, { density: 300 })
        .resize(1920, 1080, { fit: 'cover' })
        .webp({ quality: 92, compressionLevel: 6 })
        .toFile(webpPath);

      const stats = fs.statSync(webpPath);
      console.log(`✓ Rendered ${proj.webp} (${Math.round(stats.size / 1024)} KB, 1920x1080 @ 300 DPI)`);
    } else {
      console.error(`Error: File ${svgPath} not found!`);
    }
  }
}

generateHiResWebP().catch(err => {
  console.error('Error generating hi-res WebP:', err);
  process.exit(1);
});
