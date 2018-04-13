const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const withLess = require('@zeit/next-less');
const path = require('path');

const buildId = 'your-build-id';
module.exports = withLess({
  cssModules: true,
  distDir: 'build',
  generateEtags: false,
  generateBuildId: async () => {
    return buildId;
  },
  webpack: (oldConfig) => {
    // Fixes npm packages that depend on `fs` module
    const config = { ...oldConfig };
    config.node = {
      fs: 'empty',
    };

    console.log(config.module.rules);
    config.module.rules.push({
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    });
    config.module.rules.push({
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    });
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        templateFilePath: 'config/service-worker.tmpl',
        navigateFallback: '/',
        filename: 'service-worker.js',
        staticFileGlobs: [
          // 'static/**/*.*',
        ],
        // mergeStaticsConfig: true,
        staticFileGlobsIgnorePatterns: [/^build\/dist\/.*/],
        stripPrefixMulti: {
          [path.resolve(__dirname, 'build/static')]: '_next/static',
          [path.resolve(__dirname, 'build/bundles/pages')]: `_next/${buildId}/page`,
          [path.resolve(__dirname, 'build')]: `_next/${buildId}`,
        },
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*^[.(js|css|png|jpg)]$/,
          }, {
            handler: 'cacheFirst',
            urlPattern: /\/$/,
          },
        ],
      })
    );

    return config;
  },
});
