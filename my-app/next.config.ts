import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
  async headers() {
    return [
      {
        // Apply these headers to the /login page
        source: "/login",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store", // prevents caching of login page
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ]
  }
};

export default nextConfig;
