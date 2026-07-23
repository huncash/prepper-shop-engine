import cookieParser from "cookie-parser";
import express from "express";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import adminConfig from "@shared/src/config/api.json";
import authConfig from "@shared/src/config/auth.json";
import {
  SESSION_COOKIE,
  claimsToUser,
  getTokenFromAuthHeader,
  verifySessionToken,
} from "@shared/auth/session-token";
import { loadSourceData } from "./data.js";

const app = express();
const host = process.env.ADMIN_HOST ?? adminConfig.adminHost;
const port = Number(process.env.ADMIN_PORT ?? adminConfig.adminPort);
const privateDataPath = resolve(
  process.env.PRIVATE_DATA_PATH ?? adminConfig.privateDataPath
);

const MAX_UPLOAD_BYTES = 1024 * 1024;
const MAX_PRODUCTS = 5000;

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

function requireLocalhost(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const ip = req.ip ?? req.socket.remoteAddress ?? "";
  const isLocal =
    ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";

  if (!isLocal) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}

function readRequestToken(req: express.Request): string | null {
  return (
    getTokenFromAuthHeader(req.headers.authorization) ??
    (typeof req.cookies?.[SESSION_COOKIE] === "string"
      ? req.cookies[SESSION_COOKIE]
      : null)
  );
}

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const token = readRequestToken(req);
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const claims = verifySessionToken(token);
  if (!claims) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = claimsToUser(claims);
  const level = authConfig.roles[user.role] ?? authConfig.roles.guest;
  if (level < authConfig.roles.admin) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}

const DANGEROUS_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function hasDangerousKeys(value: unknown, depth = 0): boolean {
  if (depth > 8 || value === null || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasDangerousKeys(item, depth + 1));
  }

  for (const key of Object.keys(value as object)) {
    if (DANGEROUS_KEYS.has(key)) {
      return true;
    }
    if (hasDangerousKeys((value as Record<string, unknown>)[key], depth + 1)) {
      return true;
    }
  }

  return false;
}

function isValidUploadBody(body: unknown): body is {
  products: unknown[];
  users?: unknown[];
} {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return false;
  }

  if (hasDangerousKeys(body)) {
    return false;
  }

  const data = body as Record<string, unknown>;
  if (!Array.isArray(data.products) || data.products.length > MAX_PRODUCTS) {
    return false;
  }

  if (data.users !== undefined && !Array.isArray(data.users)) {
    return false;
  }

  return true;
}

app.use(requireLocalhost);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/admin/upload", requireAdmin, (req, res) => {
  try {
    const rawSize = Number(req.headers["content-length"] ?? 0);
    if (rawSize > MAX_UPLOAD_BYTES) {
      res.status(413).json({ error: "Payload too large" });
      return;
    }

    if (!isValidUploadBody(req.body)) {
      res.status(400).json({ error: "Invalid JSON payload" });
      return;
    }

    mkdirSync(dirname(privateDataPath), { recursive: true });
    writeFileSync(privateDataPath, JSON.stringify(req.body, null, 2), "utf-8");

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
