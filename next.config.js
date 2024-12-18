const withMakeswift = require('@makeswift/runtime/next/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    storeHash: 'b6whnxse21r',
    accessToken: 'sztv42m0psb9nblrzuuu23myq5dj9lw',
    apiUrl: 'http://localhost:5555/',
    // apiUrl: `https://api.bigcommerce.com/stores/b6whnxse2r/v3/catalog/products`,
  },
}

module.exports = withMakeswift(nextConfig)
