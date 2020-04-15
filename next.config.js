const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withObj = require('webpack-obj-loader');
const withFonts = require('next-fonts');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const withTM = require("next-transpile-modules");

// TODO const nextConfig = {
//   webpack: (config, { isServer }) => {
//     /* eslint-disable */
//     config.plugins = config.plugins || [];

//     if (isServer) {
//       const objModels = /\.obj$/;
//       const origExternals = [...config.externals]
//       config.externals = [
//         (context, request, callback) => {
//           if (request.match(objModels)) return callback()
//           if (typeof origExternals[0] === 'function') {
//             origExternals[0](context, request, callback)
//           } else {
//             callback()
//           }
//         },
//         ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//       ]

//       config.module.rules.unshift({
//         test: objModels,
//         loader: 'webpack-obj-loader',
//       })
//     }

//     config.plugins = [ ...config.plugins];
//     /* eslint-enable */
//     return config;
//   },
// };

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
        entries['main.js'].unshift('./polyfill.js');
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
    return config;
  },

  transpileModules: [
    "express-http-context",
    "ip-regex",
    "is-ip",
    "logform",
    "winston-transport",
    "triple-beam",
    "intersection-observer-polyfill",
    "react-intersection-observer"
  ],
};

module.exports = withPlugins([
  withTM,
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
  }],
  withImages,
  [withCSS, {
    cssModules: false,
  }],
  withObj,
  withFonts,
], nextConfig);
