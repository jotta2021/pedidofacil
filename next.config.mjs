/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '',
                port: '3333',
                pathname: '/files/**',
            },
        ],
    },
};

export default nextConfig;
