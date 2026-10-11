import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only allows [75] by default; 90 keeps landscapes crisp
    qualities: [75, 90],
    // 2560 matches the native width of the landscape sources
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
};

export default nextConfig;
