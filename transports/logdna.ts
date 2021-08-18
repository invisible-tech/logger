import logdnaWinston from 'logdna-winston'

const createLogdnaLogger = () => {
  const options = {
    key: process.env.LOGDNA_API_KEY,
    indexMeta: true, // ensures that metadata is indexed in logdna
  }

  return new logdnaWinston(options)
}

export { createLogdnaLogger }
