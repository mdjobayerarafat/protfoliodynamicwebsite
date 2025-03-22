const nextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
    domains: ['20.163.180.176', 'mdjobayerarafat.live', 'www.mdjobayerarafat.live', '20.197.36.135'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'http://20.197.36.135',
        pathname: '/static/**',
      },
      {
        protocol: 'https',
        hostname: 'mdjobayerarafat.live',
        pathname: '/static/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;