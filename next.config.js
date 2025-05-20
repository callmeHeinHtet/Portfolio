/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/Portfolio' : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'default',
    path: basePath,
    domains: ['github.com'],
  },
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: isProduction ? '/Portfolio/' : '',
  trailingSlash: true,
  distDir: 'out',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `${basePath}/`,
            outputPath: 'static/images/',
            name: '[name].[ext]',
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig 