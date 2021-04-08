const path = require('path')
const fs = require('fs')
const { renderFile } = require('ejs')

// 通过ejs接收和编译动态数据模板
const complie = (template, data) => {
  const tmpPosition = `../templates/${template}`
  const tmpPath = path.resolve(__dirname, tmpPosition)

  // 编译ejs
  return new Promise((resolve, reject) => {
    renderFile(tmpPath, { data }, {}, (err, str) => {
      if (err) {
        console.warn(err)
        reject()
      } else {
        resolve(str)
      }
    })
  })
}

// 递归创建不存在的目录 例如: /view/nav/head  这三个目录都不存在，就需要递归从头创建
// ps: 实际用 { recursive: true } 更简单，但是目前不支持windows
const createMkDir = (pathName) => {
  // 文件目录已存在
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // 当前目录不存在，父目录继续递归判断是否存在
    if (createMkDir(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

/**
   * 转连字符  例如:NacBar => nav-bar
   */
const hyphenateRE = /\B([A-Z])/g
const hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

module.exports = {
  complie,
  writeToFile,
  createMkDir,
  hyphenate
}