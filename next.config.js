/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    serverActions: true
  },
}

module.exports = nextConfig
