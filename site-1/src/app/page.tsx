import { Suspense } from "react";

import { authProvider } from "@shared/auth/auth-provider";
import { getProducts } from "@shared/lib/data-provider";
import { Catalog } from "@shared/components/Catalog";
import { SITE_CONTENT } from "@shared/data/site-content";

export default function HomePage() {
  const products = getProducts().map((p) => ({
    ...p,
    editable: authProvider.isAdmin(),
  }));

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          {SITE_CONTENT["vrgo"].heroTitle}
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold">Termékkatalógus</h2>
        <Suspense>
          <Catalog products={products} />
        </Suspense>
      </section>
    </>
  );
}
