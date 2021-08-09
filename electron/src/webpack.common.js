const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'src/');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      net: false
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
      },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },
};
