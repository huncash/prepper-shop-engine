import { Suspense } from "react";

import { authProvider } from "@shared/auth/auth-provider";
import { getProducts } from "@shared/lib/data-provider";
import { Catalog } from "@shared/components/Catalog";
import { CtaSection } from "@shared/components/landing/CtaSection";
import { FeatureGrid } from "@shared/components/landing/FeatureGrid";
import { HeroSection } from "@shared/components/landing/HeroSection";
import { CONTENT } from "../data/content";

export default function HomePage() {
  const products = getProducts().map((p) => ({
    ...p,
    editable: authProvider.isAdmin(),
  }));

  const {
    hero,
    valueProps,
    solutionLayers,
    knowledgeBase,
    architectPackages,
    audience,
    cta,
    catalog,
  } = CONTENT;

  return (
    <>
      <HeroSection
        title={hero.title}
        subtitle={`${hero.subtitle} ${hero.description}`}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
        className="bg-primary text-primary-foreground [&_h1]:text-primary-foreground [&_p]:text-primary-soft"
      />

      <section className="border-b border-border bg-surface py-6">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs text-muted-foreground">{hero.b2bNote}</p>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-lg border border-primary-foreground/10 bg-primary-deep/10 p-6">
            <h3 className="text-sm font-medium">{hero.bcpPanel.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{hero.bcpPanel.description}</p>
          </div>
        </div>
      </section>

      <FeatureGrid heading={valueProps.heading} features={valueProps.items} className="bg-surface" />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{solutionLayers.badge}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{solutionLayers.heading}</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">{solutionLayers.description}</p>
        <FeatureGrid
          heading=""
          features={solutionLayers.items.map((l) => ({
            icon: l.icon,
            title: `${l.kicker} — ${l.title}`,
            description: l.description,
          }))}
          className="py-8 [&_h2]:hidden"
        />
      </section>

      <section className="border-y border-border bg-primary-soft py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{knowledgeBase.badge}</p>
          <h2 className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight">{knowledgeBase.heading}</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{knowledgeBase.description}</p>
          <FeatureGrid
            heading=""
            features={knowledgeBase.items}
            className="bg-transparent py-8 [&_h2]:hidden"
          />
        </div>
      </section>

      <section className="border-b border-border bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{architectPackages.badge}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{architectPackages.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{architectPackages.disclaimer}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {architectPackages.items.map((pkg) => (
              <article key={pkg.slug} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{pkg.version}</p>
                <h3 className="mt-2 font-semibold">{pkg.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>
                <p className="mt-3 text-xs text-muted-foreground">{pkg.audience}</p>
                <p className="mt-3 text-sm font-medium text-foreground">{pkg.priceNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid heading={audience.heading} features={audience.items} />

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-lg border border-border bg-primary-soft p-6">
          <h3 className="text-sm font-medium">{audience.b2bModel.title}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {audience.b2bModel.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        heading={cta.heading}
        subheading={cta.description}
        ctaLabel={cta.cta.label}
        ctaHref={cta.cta.href}
        variant="dark"
        className="bg-primary text-primary-foreground [&_h2]:text-primary-foreground [&_p]:text-primary-soft"
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-2 text-xl font-bold">{catalog.heading}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{catalog.note}</p>
        <Suspense>
          <Catalog products={products} />
        </Suspense>
      </section>
    </>
  );
}
