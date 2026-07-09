import authConfig from "@shared/src/config/auth.json";
import type { User, UserRole } from "@shared/lib/data-provider";

export type AdminLevel = UserRole;

export interface Session {
  token: string;
  user: User;
  createdAt: string;
  expiresAt: string;
}

interface AuthState {
  session: Session | null;
}

function resolveRoleLevel(role: AdminLevel): number {
  return authConfig.roles[role] ?? authConfig.roles.guest;
}

function createSession(user: User, token: string): Session {
  const createdAt = new Date();
  const expiresAt = new Date(
    createdAt.getTime() + authConfig.sessionTtlSeconds * 1000
  );

  return {
    token,
    user,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

function isSessionValid(session: Session | null): session is Session {
  if (!session) {
    return false;
  }

  return new Date(session.expiresAt).getTime() > Date.now();
}

export class AuthProvider {
  private state: AuthState = { session: null };

  login(user: User, token: string): Session {
    const session = createSession(user, token);
    this.state.session = session;
    return session;
  }

  logout(): void {
    this.state.session = null;
  }

  setSession(session: Session | null): void {
    if (session && !isSessionValid(session)) {
      this.state.session = null;
      return;
    }

    this.state.session = session;
  }

  getSession(): Session | null {
    if (!isSessionValid(this.state.session)) {
      this.state.session = null;
      return null;
    }

    return this.state.session;
  }

  getUser(): User | null {
    return this.getSession()?.user ?? null;
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  getAdminLevel(): number {
    const user = this.getUser();
    if (!user) {
      return authConfig.roles.guest;
    }

    return resolveRoleLevel(user.role);
  }

  hasRole(role: AdminLevel): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  hasMinimumRole(role: AdminLevel): boolean {
    return this.getAdminLevel() >= resolveRoleLevel(role);
  }

  isAdmin(): boolean {
    return this.hasMinimumRole("admin");
  }

  isSuperAdmin(): boolean {
    return this.hasRole("superadmin");
  }

  canAccess(requiredRole: AdminLevel): boolean {
    return this.hasMinimumRole(requiredRole);
  }
}

export const authProvider = new AuthProvider();

export type { User };
