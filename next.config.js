/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/Portfolio' : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: isProduction ? '/Portfolio/' : '',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 