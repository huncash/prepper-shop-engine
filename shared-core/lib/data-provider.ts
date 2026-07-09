import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type UserRole = "guest" | "user" | "admin" | "superadmin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: number;
  slug?: string;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  editable?: boolean;
  specs?: Record<string, string | number>;
  category?: string;
  badge?: string;
}

interface SourceData {
  users?: User[];
  products: Product[];
}

const sourcePath = resolve(
  process.env.PRODUCTS_DB_PATH ?? "/root/private_data/source_data.json"
);

function loadSource(): SourceData {
  const raw = readFileSync(sourcePath, "utf-8");
  return JSON.parse(raw) as SourceData;
}

export function getProducts(): Product[] {
  return loadSource().products;
}

export function getProductById(id: number): Product | null {
  return loadSource().products.find((p) => p.id === id) ?? null;
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
