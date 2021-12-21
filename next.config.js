/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        domains: ['assets.vercel.com', 'secure.gravatar.com', 'bioklaani.fi'],
        formats: ['image/avif', 'image/webp'],
    },
}

module.exports = nextConfig;
