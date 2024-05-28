/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // outputFileTracing: false,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.REAL_WEBSITE}/api/v1/:path*`,
      },
    ];
  },

  images: {
    domains: ["localhost", "strong-mind-software-backend.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strong-mind-software-backend.onrender.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
