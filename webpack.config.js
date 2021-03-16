// Main imports | DON'T CHANGE
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const SveltePreprocess = require('svelte-preprocess');
const pkg = require('./package.json');

// Project related settings
const ENV = process.env.NODE_ENV || 'development';
const isProd = ENV === 'production';
const dist = './dist';
const port = 8080;

// Webpack configuration | DON'T CHANGE
module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: ENV,
  output: {
    path: path.join(__dirname, dist),
    filename: 'bundle.js',
    chunkFilename: 'bundle.[chunk].js'
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: pkg.displayName,
      alwaysNotify: true
    }),
    new HtmlWebpackPlugin({
      title: pkg.displayName,
      template: './src/html/index.html'
    })
  ],
  resolve: {
    // see below for an explanation
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              // NOTE Svelte's dev mode MUST be enabled for HMR to work
              dev: !isProd,
            },

            // NOTE emitCss: true is currently not supported with HMR
            // Enable it for production to output separate css file
            emitCss: isProd, // Default: false
            // Enable HMR only for dev mode
            hotReload: !isProd, // Default: false
            // Extra HMR options, the defaults are completely fine
            // You can safely omit hotOptions altogether
            hotOptions: {
              // Prevent preserving local component state
              preserveLocalState: false,

              // If this string appears anywhere in your component's code, then local
              // state won't be preserved, even when noPreserveState is false
              noPreserveStateKey: '@!hmr',

              // Prevent doing a full reload on next HMR update after fatal error
              noReload: false,

              // Try to recover after runtime errors in component init
              optimistic: false,

              // --- Advanced ---

              // Prevent adding an HMR accept handler to components with
              // accessors option to true, or to components with named exports
              // (from <script context="module">). This have the effect of
              // recreating the consumer of those components, instead of the
              // component themselves, on HMR updates. This might be needed to
              // reflect changes to accessors / named exports in the parents,
              // depending on how you use them.
              acceptAccessors: true,
              acceptNamedExports: true,
            },
            preprocess: SveltePreprocess({
              scss: true,
              sass: true,
            })
          }
        }
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, dist),
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
    compress: true,
    port: port,
    host: 'localhost',
    hot: true,
    inline: true
  }
};