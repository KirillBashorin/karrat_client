/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
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
