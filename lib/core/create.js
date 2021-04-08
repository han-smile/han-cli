const { program } = require('commander')
const { createProjectAction, addComponentAction } = require('./actions')

const createCommands = () => {
  program.command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program.command('addCpn <name>')
    .description('Add a component to your project, 例如：han addCpn Cart -d src/user')
    .action((name) => {
      addComponentAction(name, program.opts().dest || 'src/components')
    })

}

module.exports = createCommands