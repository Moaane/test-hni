import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://dummyjson.com/icon/**"),
      new URL("https://cdn.dummyjson.com/product-images/**"),
    ],
  },

  experimental: {
    globalNotFound: true,
  },
}

export default nextConfig
