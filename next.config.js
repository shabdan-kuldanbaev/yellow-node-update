const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  webpack: (config, { isServer }) => {
    /* eslint-disable */
    config.plugins = config.plugins || [];

    if (isServer) {
      const objModels = /\.obj$/;
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(objModels)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: objModels,
        loader: 'webpack-obj-loader',
      })
    }

    config.plugins = [ ...config.plugins];
    /* eslint-enable */
    return config;
  },
};

module.exports = withPlugins([
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
], nextConfig);
