const config = require('../Config/webpack.config')
const webpack = require('webpack')
const ora = require('ora')
const spinner = ora('Start Build App')
spinner.start()

webpack(config, (err, stats) => {
  console.log('done')
  if (err) throw err
  spinner.stop()
})