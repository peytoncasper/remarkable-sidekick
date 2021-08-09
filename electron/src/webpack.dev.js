const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: "Google Chrome",
    contentBase: path.join(__dirname, 'public/'),
    port: 9000,
    historyApiFallback: true,
    proxy: {

    },
  },
});
