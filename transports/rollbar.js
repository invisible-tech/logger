'use strict'

const { Rollbar } = require('winston-transport-rollbar')

const assertLevel = require('./helpers/assertLevel')

const { ROLLBAR_LEVEL = 'info', ROLLBAR_ACCESS_TOKEN, NODE_ENV } = process.env

assertLevel(ROLLBAR_LEVEL, 'ROLLBAR_LEVEL invalid.')

module.exports = new Rollbar({
  rollbarConfig: {
    accessToken: ROLLBAR_ACCESS_TOKEN,
    environment: NODE_ENV,
    reportLevel: ROLLBAR_LEVEL,
  },
})
