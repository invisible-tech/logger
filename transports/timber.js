'use strict'

const winston = require('winston')
const assertLevel = require('./helpers/assertLevel')

const {
  NODE_ENV,
  TIMBER_KEY,
  TIMBER_LEVEL = 'debug',
} = process.env

assertLevel(TIMBER_LEVEL, 'TIMBER_LEVEL invalid.')

let transport
if (TIMBER_KEY) {
  const timber = require('timber')
  if (NODE_ENV !== 'test') timber.install(new timber.transports.HTTPS(TIMBER_KEY))
  transport = new (winston.transports.Console)({
    name: 'timber',
    level: TIMBER_LEVEL,
    formatter: options => {
      // When we log errors, options.message comes as blank and it causes errors
      const message = options.message || options.meta.message || 'No message'
      return timber.formatters.Winston({ ...options, message })
    },
  })
}

module.exports = transport
