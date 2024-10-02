/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
  sassOptions: {
    prependData: `@use "/src/styles/mixins.scss";`,
  }
};

module.exports = nextConfig;
