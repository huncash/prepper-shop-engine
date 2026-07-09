"use client";

import { useState } from "react";

import { authProvider } from "@shared/auth/auth-provider";
import { getUserByEmail } from "@shared/lib/data-provider";
import { Button } from "@shared/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/src/components/ui/card";
import { cn } from "@shared/src/lib/utils";

export interface LoginFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const user = getUserByEmail(email.trim());

      if (!user) {
        setError("Felhasználó nem található.");
        return;
      }

      authProvider.login(user, crypto.randomUUID());
      onSuccess?.();
    } catch {
      setError("Bejelentkezés sikertelen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>Bejelentkezés</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              placeholder="admin@prepper.shop"
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "..." : "Bejelentkezés"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
