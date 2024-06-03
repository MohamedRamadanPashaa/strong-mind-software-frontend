/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
    // domains: ["localhost", "strong-mind-software-backend.onrender.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
