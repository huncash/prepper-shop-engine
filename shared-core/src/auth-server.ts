import cors from "cors";
import express from "express";

import apiConfig from "@shared/src/config/api.json";
import { getUserByEmail } from "@shared/lib/data-provider";
import { authProvider } from "@shared/auth/auth-provider";

const app = express();
const port = Number(process.env.AUTH_PORT ?? apiConfig.authPort);
const host = process.env.AUTH_HOST ?? apiConfig.host;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/auth/login", (req, res) => {
  const { email } = req.body as { email?: string };

  if (!email) {
    res.status(400).json({ error: "email required" });
    return;
  }

  const user = getUserByEmail(email.trim());

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  const session = authProvider.login(user, crypto.randomUUID());
  res.json(session);
});

app.post("/auth/logout", (_req, res) => {
  authProvider.logout();
  res.json({ status: "ok" });
});

app.get("/auth/session", (_req, res) => {
  const session = authProvider.getSession();

  if (!session) {
    res.status(401).json({ error: "No active session" });
    return;
  }

  res.json(session);
});

app.listen(port, host, () => {
  console.log(`Auth service listening on http://${host}:${port}`);
});
