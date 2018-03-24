const isDebug = !!process.env.IS_DEBUG;

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index.jsx'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min.css',
    }),
    new webpack.DefinePlugin({
      IS_DEBUG: JSON.stringify(isDebug),
    }),
  ],
};
