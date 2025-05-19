/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  reactStrictMode: true,
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
}

module.exports = nextConfig 