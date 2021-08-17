import logdnaWinston from 'logdna-winston'

const options = {
  key: process.env.LOGDNA_API_KEY,
  indexMeta: true, // ensures that metadata is indexed in logdna
}

const logdna = new logdnaWinston(options)

export { logdna }
