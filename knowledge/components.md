# UI Components & Style System

Source of truth for UI patterns. Import shared UI from `@shared/src/components/**`. Business logic stays out of Lovable UI layers — use `lovable_bridge.ts` for interfaces.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + CSS variables (HSL)
- `class-variance-authority` (cva) for variants
- Radix Slot (`asChild`) on Button
- `cn()` from `@shared/src/lib/utils`

## Tokens

Defined in `shared-core/src/styles/globals.css`, mapped in `shared-core/styles/theme.ts`.

| Token | Role |
|-------|------|
| `--primary` | Brand green (`142 76% 36%` light / `142 70% 45%` dark) |
| `--background` / `--foreground` | Page surface / body text |
| `--muted` / `--muted-foreground` | Secondary surfaces / secondary text |
| `--card` / `--border` / `--input` / `--ring` | Cards, borders, focus |
| `--radius` | `0.75rem` → `rounded-lg` / `md` / `sm` |

Font: Inter (`font-sans`). Headings: `font-bold text-primary` (base layer).

Layout width: `max-w-7xl mx-auto px-4`. Section padding: `py-16`–`py-28`.

## Primitives (`shared-core/src/components/ui/`)

### Button
- Variants: `default` | `secondary` | `outline` | `ghost`
- Sizes: `default` | `sm` | `lg` | `icon`
- Use `asChild` for links: `<Button asChild><a href=...>`

### Card
- Shell: `rounded-xl border bg-card shadow`
- Parts: `CardHeader` | `CardTitle` | `CardDescription` | `CardContent` | `CardFooter`
- Header: `p-6 space-y-1.5`; Content/Footer often `pt-0`

### Badge
- Variants: `default` | `secondary` | `outline`
- Absolute overlay on media: `absolute left-3 top-3`

## Layout

| Component | Path | Pattern |
|-----------|------|---------|
| Navbar | `layout/Navbar.tsx` | Sticky, `bg-background/90 backdrop-blur`, h-16, desktop links + mobile hamburger |
| Footer | `layout/Footer.tsx` | `border-t bg-muted/40`, 3-col brand/catalog/about, copyright bar |
| AdminLayout | `AdminLayout.tsx` | Admin shell |
| BlogLayout | `BlogLayout.tsx` | Blog article shell |

## Landing

| Component | Pattern |
|-----------|---------|
| HeroSection | Gradient `from-primary/10`, 2-col grid, H1 + subtitle + dual CTA (`lg` + `outline`), optional 4:3 image `rounded-2xl shadow-xl` |
| FeatureGrid | `bg-muted/40`, centered H2, 3-col Card grid, emoji icon + title + muted body |
| CtaSection | Centered max-w-3xl; variants `default` (`bg-primary/10`) \| `dark` (`bg-foreground`) |

## Commerce / Content

| Component | Pattern |
|-----------|---------|
| ProductCard | Card + 4:3 image (hover scale), optional Badge, price `text-primary font-bold`, full-width action Button |
| Catalog | Client filters (q/cat/sort query params) → ProductCard grid |
| ProductDetail | Single product view |
| ContactForm | Card form + cart summary, `useTransition` submit |
| BlogIndex / BlogLayout | Post listing / article |
| LoginForm | Auth form |

## Conventions

1. Props: typed interfaces, optional `className` merged via `cn()`.
2. Locale: `hu-HU` currency formatting; Hungarian UI copy defaults.
3. Config-driven: site name/menu/email from `@shared/config/*`, not hardcoded domains in shared-core.
4. Images: `aspect-[4/3] object-cover`; placeholder when missing / `feltoltes-alatt`.
5. Client boundary: `"use client"` only when state/hooks/router needed.
6. Lovable UI: presentational only; wire data/actions through `lovable_bridge.ts`.
7. Prefer extending existing primitives over new design systems.
8. Keep components flat and readable for local models (Qwen2.5-Coder 7B) — avoid deep abstraction layers.
