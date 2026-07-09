import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shared/src/components/ui/card";
import { cn } from "@shared/src/lib/utils";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading?: string;
  features: Feature[];
  className?: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "🛡️",
    title: "Megbízható minőség",
    description:
      "Minden termék átmegy minőség-ellenőrzésen. Csak bevált, tartós eszközöket forgalmazunk.",
  },
  {
    icon: "🚚",
    title: "Gyors kiszállítás",
    description:
      "Raktárról azonnal, 1–3 munkanapos kézbesítéssel. Expressz szállítás is elérhető.",
  },
  {
    icon: "🔧",
    title: "Szakmai tanácsadás",
    description:
      "Tapasztalt csapatunk segít megtalálni a helyzeted legjobban megfelelő felszerelést.",
  },
  {
    icon: "💳",
    title: "Biztonságos fizetés",
    description:
      "Bankkártyás, átutalásos és utánvétes fizetési lehetőség. SSL titkosítás.",
  },
  {
    icon: "↩️",
    title: "14 napos visszaküldés",
    description:
      "Ha nem vagy elégedett, 14 napon belül visszaküldheted a terméket gond nélkül.",
  },
  {
    icon: "📦",
    title: "Nagy készlet",
    description:
      "Több száz termék folyamatosan raktáron. Szükség esetén gondolj előre.",
  },
];

export function FeatureGrid({
  heading = "Miért minket válassz?",
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridProps) {
  return (
    <section className={cn("bg-muted/40 py-16", className)}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl">
          {heading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/60 bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className="text-2xl leading-none">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
