'use strict'

const Loggly = require('winston-loggly-bulk')

const {
  LOGGLY_TOKEN,
  LOGGLY_SUBDOMAIN,
  LOGGLY_LEVEL = 'warn',
} = process.env

let transport
if (LOGGLY_TOKEN) {
  transport = new Loggly({
    subdomain: LOGGLY_SUBDOMAIN,
    token: LOGGLY_TOKEN,
    level: LOGGLY_LEVEL,
  })
}

module.exports = transport
