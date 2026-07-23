import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";

import apiConfig from "./config/api.json";
import authConfig from "./config/auth.json";
import { authenticateWithPassword } from "@shared/auth/credentials";
import {
  SESSION_COOKIE,
  claimsToUser,
  getTokenFromAuthHeader,
  sessionCookieOptions,
  signSessionToken,
  verifySessionToken,
  type PublicSession,
} from "@shared/auth/session-token";

const app = express();
const port = Number(process.env.AUTH_PORT ?? apiConfig.authPort);
const host = process.env.AUTH_HOST ?? apiConfig.host;

const corsOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
    credentials: true,
  })
);
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts" },
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

function readRequestToken(req: express.Request): string | null {
  return (
    getTokenFromAuthHeader(req.headers.authorization) ??
    (typeof req.cookies?.[SESSION_COOKIE] === "string"
      ? req.cookies[SESSION_COOKIE]
      : null)
  );
}

function sessionFromToken(token: string): PublicSession | null {
  const claims = verifySessionToken(token);
  if (!claims) {
    return null;
  }

  return {
    token,
    user: claimsToUser(claims),
    createdAt: new Date(claims.iat * 1000).toISOString(),
    expiresAt: new Date(claims.exp * 1000).toISOString(),
  };
}

app.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: "email and password required" });
    return;
  }

  const user = await authenticateWithPassword(email, password);
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const session = signSessionToken(user, authConfig.sessionTtlSeconds);
  res.cookie(
    SESSION_COOKIE,
    session.token,
    sessionCookieOptions(authConfig.sessionTtlSeconds)
  );
  res.json(session);
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ status: "ok" });
});

app.get("/auth/session", (req, res) => {
  const token = readRequestToken(req);
  if (!token) {
    res.status(401).json({ error: "No active session" });
    return;
  }

  const session = sessionFromToken(token);
  if (!session) {
    res.status(401).json({ error: "No active session" });
    return;
  }

  res.json(session);
});

app.listen(port, host, () => {
  console.log(`Auth service listening on http://${host}:${port}`);
});
