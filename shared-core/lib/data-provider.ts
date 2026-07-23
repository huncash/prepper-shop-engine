import "server-only";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { Product, User, UserRole } from "./types";

export type { Product, User, UserRole };

interface SourceData {
  users?: User[];
  products: Array<Product & Record<string, unknown>>;
}

const sourcePath = resolve(
  process.env.PRODUCTS_DB_PATH ?? "/root/private_data/source_data.json"
);

const SENSITIVE_SPEC_KEY =
  /^(forrás|forras|beszerz|beszállít|beszallit|cost|purchase|wholesale|supplier|gyáriár|gyariar|nettobeszerz)/i;

const SENSITIVE_TOP_LEVEL = new Set([
  "bulbOnlyNetHuf",
  "costPrice",
  "purchasePrice",
  "wholesalePrice",
  "supplier",
  "forras",
  "Forrás",
  "margin",
  "marginMultiplier",
]);

function loadSource(): SourceData {
  const raw = readFileSync(sourcePath, "utf-8");
  return JSON.parse(raw) as SourceData;
}

/** Eltávolítja a beszállítói / beszerzési mezőket a publikus DTO-ból. */
export function toPublicProduct(
  product: Product & Record<string, unknown>
): Product {
  const specs = product.specs
    ? Object.fromEntries(
        Object.entries(product.specs).filter(
          ([key]) => !SENSITIVE_SPEC_KEY.test(key)
        )
      )
    : undefined;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category,
    badge: product.badge,
    specs: specs && Object.keys(specs).length > 0 ? specs : undefined,
  };
}

function stripSensitiveTopLevel(
  product: Product & Record<string, unknown>
): Product & Record<string, unknown> {
  const copy = { ...product };
  for (const key of SENSITIVE_TOP_LEVEL) {
    delete copy[key];
  }
  return copy;
}

export function getProducts(): Product[] {
  return loadSource().products.map((p) =>
    toPublicProduct(stripSensitiveTopLevel(p))
  );
}

export function getProductById(id: number): Product | null {
  const product = loadSource().products.find((p) => p.id === id);
  if (!product) return null;
  return toPublicProduct(stripSensitiveTopLevel(product));
}

/** Admin / belső használatra — sanitizálás nélkül. */
export function getRawProducts(): Array<Product & Record<string, unknown>> {
  return loadSource().products;
}

export function getUsers(): User[] {
  return loadSource().users ?? [];
}

export function getUserById(id: string): User | null {
  return getUsers().find((u) => u.id === id) ?? null;
}

export function getUserByEmail(email: string): User | null {
  return getUsers().find((u) => u.email === email) ?? null;
}

export function closeDataProvider(): void {}
