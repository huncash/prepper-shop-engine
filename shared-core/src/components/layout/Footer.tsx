import { COMPANY_INFO } from "@shared/config/company-data";
import { SITE_CONFIG } from "@shared/config/site-config";
import { cn } from "@shared/lib/utils";

const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "site-1";
const siteConfig = SITE_CONFIG[siteId] ?? SITE_CONFIG["site-1"];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  className?: string;
  description?: string;
  brandName?: string;
  brandTagline?: string;
  brandSubline?: string;
  foundedYear?: number;
  catalogLinks?: FooterLink[];
  aboutLinks?: FooterLink[];
}

export function Footer({
  className,
  description,
  brandName = COMPANY_INFO.name,
  brandTagline,
  brandSubline,
  foundedYear = 2006,
  catalogLinks = [],
  aboutLinks = [],
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t bg-muted/40 text-sm", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* Top: site description */}
        {description ? (
          <p className="mb-8 text-muted-foreground">{description}</p>
        ) : null}

        {/* Main grid: brand | catalog | about */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand block */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">EST. {foundedYear}</p>
              <p className="text-base font-bold text-foreground">{brandName}</p>
            </div>
            {brandTagline ? (
              <p className="text-muted-foreground">{brandTagline}</p>
            ) : null}
            {brandSubline ? (
              <p className="text-xs text-muted-foreground">{brandSubline}</p>
            ) : null}
          </div>

          {/* Catalog links */}
          {catalogLinks.length > 0 ? (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-foreground">Teljes katalógus</p>
              <ul className="flex flex-col gap-2">
                {catalogLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* About links */}
          {aboutLinks.length > 0 ? (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-foreground">Rólunk</p>
              <ul className="flex flex-col gap-2">
                {aboutLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground">
          <span>© Copyright {foundedYear} – {year} | Minden jog fenntartva.</span>
          <a href={`mailto:${siteConfig.publicEmail}`} className="hover:text-foreground">
            Kérdése van? Írj nekünk!
          </a>
        </div>
      </div>
    </footer>
  );
}
