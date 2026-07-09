import express from "express";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import adminConfig from "@shared/src/config/api.json";
import { authProvider } from "@shared/auth/auth-provider";
import { loadSourceData } from "./data.js";

const app = express();
const host = process.env.ADMIN_HOST ?? adminConfig.adminHost;
const port = Number(process.env.ADMIN_PORT ?? adminConfig.adminPort);
const privateDataPath = resolve(
  process.env.PRIVATE_DATA_PATH ?? adminConfig.privateDataPath
);

app.use(express.json({ limit: "10mb" }));

function requireLocalhost(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const ip = req.ip ?? req.socket.remoteAddress ?? "";
  const isLocal = ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";

  if (!isLocal) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (!authProvider.isAdmin()) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}

app.use(requireLocalhost);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/admin/upload", requireAdmin, (req, res) => {
  try {
    const body = req.body as unknown;

    if (typeof body !== "object" || body === null) {
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }

    mkdirSync(dirname(privateDataPath), { recursive: true });
    writeFileSync(privateDataPath, JSON.stringify(body, null, 2), "utf-8");

    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/admin/products", requireAdmin, (_req, res) => {
  try {
    res.json(loadSourceData());
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/admin/products/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const product = loadSourceData().find((p) => p.id === id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, host, () => {
  console.log(`Admin API listening on http://${host}:${port}`);
});
