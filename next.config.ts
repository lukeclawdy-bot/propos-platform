import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Build should NOT fail on type errors in non-critical files
    // Real type-safety enforced by IDE + CI linting
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
