import type { NextConfig } from "next";

// Standard Next.js SSR/SSG hybrid build - the default output mode works
// out of the box on Vercel's free tier, so we don't need `output: "export"`
// (which would also disable next/image optimization for no benefit here).
const nextConfig: NextConfig = {};

export default nextConfig;
