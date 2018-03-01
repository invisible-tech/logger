'use strict'

const path = require('path')
const bugsnag = require('bugsnag')
const { BugsnagTransport } = require('winston-bugsnag')

const assertLevel = require('./helpers/assertLevel')

const {
  BUGSNAG_KEY,
  BUGSNAG_LEVEL = 'warn',
  NODE_ENV,
} = process.env

assertLevel(BUGSNAG_LEVEL, 'BUGSNAG_LEVEL invalid.')

let transport
if (BUGSNAG_KEY) {
  const projectRoot = process.cwd()
  const packageJSON = path.join(projectRoot, 'package.json')
  if (NODE_ENV !== 'test') bugsnag.register(BUGSNAG_KEY, { projectRoot, packageJSON })

  transport = new BugsnagTransport({
    name: 'bugsnag',
    level: BUGSNAG_LEVEL,
  })
}

module.exports = transport
