'use strict'

const winston = require('winston')

const isTest = process.env.NODE_ENV === 'test'
const enabledInTest = process.env.LOGGER_ENABLED_IN_TEST === 'true'
const transports = [
  process.env.LOGGER_TIMBER === 'true'
    ? require('./transports/timber')
    : require('./transports/console'),
]

if (process.env.ROLLBAR_ACCESS_TOKEN) transports.unshift(require('./transports/rollbar'))

const logger = new winston.Logger({
  exitOnError: false,
  transports: isTest && ! enabledInTest ? undefined : transports,
})

module.exports = logger
