'use strict'

const LOGGING_LEVELS = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly',
]

const assertLevel = (consumerLevel, msg) => {
  const validLevel = LOGGING_LEVELS.reduce((acc, level) => (level === consumerLevel ? true : acc), false)

  if (! validLevel) throw Error(msg)
}

module.exports = assertLevel
