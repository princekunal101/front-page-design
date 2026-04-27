import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // ensures static export
  basePath: "", // must match your GitHub repo name
  images: { unoptimized: true }, // disable server image optimization
};

export default nextConfig;
