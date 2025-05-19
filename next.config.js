/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/Portfolio',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/Portfolio',
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig 