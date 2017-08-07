'use strict'

const bugsnag = require('bugsnag')
const { BugsnagTransport } = require('winston-bugsnag')

const {
  BUGSNAG_KEY,
  BUGSNAG_LEVEL = 'warn',
} = process.env

let transport
if (BUGSNAG_KEY) {
  bugsnag.register(BUGSNAG_KEY)

  transport = new BugsnagTransport({
    name: 'bugsnag',
    level: BUGSNAG_LEVEL,
  })
}

module.exports = transport
