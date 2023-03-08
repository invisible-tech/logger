import { Event } from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'
import revision from 'child_process'
import * as winston from 'winston'
import Sentry from 'winston-transport-sentry-node'

const GIT_COMMIT = revision.execSync('git rev-parse HEAD').toString().trim().slice(0, 7)

export const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN
export const SENTRY_SAMPLE_RATE = parseFloat(process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE ?? '0.2')
export const ENV = process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV ?? 'development'
export const LOG_LEVEL = ENV == 'development' ? 'debug' : 'info'

const isBrowser = typeof window !== 'undefined'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
})
const sentryOptions = {
  dsn: SENTRY_DSN,
  release: GIT_COMMIT,
  environment: ENV,
  sampleRate: SENTRY_SAMPLE_RATE,
  tracesSampleRate: SENTRY_SAMPLE_RATE,
  // beforeSend to not proactively filter any potential PII data.
  // Reference: https://docs.sentry.io/platforms/node/data-management/sensitive-data/#scrubbing-data
  beforeSend: (event: Event) => event,
  integrations: isBrowser ? [new Integrations.BrowserTracing()] : [new Integrations.Express()],
}
if (SENTRY_DSN) {
  logger.add(
    new Sentry({
      ...sentryOptions,
      level: 'error',
    })
  )
}

export default logger
