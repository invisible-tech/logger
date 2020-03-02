'use strict'

const moment = require('moment')
const winston = require('winston')
const assertLevel = require('./helpers/assertLevel')
const serialize = require('./helpers/serialize')

const {
  LOGGER_LEVEL = 'info',
  NODE_ENV,
} = process.env
const colorize = NODE_ENV === 'development'

assertLevel(LOGGER_LEVEL, 'LOGGER_LEVEL invalid.')

module.exports = new (winston.transports.Console)({
  name: 'console',
  level: LOGGER_LEVEL,
  timestamp: () => moment().format(),
  formatter: options => {
    const { message } = options
    // serialize objects such as SQL models by checking for toJSON
    options.meta = serialize(options.meta)
    const meta = (options.meta && Object.keys(options.meta).length)
      ? `\n${JSON.stringify(options.meta, null, 2)}`
      : ''

    let msg = `${options.timestamp()} ${options.level.toUpperCase()} ${message} ${meta}`

    if (colorize) msg = winston.config.colorize(options.level, msg)

    return msg
  },
})
