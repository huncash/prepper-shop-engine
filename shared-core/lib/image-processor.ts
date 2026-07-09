import {
  existsSync,
  mkdirSync,
  watch,
  type WatchEventType,
} from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import processorConfig from "@shared/src/config/image-processor.json";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const watchDir = resolve(
  process.env.IMAGE_WATCH_DIR ??
    join(packageRoot, "public", "images")
);

const outputDir = resolve(
  process.env.IMAGE_OUTPUT_DIR ??
    join(packageRoot, "public", "images", "webp")
);

const extensions = new Set(
  processorConfig.extensions
    .filter((ext) => ext !== ".webp")
    .map((ext) => ext.toLowerCase())
);

async function convertToWebp(inputPath: string): Promise<void> {
  const rel = relative(watchDir, inputPath);
  const outputPath = join(outputDir, `${rel.replace(/\.[^.]+$/, "")}.webp`);

  mkdirSync(dirname(outputPath), { recursive: true });

  await sharp(inputPath)
    .rotate()
    .resize(processorConfig.maxWidth, processorConfig.maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: processorConfig.quality })
    .toFile(outputPath);

  console.log(`converted: ${rel} → webp`);
}

function isImage(filename: string): boolean {
  return extensions.has(extname(filename).toLowerCase());
}

if (!existsSync(watchDir)) {
  mkdirSync(watchDir, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });

console.log(`Watching: ${watchDir}`);

watch(watchDir, { recursive: true }, (event: WatchEventType, filename: string | null) => {
  if (!filename || !isImage(filename)) {
    return;
  }

  const fullPath = join(watchDir, filename);

  if (!existsSync(fullPath)) {
    return;
  }

  convertToWebp(fullPath).catch((error: unknown) => {
    console.error(`Failed: ${filename}`, error);
  });
});
