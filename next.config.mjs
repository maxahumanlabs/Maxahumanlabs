/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'maxahuman.local',
      },
      {
        protocol: 'https',
        hostname: 'maxahuman.local',
      },
    ],
  },
};

export default nextConfig;
