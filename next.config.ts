import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGES_HOST || '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
