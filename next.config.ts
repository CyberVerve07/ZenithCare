import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(isDev && {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js')]
        }
      }
    }
  })
};

export default nextConfig;
// Orchids restart: 1769262275925
