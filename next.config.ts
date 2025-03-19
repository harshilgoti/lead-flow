import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  output: "standalone", // Ensures the app runs in a Node.js runtime
};

export default nextConfig;
