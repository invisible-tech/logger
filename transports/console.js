'use strict'

const moment = require('moment')
const winston = require('winston')

const {
  LOGGER_LEVEL = 'info',
  NODE_ENV,
} = process.env

const colorize = NODE_ENV === 'development'

let transport
if (NODE_ENV !== 'test') {
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
