"use client";

import { useState } from "react";
import type { Product } from "@shared/lib/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
  onAddToCart?: () => void;
  onRequestQuote?: () => void;
}

type Tab = "description" | "specs" | "docs";

export function ProductDetail({
  product,
  relatedProducts = [],
  onAddToCart,
  onRequestQuote,
}: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const formattedPriceNet = new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedPriceGross = new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(product.price * 1.27);

  const specs = product.specs ? Object.entries(product.specs) : [];

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: "Leírás" },
    { id: "specs", label: "Műszaki adatok" },
    { id: "docs", label: "Dokumentáció" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      {/* 1. Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <span>Kezdőlap</span>
        <span className="mx-2">/</span>
        <span>Katalógus</span>
        {product.category ? (
          <>
            <span className="mx-2">/</span>
            <span>{product.category}</span>
          </>
        ) : null}
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">

        {/* 2. Image Gallery */}
        <section>
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            {product.imageUrl && !product.imageUrl.includes("feltoltes-alatt") ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">Feltöltés alatt</p>
                <p className="text-xs text-muted-foreground">A kép hamarosan elérhető lesz</p>
              </div>
            )}
          </div>
          {product.imageUrl && !product.imageUrl.includes("feltoltes-alatt") ? (
            <p className="mt-2 text-xs text-muted-foreground">
              A termékképek kizárólag illusztrációk.
            </p>
          ) : null}
        </section>

        {/* 3. Purchase Info */}
        <section className="flex flex-col gap-4">
          {product.badge ? (
            <Badge variant="secondary" className="w-fit">{product.badge}</Badge>
          ) : null}

          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

          {product.description ? (
            <p className="text-sm text-muted-foreground">{product.description}</p>
          ) : null}

          <div className="rounded-lg border bg-card p-4">
            <p className="text-2xl font-bold text-primary">{formattedPriceNet}</p>
            <p className="text-xs text-muted-foreground">+ ÁFA / db</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Bruttó: {formattedPriceGross} / db
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={onRequestQuote} type="button">
              Ajánlatot kérek erre a termékre
            </Button>
            <Button variant="outline" className="w-full" onClick={onAddToCart} type="button">
              Kosárba teszem
            </Button>
          </div>
        </section>
      </div>

      {/* 4. Tabbed Content */}
      <section className="mt-12 border-t pt-8">
        <div className="mb-6 flex gap-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                "pb-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="prose prose-sm max-w-none">
          {activeTab === "description" && (
            <div>
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p className="text-muted-foreground">Nincs elérhető leírás.</p>
              )}
            </div>
          )}

          {activeTab === "specs" && (
            <div>
              {specs.length > 0 ? (
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map(([key, value]) => (
                      <tr key={key} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium">{key}</td>
                        <td className="py-2 text-muted-foreground">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted-foreground">Nincs elérhető műszaki adat.</p>
              )}
            </div>
          )}

          {activeTab === "docs" && (
            <p className="text-muted-foreground">Nincs elérhető dokumentáció.</p>
          )}
        </div>
      </section>

      {/* 5. Related Products */}
      {relatedProducts.length > 0 ? (
        <section className="mt-12 border-t pt-8">
          <h2 className="mb-4 text-2xl font-bold">Kapcsolódó termékek</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="overflow-hidden rounded-lg border bg-card">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-tight">{rel.name}</p>
                  <p className="mt-1 text-sm text-primary font-semibold">
                    {new Intl.NumberFormat("hu-HU", {
                      style: "currency",
                      currency: "HUF",
                      maximumFractionDigits: 0,
                    }).format(rel.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
