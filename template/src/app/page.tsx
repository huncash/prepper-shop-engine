import { Suspense } from "react";

import { authProvider } from "@shared/auth/auth-provider";
import { getProducts } from "@shared/lib/data-provider";
import { Catalog } from "@shared/components/Catalog";
import { HeroSection } from "@shared/components/landing/HeroSection";

export default function HomePage() {
  const products = getProducts().map((p) => ({
    ...p,
    editable: authProvider.isAdmin(),
  }));

  return (
    <>
      <HeroSection
        title="SITE_TITLE"
        subtitle="SITE_SUBTITLE"
        ctaLabel="Termékek megtekintése"
        ctaHref="/termekek"
        secondaryLabel="Kapcsolat"
        secondaryHref="/kapcsolat"
      />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold">Termékkatalógus</h2>
        <Suspense>
          <Catalog products={products} />
        </Suspense>
      </section>
    </>
  );
}
