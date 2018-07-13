'use strict'

require('winston-loggly-bulk')
const winston = require('winston')

const {
  LOGGLY_TOKEN,
  LOGGLY_SUBDOMAIN,
  LOGGLY_LEVEL = 'warn',
} = process.env

module.exports = new winston.transports.Loggly({
  subdomain: LOGGLY_SUBDOMAIN,
  token: LOGGLY_TOKEN,
  level: LOGGLY_LEVEL,
})
