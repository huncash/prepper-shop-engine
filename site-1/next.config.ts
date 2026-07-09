import type { NextConfig } from "next";
import path from "node:path";

const sharedCoreRoot =
  process.env.SHARED_CORE_PATH ?? path.join(process.cwd(), "..", "shared-core");

const sharedCoreAliases = {
  "@shared/components": path.join(sharedCoreRoot, "src/components"),
  "@shared/templates": path.join(sharedCoreRoot, "templates"),
  "@shared/config": path.join(sharedCoreRoot, "src/config"),
  "@shared/lib": path.join(sharedCoreRoot, "lib"),
  "@shared/data": path.join(sharedCoreRoot, "data"),
  "@shared/auth": path.join(sharedCoreRoot, "auth"),
  "@shared": path.join(sharedCoreRoot, "src"),
};

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
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
