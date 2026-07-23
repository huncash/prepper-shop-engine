import type { NextConfig } from "next";
import path from "node:path";

const sharedCoreRoot =
  process.env.SHARED_CORE_PATH ?? path.join(process.cwd(), "..", "shared-core");
const siteSrc = path.join(process.cwd(), "src");

const sharedCoreAliases = {
  "@": siteSrc,
  "@shared/components": path.join(sharedCoreRoot, "src/components"),
  "@shared/templates": path.join(sharedCoreRoot, "templates"),
  "@shared/config": path.join(sharedCoreRoot, "src/config"),
  "@shared/lib": path.join(sharedCoreRoot, "lib"),
  "@shared/auth": path.join(sharedCoreRoot, "auth"),
  "@shared": path.join(sharedCoreRoot, "src"),
};

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3", "bcryptjs"],
  experimental: {
    externalDir: true,
  },
  turbopack: {
    resolveAlias: sharedCoreAliases,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...sharedCoreAliases,
    };
    return config;
  },
};

export default nextConfig;
