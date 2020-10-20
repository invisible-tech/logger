import Rollbar from 'rollbar'

type RollbarLevel = 'info' | 'error' | 'debug' | 'warning' | 'critical'

const { ROLLBAR_LEVEL = 'warning', ROLLBAR_ACCESS_TOKEN, NODE_ENV } = process.env

const rollbarConfig: Rollbar.Configuration = {
  accessToken: ROLLBAR_ACCESS_TOKEN,
  environment: NODE_ENV,
  reportLevel: ROLLBAR_LEVEL as RollbarLevel,
  stackTraceLimit: 50,
  captureUncaught: true,
  captureUnhandledRejections: true,
  verbose: true,
}
const rollbar = new Rollbar(rollbarConfig)

export { rollbar }