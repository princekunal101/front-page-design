import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/front-page-design",
  assetPrefix: "/front-page-design/",
  images: { unoptimized: true },
};

export default nextConfig;
