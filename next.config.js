const withPlugins = require('next-compose-plugins');
const withObj = require('webpack-obj-loader');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';
const withCDN = isProd && +process.env.NEXTJS_STATIC_FILES_WITH_CDN
  ? { assetPrefix: process.env.EDGE_URL }
  : {};

const nextConfig = {
  reactStrictMode: !isProd,
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 50 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    domains: ['images.ctfassets.net'],
    loader: 'custom',
    path: '',
    deviceSizes: [390, 450, 568, 768, 1024, 1200, 1440, 1920, 2560, 3840],
  },
  ...withCDN,
  webpack: (config) => {
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
  // eslint-disable-next-line global-require
  [withBundleAnalyzer],
  // TODO: uncomment when sentry app will be created
  // [withSentryConfig, { silent: true }],
], nextConfig);
