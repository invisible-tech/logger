const LOGGING_LEVELS = ['error', 'warn', 'info', 'verbose', 'debug', 'silly']

type TLOGLEVEL = typeof LOGGING_LEVELS[number]

const assertLevel = (consumerLevel: TLOGLEVEL, msg: string): void => {
  const validLevel = LOGGING_LEVELS.reduce(
    (acc, level) => (level === consumerLevel ? true : acc),
    false
  )

  if (!validLevel) throw Error(msg)
}

export default assertLevel
