const { resolve } = require('path')
const WebpackShellPlugin = require('webpack-shell-plugin')
const projectRoot = resolve(__dirname, '../../')
const appRoot = resolve(projectRoot, 'App')
const outputPath = resolve(appRoot, 'Dist')

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', resolve(appRoot, 'Src/App.js')],
  output: {
    path: outputPath,
    filename: 'app.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [
        `rm -rf ${outputPath}/*`,
      ],
    })
  ],
}