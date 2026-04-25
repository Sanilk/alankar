import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/**", // ✅ REQUIRED FIX
      },
      {
        protocol: "https",
        hostname: "your-domain.com",
        pathname: "/api/media/**", // ✅ future production
      },
    ],
  },
};

export default withPayload(nextConfig);