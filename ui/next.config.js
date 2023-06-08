/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/files/:path*",
        destination: "http://backend-rest:3000/files/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
