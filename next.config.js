/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
  sassOptions: {
    prependData: `
    @import "/src/styles/mixins.scss";
    @import "/src/styles/variables.scss";`,
  },
};

module.exports = nextConfig;
