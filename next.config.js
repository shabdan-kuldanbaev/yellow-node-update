const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withObj = require('webpack-obj-loader');
const withFonts = require('next-fonts');
const withVideos = require('next-videos');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  distDir: 'build',
  webpack: (config, { isServer }) => {
    /* eslint-disable */
    require('dotenv').config();

    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js');
      }
      return entries;
    };

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

    return config;
  },
};

module.exports = withPlugins([
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
  }],
  withImages,
  [withCSS, {
    cssModules: false,
  }],
  withObj,
  withFonts,
  withVideos,
  [withBundleAnalyzer],
], nextConfig);
