'use strict'

const moment = require('moment')
const winston = require('winston')

const assertLevel = require('./helpers/assertLevel')

const {
  LOGGER_LEVEL = 'info',
  NODE_ENV,
  TIMBER_KEY,
  TIMBER_LEVEL = 'debug',
} = process.env

assertLevel(LOGGER_LEVEL, 'LOGGER_LEVEL invalid.')

const colorize = NODE_ENV === 'development'
const shouldLog = NODE_ENV !== 'test'

let transport
if (shouldLog && TIMBER_KEY) {
  assertLevel(TIMBER_LEVEL, 'TIMBER_LEVEL invalid.')
  const timber = require('timber')
  timber.install(new timber.transports.HTTPS(TIMBER_KEY))
  transport = new (winston.transports.Console)({
    name: 'console',
    level: TIMBER_LEVEL,
    formatter: timber.formatters.Winston,
  })
} else if (shouldLog) {
  transport = new (winston.transports.Console)({
    name: 'console',
    level: LOGGER_LEVEL,
    timestamp: () => moment().format(),
    formatter: options => {
      const { message } = options
      const meta = (options.meta && Object.keys(options.meta).length)
        ? `\n${JSON.stringify(options.meta, null, 2)}`
        : ''

      let msg = `${options.timestamp()} ${options.level.toUpperCase()} ${message} ${meta}`

      if (colorize) msg = winston.config.colorize(options.level, msg)

      return msg
    },
  })
}

module.exports = transport
