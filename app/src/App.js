import 'Global'

class App {
  constructor() {
    this.start()
  }

  async start() {
    log('app start')
    log(args, 'green')
  }
}

new App()