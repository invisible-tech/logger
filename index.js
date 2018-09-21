'use strict'

const winston = require('winston')

const isTest = (process.env.NODE_ENV === 'test')
const transports = [
  (process.env.LOGGER_TIMBER === 'true') ?
    require('./transports/timber') :
    require('./transports/console'),
]

const logger = new (winston.Logger)({
  exitOnError: false,
  transports: isTest ? undefined : transports,
})

module.exports = logger
