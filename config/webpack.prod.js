const { join } = require('path');
const { NoEmitOnErrorsPlugin, ProgressPlugin } = require('webpack');
const { UglifyJsPlugin } = require('webpack').optimize;

const nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ]
  },
  target: 'node',
  externals: [
    nodeExternals()
  ],
  entry: './src/index.ts',
  output: {
    filename: 'index.umd.js',
    path: join(__dirname, '..', 'lib'),
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        options: {
          silent: true
        },
        include: [
          join(__dirname, '..', 'src')
        ]
      }
    ]
  }
};
