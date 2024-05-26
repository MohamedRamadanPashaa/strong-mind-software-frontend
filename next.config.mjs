/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // outputFileTracing: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/v1/:path*",
  //       destination: `${process.env.REAL_WEBSITE}/api/v1/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
