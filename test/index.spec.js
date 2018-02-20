'use strict'

const assert = require('assert')
const bugsnag = require('bugsnag')
const sinon = require('sinon')


describe('library interface', () => {
  let logger

  sinon.stub(bugsnag, 'register').returns()
  process.env.BUGSNAG_KEY = 'fake'
  process.env.BUGSNAG_LEVEL = 'error'
  process.env.LOGGER_LEVEL = 'silly'
  process.env.TIMBER_KEY = 'fake'

  it('it should load', () => {
    logger = require('../')
  })

  it('should load bugsnag transport if BUGSNAG_KEY is defined', () => {
    sinon.assert.called(bugsnag.register)
  })

  it('should load bugsnag transport with the correct logging level', () => {
    assert.equal(logger.transports.bugsnag.level, process.env.BUGSNAG_LEVEL)
  })

  it('should work with strings, Errors and void messages', () => {
    logger.error('daaamn', { meta: true })
    logger.error(Error('daaamn'))
    logger.error()
  })
})
