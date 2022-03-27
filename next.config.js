/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_BASE_PATH: '/StatementX',
    NEXT_PUBLIC_ASSET_PREFIX: '/StatementX/',
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/StatementX',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '/StatementX/'
}
