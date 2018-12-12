const asyncWebpackConfig = require('../Config/webpack.config')
const webpack = require('webpack')
const spinner = require('ora')('Start Build App')
const { resolve } = require('path')

class Dev {
  constructor() {
    this.start()
  }

  async start() {
    this.setupEnvVariable()
    this.startWebpack()
  }

  setupEnvVariable() {
    global.pathResolve = resolve
    global.projectRoot = pathResolve(__dirname, '../../')
    global.appRoot = pathResolve(projectRoot, 'App')
    global.outputPath = pathResolve(appRoot, 'Dist')
  }

  startWebpack() {
    spinner.start()

    webpack(asyncWebpackConfig(), (err, stats) => {
      console.log('done')
      if (err) throw err
      spinner.stop()
    })
  }
}

module.exports = new Dev()