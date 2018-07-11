'use strict'

const winston = require('winston')

const shouldLogToConsole = (process.env.NODE_ENV !== 'test')
const transports = []

if (shouldLogToConsole && process.env.LOGGER_TIMBER === 'true') transports.push(require('./transports/timber'))
else if (shouldLogToConsole) transports.push(require('./transports/console'))
if (process.env.BUGSNAG_KEY) transports.push(require('./transports/bugsnag'))
if (process.env.LOGGLY_TOKEN) transports.push(require('./transports/loggly'))

const logger = new (winston.Logger)({
  exitOnError: false,
  transports,
})

module.exports = logger
