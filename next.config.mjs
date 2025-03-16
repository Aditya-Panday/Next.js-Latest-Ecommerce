/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Any domain
      },
      {
        protocol: "http",
        hostname: "**", // Any domain
      },
    ],
  },
};

export default nextConfig;
