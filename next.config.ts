import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/NASA_AI_ML_STIG" : "",
  assetPrefix: isGitHubPages ? "/NASA_AI_ML_STIG/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
