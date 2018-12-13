require('../src/Global')
const asyncWebpackConfig = require('../config/webpack.config')
const webpack = require('webpack')
const spinner = require('ora')('Start Build App')

class dev {
  constructor() {
    this.start()
  }

  async start() {
    await this.build()
  }

  async build() {
    notify('Start Build App')
    await execAsync(`rm -rf ./*`, { cwd: outputPath })
    spinner.start()
    await this.webpackBuild()

    if(args.prod == true) {
      await this.production()
    }
  }

  async production() {
    const distFolderPath = pathResolve(outputPath, projectConfig.name)
    const productionAppPath = pathResolve(productionPath, projectConfig.name)
    const copyfileFolderPath = pathResolve(appRoot, 'copyfile')
    const readmeFilePath = pathResolve(projectRoot, 'README.md')

    await execAsync(`rm -rf ${productionAppPath}`)
    mkdir('-p', productionAppPath)
    await execAsync(`cp ${readmeFilePath} ./`, { cwd: productionAppPath })
    await execAsync(`cp -r ${copyfileFolderPath}/* ./`, { cwd: productionAppPath })
    await execAsync(`cp -r ${distFolderPath}/* ./`, { cwd: productionAppPath })
  }

  webpackBuild() {
    return new Promise((resolve) => {
      webpack(asyncWebpackConfig(), (error, stats) => {
        spinner.stop()
        if(!error) {
          log('Build Success')
          notify('Build Success')
        }

        else {
          log(`Build Fail: ${error}`, 'red')
          notify(`Build Fail: ${error}`)
        }

        resolve()
      })
    })
  }
}

module.exports = new dev()