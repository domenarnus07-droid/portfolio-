/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" omogoča vitek Docker image (samo potrebne datoteke)
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;
