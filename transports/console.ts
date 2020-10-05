'use strict'

import { format, transports } from 'winston'

import assertLevel from './helpers/assertLevel'

const { LOGGER_LEVEL = 'info' } = process.env

assertLevel(LOGGER_LEVEL, 'LOGGER_LEVEL invalid.')

const { combine, colorize, simple } = format

const consoleTransport = new transports.Console({
  level: LOGGER_LEVEL,
  format: combine(colorize({ message: true }), simple()),
})

export default consoleTransport
