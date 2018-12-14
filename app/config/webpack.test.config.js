const baseConfig = require('./webpack.config')
const merge = require('webpack-merge')

module.exports = () => {
  return merge(baseConfig(), {
    devtool: '#inline-source-map',
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
  })
}