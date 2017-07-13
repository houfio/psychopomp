const { join } = require('path');
const { HotModuleReplacementPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin, ProgressPlugin } = require('webpack');

module.exports = {
  cache: true,
  resolve: {
    modules: [
      'src',
      'demo',
      'node_modules'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ]
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3030',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './demo/index.tsx'
  ],
  output: {
    filename: 'index.js',
    publicPath: 'http://localhost:3030/'
  },
  devtool: 'source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          silent: true
        },
        include: [
          join(__dirname, '..', 'src'),
          join(__dirname, '..', 'demo')
        ]
      }
    ]
  },
  devServer: {
    contentBase: 'demo',
    hot: true,
    port: 3030,
    stats: 'errors-only'
  }
};
