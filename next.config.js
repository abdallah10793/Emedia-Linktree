/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'linktree13.s3.amazonaws.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  }
}

module.exports = nextConfig
