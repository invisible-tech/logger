'use strict'

const assert = require('assert')
const decache = require('decache')

const deepCopy = obj => JSON.parse(JSON.stringify(obj))
assert.undefined = (value, ...args) => assert.strictEqual(value, undefined, ...args)

describe('library interface', () => {
  const cleanEnv = deepCopy(process.env)

  beforeEach(() => {
    decache('..')
    process.env = cleanEnv
  })

  it('it should load', () => {
    require('..')
  })

  it('should work with strings, Errors and void messages', () => {
    const logger = require('..')

    logger.error('daaamn', { meta: true })
    logger.error(Error('daaamn'))
    logger.error()
  })

  describe('transports/console', () => {
    it('should load if LOGGER_TIMBER is undefined and NODE_ENV not test', () => {
      process.env.NODE_ENV = 'development'
      const logger = require('..')

      assert(logger.transports.console)
    })

    it('should load with the correct logging level', () => {
      process.env.NODE_ENV = 'development'
      process.env.LOGGER_LEVEL = 'silly'
      const logger = require('..')

      assert.equal(logger.transports.console.level, process.env.LOGGER_LEVEL)
    })

    it('should not load if LOGGER_TIMBER is "true"', () => {
      process.env.LOGGER_TIMBER = 'true'
      process.env.NODE_ENV = 'development'
      const logger = require('..')

      assert.undefined(logger.transports.console)
    })
  })

  describe('transports/timber', () => {
    it('should load if LOGGER_TIMBER is "true" and NODE_ENV not test', () => {
      process.env.NODE_ENV = 'development'
      process.env.LOGGER_TIMBER = 'true'
      const logger = require('..')

      assert(logger.transports.timber)
    })

    it('should load with the correct logging level', () => {
      process.env.NODE_ENV = 'development'
      process.env.TIMBER_LEVEL = 'silly'
      const logger = require('..')

      assert.equal(logger.transports.timber.level, process.env.TIMBER_LEVEL)
    })

    it('should block default console logger', () => {
      process.env.LOGGER_TIMBER = 'true'
      process.env.NODE_ENV = 'development'
      const logger = require('..')

      assert.undefined(logger.transports.console)
    })
  })
})
