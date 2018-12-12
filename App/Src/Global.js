import chalk from 'chalk'
import moment from 'moment'
import yargsParser from 'yargs-parser'

class Global {
  constructor() {
    this.init()
  }

  /**
   * log style(white, red, green, yellow, cyan, magenta)
   */
  log(content, style = 'cyan') {
    const result = typeof content == 'object' || typeof content == 'array'
      ? JSON.stringify(content)
      : content

    console.log(chalk[`${style}Bright`](result)+chalk.whiteBright(`\t at ${now()}`))
  }

  now() {
    return moment(new Date).format('YYYY-MM-DD HH:mm:ss')
  }

  async init() {
    global.chalk = chalk
    global.now = this.now
    global.log = this.log
    global.args = yargsParser(process.argv.slice(2))
    delete global.args._
  }
}

new Global()