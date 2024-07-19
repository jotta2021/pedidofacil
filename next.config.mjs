/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pizzariaapi.onrender.com',
                pathname: '/files/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/files/**',
            },
        ],
    },
};

export default nextConfig;
