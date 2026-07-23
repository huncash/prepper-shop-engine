"use client";

import { useState } from "react";

import { authProvider, type Session } from "@shared/auth/auth-provider";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "../lib/utils";

function getAuthBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_AUTH_URL ??
    process.env.AUTH_URL ??
    "http://localhost:4001"
  );
}

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
      const response = await fetch(`${getAuthBaseUrl()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        setError(
          response.status === 401
            ? "Felhasználó nem található."
            : "Bejelentkezés sikertelen."
        );
        return;
      }

      const session = (await response.json()) as Session;
      authProvider.setSession(session);
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
              placeholder="admin@example.com"
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
