/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Add trailing slash to all routes
  trailingSlash: true,
  // Disable ESLint during build (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Important: Set assetPrefix if your repository name is not username.github.io
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
}

module.exports = nextConfig
