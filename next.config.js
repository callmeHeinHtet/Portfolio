/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Portfolio',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/Portfolio/',
  trailingSlash: true,
}

module.exports = nextConfig 