/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
