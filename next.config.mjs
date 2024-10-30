/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false; // Полное отключение кеширования
    return config;
  },
};

export default nextConfig;
