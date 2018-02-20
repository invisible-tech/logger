'use strict'

const glob = require('glob')
const winston = require('winston')

const isTransport = t => t && t.log
const transports = glob.sync('./transports/*.js', { cwd: __dirname })
  .map(require)
  .filter(isTransport)

const logger = new (winston.Logger)({
  exitOnError: false,
  transports,
})

module.exports = logger
