/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "nisabookland.blob.core.windows.net",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;
