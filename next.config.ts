import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    css: {
      // Fallback to PostCSS instead of LightningCSS
      useLightningCss: false,
    },
  },
};

export default nextConfig;
