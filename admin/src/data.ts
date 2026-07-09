import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

import type { Product } from "@shared/lib/data-provider";

import adminConfig from "@shared/src/config/api.json";

const sourcePath = process.env.PRIVATE_DATA_PATH ?? adminConfig.privateDataPath;

interface SourceEntry {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}

interface SourceData {
  products: SourceEntry[];
}

export function loadSourceData(): Product[] {
  const fullPath = resolve(sourcePath);

  if (!existsSync(fullPath)) {
    throw new Error(`Private data not found: ${fullPath}`);
  }

  const raw = readFileSync(fullPath, "utf-8");
  const data = JSON.parse(raw) as SourceData;

  return data.products.map((entry) => ({
    id: entry.id,
    name: entry.name,
    price: entry.price,
    description: entry.description,
    imageUrl: entry.imageUrl,
  }));
}
