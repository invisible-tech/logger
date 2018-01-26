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

// We are proxying winston logger because versions from 2.3.0 until 2.4.0
// does not log Error objects. The proxy is going to be DEPRECATED
// after winston solves its bug.
const logger = cloneErrorProxy(unwrappedLogger)

module.exports = logger
