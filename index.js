#!/usr/bin/env node
const { program } = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

helpOptions()
createCommands()

program.version(require('./package.json').version)

program.parse(process.argv)
console.log('hello han-cli')