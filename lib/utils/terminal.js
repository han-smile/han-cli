const { spawn } = require('child_process')

const commandSpawn = (...args) => {
    const childProcess = spawn(...args)
    return new Promise((resolve) => {
        // 子进程的输出打印到当前进程中
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)

        // 监听子进程运行结束通知当前进程
        childProcess.on('close', () => {
            resolve()
        })
    })
}

module.exports = {
    commandSpawn
}