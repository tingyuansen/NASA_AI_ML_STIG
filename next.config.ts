import type { NextConfig } from "next";

// Deployed on Vercel and served at the domain root, so no basePath is needed.
// BASE_PATH in the app falls back to "" when NEXT_PUBLIC_BASE_PATH is unset.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
