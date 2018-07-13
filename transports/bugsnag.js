'use strict'

const path = require('path')
const { BugsnagTransport } = require('winston-bugsnag')
const bugsnag = require('bugsnag')

const assertLevel = require('./helpers/assertLevel')

const {
  BUGSNAG_KEY,
  BUGSNAG_LEVEL = 'warn',
  NODE_ENV,
} = process.env

assertLevel(BUGSNAG_LEVEL, 'BUGSNAG_LEVEL invalid.')

const projectRoot = process.cwd()
const packageJSON = path.join(projectRoot, 'package.json')
if (NODE_ENV !== 'test') bugsnag.register(BUGSNAG_KEY, { projectRoot, packageJSON })

module.exports = new BugsnagTransport({
  name: 'bugsnag',
  level: BUGSNAG_LEVEL,
})
