/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/Jal",
  assetPrefix: "/Jal/",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
