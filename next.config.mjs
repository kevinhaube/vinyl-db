/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse/recently-added',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
