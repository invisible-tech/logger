import logdnaWinston from 'logdna-winston'

const options = {
  key: process.env.LOGDNA_API_KEY,
}

const logdna = new logdnaWinston(options)

export { logdna }
