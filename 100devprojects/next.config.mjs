/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Old SPA served demo pages as /demos/<name>/index.html — keep those working
  // and also accept the folder URL without index.html.
  async redirects() {
    return [
      { source: '/demos/:name', destination: '/demos/:name/index.html', permanent: true },
      // Former SPA-only error route; error UI is now handled by app/error.jsx
      { source: '/500', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
