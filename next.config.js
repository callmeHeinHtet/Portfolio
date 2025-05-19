/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'default',
    path: '',
    domains: ['github.com'],
  },
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 