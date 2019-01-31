import BaseCommand from 'Commands/_BaseCommand'
class ExampleCommand extends BaseCommand{
  async setupCommand() {
    this.name = 'example'
    this.argsConfig = [
      {
        name: 'arg_string',
        required: true,
        description: 'A string argument',
        defaultValue: 'foobar',
      },
      {
        name: 'arg_number',
        description: 'A number argument',
        defaultValue: 99,
        type: 'boolean',
      },
      {
        name: 'arg_boolean',
        required: true,
        description: 'A boolean argument',
        type: 'boolean',
      },
      {
        name: 'arg_array',
        description: 'A array argument',
        type: 'array',
      },
    ]
    this.description = `This is a example command.`
  }

  async start() {
    log('Start example command.', 'green')
    console.log(this.args)
  }
}

export default new ExampleCommand()