'use strict'

const bugsnag = require('bugsnag')
const { BugsnagTransport } = require('winston-bugsnag')

const assertLevel = require('./helpers/assertLevel')

const {
  BUGSNAG_KEY,
  BUGSNAG_LEVEL = 'warn',
} = process.env

assertLevel(BUGSNAG_LEVEL, 'BUGSNAG_LEVEL invalid.')

let transport
if (BUGSNAG_KEY) {
  bugsnag.register(BUGSNAG_KEY)

  transport = new BugsnagTransport({
    name: 'bugsnag',
    level: BUGSNAG_LEVEL,
  })
}

module.exports = transport
