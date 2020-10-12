import winston, { createLogger } from 'winston'

import consoleTransport from './transports/console'
import { rollbar } from './transports/rollbar'

const isTest = process.env.NODE_ENV === 'test'
const enabledInTest = process.env.LOGGER_ENABLED_IN_TEST === 'true'
const transports = [consoleTransport]
const { LOGGER_LEVEL = 'info', ROLLBAR_ACCESS_TOKEN } = process.env

const logger = ROLLBAR_ACCESS_TOKEN
  ? rollbar
  : createLogger({
      level: LOGGER_LEVEL,
      transports,
      silent: isTest && !enabledInTest,
    })

export default logger as winston.Logger
