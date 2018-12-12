import chalk from 'chalk'
import yargsParser from 'yargs-parser'

class App {
  constructor() {
    this.init()
    this.start()
  }

  async init() {
    global.chalk = chalk
    global.args = yargsParser(process.argv.slice(2))
    delete global.args._
  }

  async start() {
    console.log(chalk.cyanBright('app start.'))
    const result = await this.someAwaitAction()
    console.log(result)
  }

  someAwaitAction() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          foo: 'bar'
        })
      }, 1000)
    })
  }
}

new App()