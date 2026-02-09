import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/NASA_AI_ML_STIG" : "";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages compatibility
  output: "export",
  // Base path for GitHub Pages (repo name)
  basePath,
  // Expose basePath to client components
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
