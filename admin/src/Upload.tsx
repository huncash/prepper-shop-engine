"use client";

import { useRef, useState } from "react";

import { Button } from "@shared/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/src/components/ui/card";

const ADMIN_API =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://127.0.0.1:4002")
    : "http://127.0.0.1:4002";

type UploadState = "idle" | "pending" | "success" | "error";

export function Upload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];

    if (!file) {
      return;
    }

    setState("pending");
    setMessage(null);

    try {
      const text = await file.text();
      JSON.parse(text);

      const res = await fetch(`${ADMIN_API}/admin/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: text,
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }

      setState("success");
      setMessage("Feltöltés sikeres.");

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Ismeretlen hiba.");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Termékadatok feltöltése</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="json-file" className="text-sm font-medium">
              JSON fájl
            </label>
            <input
              id="json-file"
              ref={inputRef}
              type="file"
              accept="application/json,.json"
              required
              className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
            />
          </div>

          {message ? (
            <p
              className={
                state === "success"
                  ? "text-sm text-green-600"
                  : "text-sm text-destructive"
              }
            >
              {message}
            </p>
          ) : null}
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={state === "pending"}>
            {state === "pending" ? "Feltöltés..." : "Feltöltés"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
