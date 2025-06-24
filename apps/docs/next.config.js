/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/playground',
        destination: '/docs',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
