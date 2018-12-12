const WebpackShellPlugin = require('webpack-shell-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = () => {
  return {
    target: 'node',
    entry: ['babel-polyfill', pathResolve(appRoot, 'Src/App.js')],
    output: {
      path: outputPath,
      filename: 'app.js',
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        pathResolve('Src'),
        'node_modules',
      ],
      alias: {
        'Src': pathResolve('Src'),
      },
    },
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
      }),
      new UglifyJsPlugin(),
    ],
  }
}