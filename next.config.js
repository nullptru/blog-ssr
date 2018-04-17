const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const withLess = require('@zeit/next-less');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

const buildId = 'geass-blog-ssr';
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

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 3000,
        openAnalyzer: true,
      }));
    }
    config.devServer = {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          secure: false,
          pathRewrite: { '/api/v1': '' },
        },
      },
    };
    config.module.rules.push({
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
    });
    config.plugins.push(new SWPrecacheWebpackPlugin({
      verbose: true,
      templateFilePath: 'config/service-worker.tmpl',
      navigateFallback: '/',
      filename: 'service-worker.js',
      staticFileGlobs: [
        'static/*.*',
      ],
      mergeStaticsConfig: true,
      staticFileGlobsIgnorePatterns: [/^build\/dist\/.*/, /.map$/, /static\/(haru|haruto|miku|murakumo|shizuku)\/.*/],
      stripPrefixMulti: {
        [path.resolve(__dirname, 'build/static')]: '_next/static',
        [path.resolve(__dirname, 'build/chunks')]: '_next/webpack/chunks',
        [path.resolve(__dirname, 'build/bundles/pages')]: `_next/${buildId}/page`,
        [path.resolve(__dirname, 'build')]: `_next/${buildId}`,
      },
      runtimeCaching: [
        {
          handler: 'cacheFirst',
          urlPattern: /^https?:\/\/(?!(geasscn.me|localhost)[^.]*\.(js|css|png|jpg)).*$/,
        },
      ],
    }));

    return config;
  },
});
