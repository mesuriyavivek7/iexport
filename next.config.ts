import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "procureexport.com",
      },
      {
        protocol: "https",
        hostname: "api.procureexport.com",
      },
    ],
  },
};

export default nextConfig;