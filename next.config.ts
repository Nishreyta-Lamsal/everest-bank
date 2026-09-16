import type { NextConfig } from 'next';

const apiProxyTarget =
  process.env.API_PROXY_TARGET ?? 'http://143.110.240.38:8000';

const upstream = new URL(apiProxyTarget);

const nextConfig: NextConfig = {
  reactCompiler: true,
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: upstream.protocol.replace(':', '') as 'http' | 'https',
        hostname: upstream.hostname,
        port: upstream.port,
        pathname: '/media/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: `${apiProxyTarget.replace(/\/$/, '')}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
