/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const REPO_NAME = 'Portfolio';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: isProduction ? `/${REPO_NAME}` : '',
  assetPrefix: isProduction ? `/${REPO_NAME}/` : '',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 