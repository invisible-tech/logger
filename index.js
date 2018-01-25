'use strict'

const glob = require('glob')
const winston = require('winston')

const cloneErrorProxy = require('./helpers/cloneErrorProxy')

const isTransport = t => t && t.log
const transports = glob.sync('./transports/*.js', { cwd: __dirname })
  .map(require)
  .filter(isTransport)

const unwrappedLogger = new (winston.Logger)({
  transports,
})

const logger = cloneErrorProxy(unwrappedLogger)

module.exports = logger
