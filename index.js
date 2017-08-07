'use strict'

const glob = require('glob')
const winston = require('winston')

const isTransport = t => t && t.log
const transports = glob.sync('./transports/*.js')
  .map(require)
  .filter(isTransport)

const logger = new (winston.Logger)({
  transports,
})

module.exports = logger
