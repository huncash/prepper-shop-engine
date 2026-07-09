import type { Product } from "@shared/lib/data-provider";

function getApiBaseUrl(): string {
  return process.env.API_URL ?? "http://localhost:4000";
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json() as Promise<Product[]>;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const response = await fetch(`${getApiBaseUrl()}/api/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  return response.json() as Promise<Product>;
}
