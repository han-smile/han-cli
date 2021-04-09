const { program } = require('commander')

const helpOptions = () => {
  program.option('-d, --dest <dest>', 'a destination folder, 例如: -d src/components')
    .on('--help', () => {
      console.log(`
        欢迎使用han-cli
       (#^.^#)
      `)
    })
}
module.exports = helpOptions
