const withNextIntl = require('next-intl/plugin')('./messages');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.example.com' }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
