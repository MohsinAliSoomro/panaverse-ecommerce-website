/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.sanity.io"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
