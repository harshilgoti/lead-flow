import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {},
  },
  output: "standalone", // Ensures the app runs in a Node.js runtime
};

export default nextConfig;
