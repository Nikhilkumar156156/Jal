/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Jal",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
