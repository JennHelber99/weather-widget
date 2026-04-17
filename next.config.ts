import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'source.unsplash.com' }],
  },
};

export default nextConfig;
