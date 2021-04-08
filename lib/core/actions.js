const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { complie, writeToFile, createMkDir, hyphenate } = require('../utils/utils')

const createProjectAction = async (project) => {
  // 1.通过download-git-repo从代码仓库中下载模板
  await download(vueRepo, project, { clone: true })
  // 2.进入目录,并且执行 `npm install`命令
  // 兼容windows
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })
  // 3.执行 `npm run serve`命令
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 4. 打开浏览器 这里并不能简单的拿到端口 放到模板的webpack中配置
  // open('http://locahost:8080/')

}

const addComponentAction = async (name, dest) => {
  // 1.编译ejs得到  数据解析的模板
  tmpStr = await complie('vue-component.ejs', { name: hyphenate(name) })

  if (createMkDir(dest)) {
    const targetPath = path.resolve(dest, `${name}.vue`)
    console.log('tmpstr', targetPath)

    // 2.写入文件
    writeToFile(targetPath, tmpStr)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction
}