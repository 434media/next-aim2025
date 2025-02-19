import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ampd-asset.s3.us-east-2.amazonaws.com",
      "images.unsplash.com",
    ],

  },
};

export default nextConfig;
