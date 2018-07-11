'use strict'

const winston = require('winston')
const timber = require('timber')
const assertLevel = require('./helpers/assertLevel')

const {
  TIMBER_LEVEL = 'info',
} = process.env

assertLevel(TIMBER_LEVEL, 'TIMBER_LEVEL invalid.')

const dropLineBreak = string => (
  string.endsWith('\n')
    ? string.substring(0, string.length - 1)
    : string
)

module.exports = new (winston.transports.Console)({
  name: 'timber',
  level: TIMBER_LEVEL,
  formatter: options => {
    // When we log errors, options.message comes as blank and it causes errors
    const message = options.message || options.meta.message || 'No message'
    const formatted = timber.formatters.Winston({ ...options, message })
    return dropLineBreak(formatted)
  },
})
