/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
