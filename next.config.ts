import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only allows [75] by default; 90 keeps landscapes crisp
    qualities: [75, 90],
    // The largest source is 2752px wide; avoid generating upscaled 3840px variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 2880],
  },
};

export default nextConfig;
