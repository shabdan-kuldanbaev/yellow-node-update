const withPlugins = require('next-compose-plugins');
const withObj = require('webpack-obj-loader');
// const { withSentryConfig } = require('@sentry/nextjs');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';
const withCDN = isProd && +process.env.NEXTJS_STATIC_FILES_WITH_CDN
  ? { assetPrefix: process.env.EDGE_URL }
  : {};

const nextConfig = {
  ...withCDN,
  webpack: (config, { isServer }) => {
    /* eslint-disable */
    require('dotenv').config();

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];
    /* eslint-enable */

    config.module.rules.push({
      test: /node_modules\/@material-ui\/core\/esm\/Popper\/Popper\.js$/,
      use: {
        loader: 'string-replace-loader',
        options: {
          search: 'import PopperJS from \'popper.js\';',
          replace: 'import PopperJS from "../../../../popper.js/dist/esm/popper";',
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // This header prevents the site from being displayed in an iframe.
  async headers() {
    return [
      {
        source: '/(.*)?',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins([
  withObj,
  [withBundleAnalyzer],
], nextConfig);
