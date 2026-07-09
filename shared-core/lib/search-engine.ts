import lunr from "lunr";

import type { Product } from "@shared/lib/data-provider";

let index: lunr.Index | null = null;
let indexed: Product[] = [];

function buildIndex(products: Product[]): lunr.Index {
  return lunr(function () {
    this.ref("id");
    this.field("name", { boost: 10 });
    this.field("description");

    for (const product of products) {
      this.add({
        id: product.id,
        name: product.name,
        description: product.description ?? "",
      });
    }
  });
}

function getIndex(products: Product[]): lunr.Index {
  if (!index || indexed !== products) {
    index = buildIndex(products);
    indexed = products;
  }

  return index;
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim();

  if (!q) {
    return products;
  }

  const idx = getIndex(products);

  try {
    const results = idx.search(`${q}*`);
    const ids = new Set(results.map((r) => Number(r.ref)));
    return products.filter((p) => ids.has(p.id));
  } catch {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(q.toLowerCase())
    );
  }
}
