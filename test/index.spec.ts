import assert from 'assert'
import decache from 'decache'
import { Logger } from 'winston'

const findConsoleTransport = (logger: Logger) =>
  logger.transports.find((t: any) => t.name === 'console')

const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
assert.undefined = (value: any, ...args: any[]) => assert.strictEqual(value, undefined, ...args)

describe('library interface', () => {
  const cleanEnv = deepCopy(process.env)

  beforeEach(() => {
    decache('..')
    process.env = { ...cleanEnv }
  })

  it('it should load', () => {
    require('..')
  })

  it('should work with strings, Errors and objects', async () => {
    const { default: logger } = await import('..')
    logger.error('daaamn', { meta: true })
    logger.error(Error('daaamn'))
    logger.error({ test: true })
  })

  describe('transports/console', () => {
    it('should load NODE_ENV not test', async () => {
      process.env.NODE_ENV = 'development'
      const { default: logger } = await import('..')
      assert(findConsoleTransport(logger))
    })

    it('should load with the correct logging level', async () => {
      process.env.NODE_ENV = 'development'
      process.env.LOGGER_LEVEL = 'silly'
      const { default: logger } = await import('..')
      assert.strictEqual(findConsoleTransport(logger)?.level, process.env.LOGGER_LEVEL)
    })
  })

  it('should use console when no ROLLBAR_ACCESS_TOKEN', async () => {
    process.env.NODE_ENV = 'development'
    process.env.LOGGER_LEVEL = 'silly'
    const { default: logger } = await import('..')
    // eslint-disable-next-line no-console
    assert.strictEqual(typeof logger, 'object')
    assert.strictEqual(logger.transports.length, 1)
    assert(findConsoleTransport(logger))
  })

  it('should use rollbar when ROLLBAR_ACCESS_TOKEN defined', async () => {
    process.env.NODE_ENV = 'development'
    process.env.LOGGER_LEVEL = 'silly'
    process.env.ROLLBAR_ACCESS_TOKEN = 'fake'
    const logger = (await import('..')).default as any

    assert(!logger.transports)
    assert(logger.options.notifier.name === 'node_rollbar')
  })

  it('should export log methods for console', async () => {
    process.env.NODE_ENV = 'development'
    process.env.LOGGER_LEVEL = 'silly'
    const { default: logger } = await import('..')
    assert(logger.warn)
    assert(logger.error)
    assert(logger.info)
    assert(logger.debug)

    assert(!logger.warning)
  })

  it('should export log methods for rollbar', async () => {
    process.env.NODE_ENV = 'development'
    process.env.LOGGER_LEVEL = 'silly'
    process.env.ROLLBAR_ACCESS_TOKEN = 'fake'
    const { default: logger } = await import('..')
    assert(logger.warn)
    assert(logger.error)
    assert(logger.info)
    assert(logger.debug)
  })
})
