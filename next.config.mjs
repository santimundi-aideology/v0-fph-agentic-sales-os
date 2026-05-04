/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Keep unoptimized for now to avoid build issues, but add lazy loading
    unoptimized: true,
    // Match next/image `quality` props used in the app (default is [75] only in Next 15+)
    qualities: [75, 85],
    // Enable when ready: formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Enable React strict mode for better performance debugging
  reactStrictMode: true,
  // Optimize compilation
  swcMinify: true,
  // Enable compression
  compress: true,
}

export default nextConfig