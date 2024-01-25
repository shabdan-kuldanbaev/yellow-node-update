const withPlugins = require('next-compose-plugins');
const withObj = require('webpack-obj-loader');
const { withSentryConfig } = require('@sentry/nextjs');

const isProd = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isProd && process.env.ANALYZE === 'true',
});
const TerserPlugin = require('terser-webpack-plugin');

const withCDN = isProd && +process.env.NEXTJS_STATIC_FILES_WITH_CDN
  ? { assetPrefix: process.env.EDGE_URL }
  : {};

const nextConfig = {
  mode: process.env.NODE_ENV,
  reactStrictMode: !isProd,
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 50 * 1000,
    pagesBufferLength: 5,
  },
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
    loader: 'custom',
    path: '',
    deviceSizes: [390, 450, 568, 768, 1024, 1200, 1440, 1920, 2560, 3840],
  },
  ...withCDN,
  webpack: (config, { dev }) => {
    /* eslint-enable */

    // config.module.rules.push({
    //   test: /node_modules\/@material-ui\/core\/esm\/Popper\/Popper\.js$/,
    //   use: {
    //     loader: 'string-replace-loader',
    //     options: {
    //       search: 'import PopperJS from \'popper.js\';',
    //       replace: 'import PopperJS from "../../../../popper.js/dist/esm/popper";',
    //     },
    //   },
    // });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: {
        not: [/\.[jt]sx?$/, /\.(sc|c)ss?$/],
      },
      use: ['@svgr/webpack'],
    }, {
      test: /yellow-logo\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            output: { comments: false },
            mangle: true,
            compress: true,
          },
          extractComments: false,
        }),
      );
    }

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
  (currentNextConfig) => withSentryConfig(currentNextConfig, {
    silent: true,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: 'yellow-systems',
    project: 'yellow-website-v2',
  }),
], nextConfig);
