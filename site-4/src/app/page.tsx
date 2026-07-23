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

  const {
    hero,
    gallery,
    services,
    useCases,
    categories,
    rentalItems,
    saleItems,
    process,
    info,
    cta,
    catalog,
  } = CONTENT;

  return (
    <>
      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
        imageUrl={hero.image}
        className="bg-section-dark text-section-dark-foreground [&_h1]:text-section-dark-foreground [&_p]:text-section-dark-foreground/90"
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {gallery.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
              <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FeatureGrid heading={services.heading} features={services.items} className="bg-canvas" />

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-brand">{useCases.heading}</h2>
          <FeatureGrid
            heading=""
            features={useCases.items}
            className="bg-transparent py-8 text-section-dark-foreground [&_.bg-background]:bg-section-dark [&_.border-border]:border-section-dark-foreground/20 [&_h2]:hidden [&_h3]:text-section-dark-foreground [&_p]:text-section-dark-foreground/90"
          />
          <img
            src={useCases.image}
            alt="Belvárosi sétálóutca fölött telepített dekorponyva UV-fényben"
            className="mt-8 max-w-md rounded-md border border-section-dark-foreground/15 object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="border-y border-border bg-canvas-warm py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight">{categories.heading}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {categories.items.map((cat) => (
              <article key={cat.slug} className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{cat.tagline}</p>
                <h3 className="mt-2 font-semibold">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold">{rentalItems.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{rentalItems.disclaimer}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rentalItems.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.priceNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-canvas py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold">{saleItems.heading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saleItems.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold">{item.name}</h3>
                {item.priceNetHuf ? (
                  <p className="mt-2 text-lg font-bold">{formatHuf(item.priceNetHuf)}</p>
                ) : null}
                <p className="text-xs text-muted-foreground">nettó / db · áfás számla</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold">{process.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((s) => (
              <div key={s.step} className="rounded-md border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{s.step}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <article className="rounded-md border border-brand/40 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{info.usage.heading}</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {info.usage.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-md border border-border bg-secondary/50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{info.notes.heading}</h2>
            {info.notes.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-sm text-foreground/85">
                {p}
              </p>
            ))}
            <p className="mt-3 text-sm text-muted-foreground">{info.pricing}</p>
          </article>
        </div>
      </section>

      <CtaSection
        heading={cta.heading}
        subheading={cta.description}
        ctaLabel={cta.cta.label}
        ctaHref={cta.cta.href}
        variant="dark"
        className="bg-section-dark text-section-dark-foreground [&_h2]:text-section-dark-foreground [&_p]:text-section-dark-foreground/90"
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
