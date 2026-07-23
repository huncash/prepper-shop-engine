import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import processorConfig from "../src/config/image-processor.json";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function resolvePath(path: string): string {
  return resolve(packageRoot, path);
}

const inputDir = resolvePath(processorConfig.inputDir);
const outputDir = resolvePath(processorConfig.outputDir);
const extensions = new Set(
  processorConfig.extensions.map((extension) => extension.toLowerCase())
);

function collectImages(directory: string): string[] {
  const images: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      images.push(...collectImages(fullPath));
      continue;
    }

    if (extensions.has(extname(entry).toLowerCase())) {
      images.push(fullPath);
    }
  }

  return images;
}

async function processImage(inputPath: string): Promise<void> {
  const relativeInput = relative(inputDir, inputPath);
  const outputPath = join(
    outputDir,
    `${relativeInput.replace(/\.[^.]+$/, "")}.webp`
  );

  mkdirSync(dirname(outputPath), { recursive: true });

  await sharp(inputPath)
    .rotate()
    .resize(processorConfig.maxWidth, processorConfig.maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: processorConfig.quality })
    .toFile(outputPath);
}

async function main(): Promise<void> {
  if (!existsSync(inputDir)) {
    throw new Error(`Input directory not found: ${inputDir}`);
  }

  mkdirSync(outputDir, { recursive: true });

  const images = collectImages(inputDir);

  if (images.length === 0) {
    console.log("No images found.");
    return;
  }

  for (const imagePath of images) {
    await processImage(imagePath);
    console.log(`${relative(inputDir, imagePath)} -> webp`);
  }

  console.log(`Processed ${images.length} image(s).`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
