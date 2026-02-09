import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages compatibility
  output: "export",
  // Base path for GitHub Pages (repo name)
  basePath: process.env.GITHUB_PAGES === "true" ? "/NASA_AI_ML_STIG" : "",
  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
