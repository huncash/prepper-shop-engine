"use client";

import { useState } from "react";

import { MENU_ITEMS } from "@shared/config/menu";
import { SITE_CONFIG } from "@shared/config/site-config";
import { cn } from "@shared/src/lib/utils";

const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "site-1";
const siteConfig = SITE_CONFIG[siteId] ?? SITE_CONFIG["site-1"];

export interface NavbarProps {
  logoHref?: string;
  className?: string;
}

export function Navbar({ logoHref = "/", className }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur",
        className
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a
          href={logoHref}
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary"
        >
          {siteConfig.name}
        </a>

        <ul className="hidden gap-6 md:flex">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-input md:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className={cn("block h-0.5 w-5 bg-foreground transition-transform duration-200", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-foreground transition-opacity duration-200", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-foreground transition-transform duration-200", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </nav>

      {open ? (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {MENU_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
