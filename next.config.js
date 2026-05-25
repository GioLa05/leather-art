/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // ts-morph + prettier are heavy Node-only deps used by the admin writers;
    // keep them out of the server bundle and load them from node_modules.
    serverComponentsExternalPackages: ['ts-morph', 'prettier'],
  },
};

module.exports = nextConfig;
