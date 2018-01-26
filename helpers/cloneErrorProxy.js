'use strict'

// I copied LOGGING_LEVELS from src/helpers/assertLevel.js
// because this file is going to be deprecated when the bug is solved on winston.
const LOGGING_LEVELS = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly',
]

// FIX: because winston from versions 2.3.1 until 2.4.0 do not log Error objects.
const cloneErrorProxy = logger => {
  const handler = {
    get: (target, name) => {
      // If the target[name] is a logging level we should verify if any
      // of the arguments is an Error.
      if (LOGGING_LEVELS.indexOf(name) > -1) {
        return (...loggerArgs) => {
          const validArgs = loggerArgs
            .map(loggerArg => {
              if (loggerArg instanceof Error) {
                // Loosely "Clone" Error Objects
                return {
                  message: loggerArg.message,
                  stack: loggerArg.stack,
                }
              }
              return loggerArg
            })

          return target[name](...validArgs)
        }
      }

      return target[name]
    },
  }

  return new Proxy(logger, handler)
}

module.exports = cloneErrorProxy
