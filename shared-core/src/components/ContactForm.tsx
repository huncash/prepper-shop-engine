"use client";

import { useState, useTransition } from "react";
import { useCartStore, clearCart } from "@shared/lib/cart-store";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface ContactFormProps {
  actionUrl?: string;
  onSuccess?: () => void;
}

export function ContactForm({ actionUrl = "/api/contact", onSuccess }: ContactFormProps) {
  const items = useCartStore();
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartJson = JSON.stringify(
    items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity }))
  );

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const formattedTotal = new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      try {
        const res = await fetch(actionUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            message: data.get("message"),
            cart: items,
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setSent(true);
        clearCart();
        form.reset();
        onSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ismeretlen hiba");
      }
    });
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-lg font-semibold text-green-600">Ajánlatkérés elküldve!</p>
          <p className="mt-2 text-sm text-muted-foreground">Hamarosan felvesszük Önnel a kapcsolatot.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajánlatkérés</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 && (
          <div className="mb-4 rounded-md bg-muted p-3 text-sm">
            <p className="mb-1 font-medium">Kiválasztott termékek:</p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-muted-foreground">
                  <span>{item.name} × {item.quantity}</span>
                  <span>
                    {new Intl.NumberFormat("hu-HU", {
                      style: "currency",
                      currency: "HUF",
                      maximumFractionDigits: 0,
                    }).format(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t pt-2 font-semibold">Összesen: {formattedTotal}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="cart" value={cartJson} />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="cf-name">Név *</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="cf-email">E-mail *</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="cf-phone">Telefonszám</label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="cf-message">Megjegyzés</label>
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">Hiba: {error}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Küldés..." : "Ajánlatkérés küldése"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
