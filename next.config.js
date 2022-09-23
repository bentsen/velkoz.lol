/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains : [
        'ddragon.leagueoflegends.com',
        'ddragon.canisback.com',
    ],
  },
}

module.exports = nextConfig
