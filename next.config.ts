import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
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
