import "server-only";

import bcrypt from "bcryptjs";

import { getUserByEmail, type StoredUser } from "@shared/lib/data-provider";
import type { User, UserRole } from "@shared/lib/types";
import { toPublicUser } from "./session-token";

interface EnvUser {
  id: string;
  email: string;
  role: UserRole;
  passwordHash: string;
}

function stripEnvWrapping(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseEnvUsers(): EnvUser[] {
  const raw = process.env.AUTH_USERS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as EnvUser[];
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (u) =>
            typeof u?.id === "string" &&
            typeof u?.email === "string" &&
            typeof u?.role === "string" &&
            typeof u?.passwordHash === "string"
        );
      }
    } catch {
      // ignore malformed AUTH_USERS
    }
  }

  const emailRaw = process.env.AUTH_ADMIN_EMAIL;
  const passwordHashRaw = process.env.AUTH_ADMIN_PASSWORD_HASH;
  const email = emailRaw ? stripEnvWrapping(emailRaw) : "";
  const passwordHash = passwordHashRaw ? stripEnvWrapping(passwordHashRaw) : "";
  if (email && passwordHash) {
    if (!passwordHash.startsWith("$2")) {
      console.warn(
        "[auth/credentials] AUTH_ADMIN_PASSWORD_HASH nem bcrypt formátum ($2…). " +
          "A .env-ben a $ jeleket escape-eld: \\$2b\\$10\\$...",
      );
    }
    return [
      {
        id: process.env.AUTH_ADMIN_ID?.trim() || "env-admin",
        email,
        role: (process.env.AUTH_ADMIN_ROLE as UserRole) || "admin",
        passwordHash,
      },
    ];
  }

  return [];
}

function findCredentialUser(email: string): EnvUser | StoredUser | null {
  const normalized = email.trim().toLowerCase();
  const envUser = parseEnvUsers().find(
    (u) => u.email.trim().toLowerCase() === normalized
  );
  if (envUser) {
    return envUser;
  }

  try {
    const stored = getUserByEmail(email.trim());
    if (stored?.passwordHash) {
      return stored;
    }
  } catch {
    // private source missing / unreadable — ENV credentials still work
  }

  return null;
}

export async function authenticateWithPassword(
  email: string,
  password: string
): Promise<User | null> {
  if (!email?.trim() || !password) {
    return null;
  }

  const record = findCredentialUser(email);
  // TEMP DEBUG — remove after login diagnosis
  console.log(
    "[auth/credentials DEBUG] findCredentialUser:",
    record
      ? {
          id: record.id,
          email: record.email,
          hashLength: record.passwordHash?.length ?? 0,
          hashFirst5: record.passwordHash?.slice(0, 5) ?? null,
          hashLast5: record.passwordHash?.slice(-5) ?? null,
        }
      : null,
  );

  if (!record?.passwordHash) {
    // Dummy compare to reduce timing oracle on missing users.
    const dummyOk = await bcrypt.compare(
      password,
      "$2b$10$UB6g93Lt4wqexGta/4r6S.NOyVe0BT9N1h6vTe085cXVy7exBVcAO"
    );
    console.log(
      "[auth/credentials DEBUG] bcrypt.compare (dummy, no record):",
      dummyOk,
    );
    return null;
  }

  const ok = await bcrypt.compare(password, record.passwordHash);
  console.log("[auth/credentials DEBUG] bcrypt.compare result:", ok);
  if (!ok) {
    return null;
  }

  return toPublicUser(record);
}
