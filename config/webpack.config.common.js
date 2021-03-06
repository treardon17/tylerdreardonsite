const path = require('path')
const webpack = require('webpack')

const config = {
  // the base directory for resolving entry points and loaders from configuration
  context: path.resolve('./'),

  // remove webpack performace hints
  performance: {
    hints: process.env.npm_lifecycle_event === 'build' ? 'warning' : false
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  resolve: {
    // automatically resolve these extensions when importing
    // ex : import file from './modules/file.js' => import file from './modules/file'
    extensions: ['.js', '.jsx'],
    // alias styles, modules, and state
    alias: {
      '@': path.resolve('src'),
      styles: path.resolve('src/styles/'),
      modules: path.resolve('src/modules/'),
      state: path.resolve('src/state'),
    }
  },

  module: {
    // define common rules to bundle
    rules: [
      {
        // es6 -> es5
        test: /\.(jsx?|js)$/,
        use: ['babel-loader'],
        include: path.resolve('./src'),
      },
      {
        // eslint all vue and js files
        // before compilation
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        include: path.resolve('./src'),
        use: [{
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        }],
        enforce: 'pre',
      },
      {
        // use file loader to import all fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader?name=fonts/[name].[ext]',
        include: path.resolve('./src'),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },

  node: {
    // polyfill or mock certain Node.js globals - https://webpack.js.org/configuration/node/
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
}

module.exports = config
