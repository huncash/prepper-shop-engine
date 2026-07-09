import { Button } from "@shared/src/components/ui/button";
import { cn } from "@shared/src/lib/utils";

export interface CtaSectionProps {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "default" | "dark";
  className?: string;
}

export function CtaSection({
  heading,
  subheading,
  ctaLabel = "Megnézem a termékeket",
  ctaHref = "/termekek",
  variant = "default",
  className,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "py-20",
        variant === "dark"
          ? "bg-foreground text-background"
          : "bg-primary/10",
        className
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h2
          className={cn(
            "text-3xl font-extrabold tracking-tight md:text-4xl",
            variant === "dark" ? "text-background" : "text-foreground"
          )}
        >
          {heading}
        </h2>

        {subheading ? (
          <p
            className={cn(
              "text-lg",
              variant === "dark" ? "text-background/70" : "text-muted-foreground"
            )}
          >
            {subheading}
          </p>
        ) : null}

        <Button
          asChild
          size="lg"
          variant={variant === "dark" ? "secondary" : "default"}
          className="px-10"
        >
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>
    </section>
  );
}
