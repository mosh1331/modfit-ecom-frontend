import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Add this to skip ESLint during `next build`
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Other config options...
};

export default nextConfig;
