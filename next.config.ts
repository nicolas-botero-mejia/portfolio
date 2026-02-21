import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 800],
  },
  experimental: {
    mdxRs: true,
    turbopackUseSystemTlsCerts: true,
  },
  async redirects() {
    // Legacy flat URLs → new /work/[subType]/[slug] structure
    return [
      { source: '/work/sainapsis', destination: '/work/products/sainapsis', permanent: true },
      { source: '/work/ocean', destination: '/work/products/ocean', permanent: true },
      { source: '/work/aquads', destination: '/work/products/aquads', permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
