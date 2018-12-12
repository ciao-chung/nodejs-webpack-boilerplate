import 'Global'

class App {
  constructor() {
    this.start()
  }

  async start() {
    log('app start.')
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