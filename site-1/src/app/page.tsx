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

  const { hero, segments, services, testimonials, process, catalog } = CONTENT;

  return (
    <>
      <HeroSection
        title={hero.title}
        subtitle={`${hero.subtitle} ${hero.proof}`}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
        imageUrl="/media/dollhouse-view.jpg"
        className="bg-section-dark text-section-dark-foreground [&_h1]:text-section-dark-foreground [&_p]:text-section-dark-foreground/90"
      />

      <FeatureGrid
        heading={segments.heading}
        features={segments.items.map((s) => ({
          icon: "→",
          title: s.title,
          description: s.description,
        }))}
      />

      <FeatureGrid
        heading={services.heading}
        features={services.items.map((s) => ({
          icon: s.icon,
          title: s.title,
          description: s.description,
        }))}
        className="bg-section-dark text-section-dark-foreground [&_h2]:text-section-dark-foreground [&_h3]:text-section-dark-foreground [&_p]:text-section-dark-foreground/85 [&_.bg-background]:bg-section-dark [&_.border-border]:border-section-dark-foreground/20"
      />

      <FeatureGrid
        heading={testimonials.heading}
        features={testimonials.items.map((t) => ({
          icon: "💬",
          title: `${t.name} — ${t.company}`,
          description: `"${t.text}"`,
        }))}
      />

      <CtaSection
        heading={process.heading}
        ctaLabel={process.cta.label}
        ctaHref={process.cta.href}
        variant="dark"
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
