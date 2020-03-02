'use strict'

const winston = require('winston')
const serializeError = require('serialize-error')
const timber = require('timber')

const assertLevel = require('./helpers/assertLevel')
const serialize = require('./helpers/serialize')

const {
  TIMBER_LEVEL = 'info',
} = process.env

assertLevel(TIMBER_LEVEL, 'TIMBER_LEVEL invalid.')

const dropLineBreak = string => (
  string.endsWith('\n')
    ? string.substring(0, string.length - 1)
    : string
)

module.exports = new (winston.transports.Console)({
  name: 'timber',
  level: TIMBER_LEVEL,
  formatter: options => {
    // serialize objects such as SQL models by checking for toJSON
    options.meta = serialize(options.meta)
    // When we log errors, options.message comes as blank and it causes errors
    const message = options.message || options.meta.message || 'No message'
    // Serialize eventual error objecs
    // https://github.com/timberio/timber-node/issues/87
    const sanitized = serializeError(options)
    const formatted = timber.formatters.Winston({ ...sanitized, message })
    return dropLineBreak(formatted)
  },
})
