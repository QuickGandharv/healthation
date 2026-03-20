/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'telehealthwebapplive.cmcludhiana.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
