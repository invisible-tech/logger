import winston, { createLogger } from 'winston'

import consoleTransport from './transports/console'
import { logdna } from './transports/logdna'
import { rollbar } from './transports/rollbar'

const { LOGGER_LEVEL = 'info', ROLLBAR_ACCESS_TOKEN, LOGDNA_API_KEY } = process.env

const isTest = process.env.NODE_ENV === 'test'
const enabledInTest = process.env.LOGGER_ENABLED_IN_TEST === 'true'
const transports = LOGDNA_API_KEY ? [consoleTransport, logdna] : [consoleTransport]

const logger = ROLLBAR_ACCESS_TOKEN
  ? rollbar
  : createLogger({
      level: LOGGER_LEVEL,
      transports,
      silent: isTest && !enabledInTest,
    })

export default logger as winston.Logger
