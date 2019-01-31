import 'Global'
import ExampleCommand from 'Commands/ExampleCommand'
class App {
  constructor() {
    this.commandList = [
      ExampleCommand,
    ]

    this.setup()
  }

  async setup() {
    this.error = []
    this.commands = []
    this.commandList.forEach(command => {
      command.setupCommand()
      this.commands[command.name] = command
    })
    this.start()
  }

  async start() {
    log('app start')
    const command = this.validate()
    await command.beforeStart()
    await command.start()
  }

  validate() {
    const command = this.commands[args.command]
    if(!command) {
      log(`Command ${args.command} not found.`, 'red')
      process.exit()
    }

    const self = this
    command.argsConfig.forEach(argConfig => {
      self._validateArg(command, argConfig)
    })

    if(this.error.length == 0) return command
    let errorMessage = ''
    this.error.forEach(error => errorMessage += `${error.error}\n`)
    log(errorMessage, 'red')
    process.exit()
  }

  _validateArg(command, argConfig) {
    const argName = argConfig.name
    let argValue

    switch (argConfig.type) {
      case 'boolean':
        argValue = !!args[argName]
        break
      case 'number':
        argValue = Number(args[argName])
        if(isNaN(argValue)) argValue = 0
        break
      case 'array':
        argValue = !argValue ? [] : String(argValue).split(',')
        break
      default:
        argValue = !args[argName] ? '' : String(args[argName])
    }

    // validate require
    if(argConfig.required == true) {
      if(argValue === null || argValue === undefined || argValue === '') {
        this.error.push({
          error: `Argument ${argName} is required.`
        })
        return
      }
    }

    argValue = this.setDefaultValueIfEmpty(argValue, argConfig)
    command.args[argName] = argValue
  }

  setDefaultValueIfEmpty(value, argConfig) {
    const defaultValue = argConfig.defaultValue
    const type = argConfig.type
    if(!defaultValue) return value

    if(type == 'array') {
      if(value.length == 0) return defaultValue.split(',')
    }

    if(type == 'number') {
      if(!value) return defaultValue
    }

    if(value) return value
    return defaultValue
  }
}

new App()