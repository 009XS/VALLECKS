import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR = path.join('public', 'static', 'img');
const OUTPUT_DIR = path.join(INPUT_DIR, 'optimized');

// Helper to sanitize filenames according to Phase 6C rules:
// - Lowercase
// - Replace spaces with hyphens
// - Remove parentheses or replace double hyphens
// - e.g. "Rancho Viejo.jpg" -> "rancho-viejo.webp"
// - e.g. "unnamed (1).jpg" -> "unnamed-1.webp"
function sanitizeFilename(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  
  const sanitizedBase = base
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[()]/g, '')        // Remove parentheses
    .replace(/--+/g, '-')        // Clean up multiple hyphens
    .replace(/^-+|-+$/g, '');    // Trim hyphens from start/end
    
  return `${sanitizedBase}.webp`;
}

async function convertImages() {
  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Read files from inputs
    const files = await fs.readdir(INPUT_DIR);
    
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return validExtensions.includes(ext);
    });
    
    if (imageFiles.length === 0) {
      console.log('No images found for conversion.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images to convert to WebP...\n`);
    
    const results = [];
    
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputFilename = sanitizeFilename(file);
      const outputPath = path.join(OUTPUT_DIR, outputFilename);
      
      const inputStats = await fs.stat(inputPath);
      const originalSizeKB = inputStats.size / 1024;
      
      // Perform Sharp WebP conversion with quality 80, no upscaling
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      const outputStats = await fs.stat(outputPath);
      const webpSizeKB = outputStats.size / 1024;
      
      const reduction = ((originalSizeKB - webpSizeKB) / originalSizeKB) * 100;
      
      results.push({
        source: file,
        output: outputFilename,
        origKB: originalSizeKB.toFixed(2),
        webpKB: webpSizeKB.toFixed(2),
        reduction: reduction.toFixed(1)
      });
    }
    
    // Print conversion table
    console.log('=' .repeat(100));
    console.log(
      `${'SOURCE FILE'.padEnd(45)} | ${'OUTPUT FILE'.padEnd(30)} | ${'ORIGINAL KB'.padStart(12)} | ${'WEBP KB'.padStart(10)} | ${'REDUCTION %'.padStart(12)}`
    );
    console.log('=' .repeat(100));
    
    let totalOrig = 0;
    let totalWebp = 0;
    
    for (const res of results) {
      console.log(
        `${res.source.padEnd(45)} | ${res.output.padEnd(30)} | ${res.origKB.padStart(12)} | ${res.webpKB.padStart(10)} | ${res.reduction.padStart(11)}%`
      );
      totalOrig += parseFloat(res.origKB);
      totalWebp += parseFloat(res.webpKB);
    }
    
    console.log('=' .repeat(100));
    const overallReduction = ((totalOrig - totalWebp) / totalOrig) * 100;
    console.log(
      `${'TOTAL / PROMEDIO'.padEnd(45)} | ${''.padEnd(30)} | ${totalOrig.toFixed(2).padStart(12)} | ${totalWebp.toFixed(2).padStart(10)} | ${overallReduction.toFixed(1).padStart(11)}%`
    );
    console.log('=' .repeat(100));
    console.log(`WebP conversion completed! Outputs saved to ${OUTPUT_DIR}\n`);
    
  } catch (error) {
    console.error('Error during image conversion:', error);
  }
}

convertImages();
