import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/how-does-one-become-a-leader-53af80df4451",
        destination: "/essays/how-does-one-become-a-leader/",
        permanent: true,
      },
      {
        source: "/life-in-sprints-treating-existence-like-a-lab-b48f5bae1f90",
        destination: "/essays/life-in-sprints/",
        permanent: true,
      },
      {
        source: "/scrum-3306b78fae23",
        destination: "/essays/scrum/",
        permanent: true,
      },
      {
        source: "/teaching-is-a-design-problem-01d862046f38",
        destination: "/essays/teaching-is-a-design-problem/",
        permanent: true,
      },
      {
        source: "/ventures-are-built-on-beliefs-not-ideas-420ece4d362d",
        destination: "/essays/ventures-are-built-on-beliefs-not-ideas/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/essays/:slug/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
