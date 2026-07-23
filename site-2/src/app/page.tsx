import { Suspense } from "react";

import { authProvider } from "@shared/auth/auth-provider";
import { getProducts } from "@shared/lib/data-provider";
import { Catalog } from "@shared/components/Catalog";
import { CtaSection } from "@shared/components/landing/CtaSection";
import { FeatureGrid } from "@shared/components/landing/FeatureGrid";
import { HeroSection } from "@shared/components/landing/HeroSection";
import { CONTENT } from "../data/content";

function formatHuf(amount: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function HomePage() {
  const products = getProducts().map((p) => ({
    ...p,
    editable: authProvider.isAdmin(),
  }));

  const { hero, fixedPrice, valueProps, audience, replacement, categories, cta, catalog } = CONTENT;

  return (
    <>
      <HeroSection
        title={hero.title}
        subtitle={`${hero.subtitle} ${hero.deliveryNote}`}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
        imageUrl={hero.image}
        className="bg-primary text-primary-foreground [&_h1]:text-primary-foreground [&_p]:text-primary-soft"
      />

      <section className="border-b border-border bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{fixedPrice.badge}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{fixedPrice.heading}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{fixedPrice.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fixedPrice.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{item.name}</p>
                <p className="mt-2 text-xl font-bold text-foreground">{formatHuf(item.priceNetHuf)}</p>
                <p className="text-xs text-muted-foreground">nettó / db · áfás számla</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        heading={valueProps.heading}
        features={[...valueProps.items]}
        className="bg-surface"
      />

      <FeatureGrid
        heading={audience.heading}
        features={[...audience.items]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{replacement.badge}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{replacement.heading}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{replacement.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">{replacement.note}</p>
        <img
          src={replacement.image}
          alt="Projektor lámpamodul csere sematikus vázlata"
          className="mt-6 max-w-md rounded border border-border bg-surface p-4"
          loading="lazy"
        />
      </section>

      <FeatureGrid
        heading={categories.heading}
        features={categories.items.map((c) => ({
          icon: "💡",
          title: c.name,
          description: `${c.technology} — ${c.description}`,
        }))}
        className="bg-surface"
      />

      <CtaSection
        heading={cta.heading}
        subheading={cta.description}
        ctaLabel={cta.cta.label}
        ctaHref={cta.cta.href}
        variant="dark"
        className="bg-primary text-primary-foreground [&_h2]:text-primary-foreground [&_p]:text-primary-soft"
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold">{catalog.heading}</h2>
        <Suspense>
          <Catalog products={products} />
        </Suspense>
      </section>
    </>
  );
}
