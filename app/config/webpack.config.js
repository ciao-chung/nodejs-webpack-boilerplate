const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = () => {
  return {
    target: 'node',
    entry: ['babel-polyfill', pathResolve(appRoot, 'src/App.js')],
    output: {
      path: outputPath,
      filename: `${projectConfig.name}/app.js`,
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        pathResolve('src'),
        'node_modules',
      ],
      alias: {
        'src': pathResolve('src'),
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
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: true,
        parallel: true
      }),
    ],
  }
}