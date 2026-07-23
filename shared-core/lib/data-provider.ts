import "server-only";

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import type { Product, User, UserRole } from "./types";

export type { Product, User, UserRole };

/** Belső user rekord — passwordHash soha ne kerüljön publikus DTO-ba. */
export interface StoredUser extends User {
  passwordHash?: string;
}

export type RawProduct = Product & Record<string, unknown>;

interface SourceData {
  users?: StoredUser[];
  products: RawProduct[];
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
export function getRawProducts(): RawProduct[] {
  return loadSource().products;
}

export function getRawProductById(id: number): RawProduct | null {
  return getRawProducts().find((p) => p.id === id) ?? null;
}

function persistSource(data: SourceData): void {
  mkdirSync(dirname(sourcePath), { recursive: true });
  const tmp = `${sourcePath}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, sourcePath);
}

/** Teljes private source mentése (admin). */
export function saveSourceData(data: SourceData): void {
  if (!Array.isArray(data.products)) {
    throw new Error("Invalid source: products must be an array");
  }
  persistSource({
    users: data.users,
    products: data.products,
  });
}

/** Új vagy meglévő nyers termék upsert (admin). */
export function upsertRawProduct(product: RawProduct): RawProduct {
  if (typeof product.id !== "number" || !Number.isFinite(product.id)) {
    throw new Error("Product id must be a finite number");
  }
  if (typeof product.name !== "string" || !product.name.trim()) {
    throw new Error("Product name required");
  }
  if (typeof product.price !== "number" || !Number.isFinite(product.price)) {
    throw new Error("Product price must be a finite number");
  }

  const source = loadSource();
  const idx = source.products.findIndex((p) => p.id === product.id);
  const cleaned = stripDangerousKeys(product);
  if (idx >= 0) {
    source.products[idx] = { ...source.products[idx], ...cleaned, id: product.id };
  } else {
    source.products.push(cleaned);
  }
  persistSource(source);
  return getRawProductById(product.id)!;
}

export function deleteRawProduct(id: number): boolean {
  const source = loadSource();
  const before = source.products.length;
  source.products = source.products.filter((p) => p.id !== id);
  if (source.products.length === before) return false;
  persistSource(source);
  return true;
}

function stripDangerousKeys(value: RawProduct): RawProduct {
  const banned = new Set(["__proto__", "prototype", "constructor"]);
  return Object.fromEntries(
    Object.entries(value).filter(([key]) => !banned.has(key)),
  ) as RawProduct;
}

export function getUsers(): StoredUser[] {
  return (loadSource().users ?? []).map((u) => ({
    ...u,
    id: String(u.id),
  }));
}

export function getUserById(id: string): StoredUser | null {
  return getUsers().find((u) => u.id === id) ?? null;
}

export function getUserByEmail(email: string): StoredUser | null {
  const normalized = email.trim().toLowerCase();
  return (
    getUsers().find((u) => u.email.trim().toLowerCase() === normalized) ?? null
  );
}

export function closeDataProvider(): void {}
