import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import authConfig from "@shared/config/auth.json";
import {
  SESSION_COOKIE,
  claimsToUser,
  verifySessionToken,
} from "@shared/auth/session-token";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Ügyvezetői admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-admin-pathname") ?? "";
  const isLogin =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const claims = token ? verifySessionToken(token) : null;
  const user = claims ? claimsToUser(claims) : null;
  const level = user
    ? (authConfig.roles[user.role] ?? authConfig.roles.guest)
    : 0;
  const isAdmin = level >= authConfig.roles.admin;

  if (!isLogin && !isAdmin) {
    redirect(`/admin/login?next=${encodeURIComponent(pathname || "/admin")}`);
  }

  if (isLogin) {
    if (isAdmin) {
      redirect("/admin");
    }
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/admin" className="font-semibold tracking-tight">
              Ügyvezetői irányítópult
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Publikus site
            </Link>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{user?.email}</span>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
