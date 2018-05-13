'use strict'

const winston = require('winston')
const assertLevel = require('./helpers/assertLevel')

const {
  LOGGER_TIMBER,
  TIMBER_LEVEL = 'debug',
} = process.env

assertLevel(TIMBER_LEVEL, 'TIMBER_LEVEL invalid.')

const dropLineBreak = string => (
  string.endsWith('\n')
    ? string.substring(0, string.length - 1)
    : string
)

let transport
if (LOGGER_TIMBER) {
  const timber = require('timber')
  transport = new (winston.transports.Console)({
    name: 'timber',
    level: TIMBER_LEVEL,
    formatter: options => {
      // When we log errors, options.message comes as blank and it causes errors
      const message = options.message || options.meta.message || 'No message'
      const formatted = timber.formatters.Winston({ ...options, message })
      return dropLineBreak(formatted)
    },
  })
}

module.exports = transport
