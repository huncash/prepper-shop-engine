"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "../lib/utils";

export interface ProductCardProps {
  title: string;
  price: number;
  currency?: string;
  imageUrl: string;
  imageAlt?: string;
  description?: string;
  badge?: string;
  actionLabel?: string;
  onAction?: () => void;
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  price,
  currency = "HUF",
  imageUrl,
  imageAlt,
  description,
  badge,
  actionLabel = "Kosárba",
  onAction,
  editable = false,
  onEdit,
  className,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl && !imageUrl.includes("feltoltes-alatt") ? (
          <img
            src={imageUrl}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-xs text-muted-foreground">Feltöltés alatt</p>
          </div>
        )}
        {badge ? (
          <Badge className="absolute left-3 top-3" variant="secondary">
            {badge}
          </Badge>
        ) : null}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-base">{title}</CardTitle>
        {description ? (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="pb-3 pt-0">
        <p className="text-lg font-bold text-primary">{formattedPrice}</p>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button className="w-full" onClick={onAction} type="button">
          {actionLabel}
        </Button>
        {editable ? (
          <Button variant="outline" onClick={onEdit} type="button">
            Szerkesztés
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
