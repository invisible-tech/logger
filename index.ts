/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as Sentry from '@sentry/nextjs'
import { captureException, captureMessage, Severity } from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'

export const LOG_LEVEL = (process.env.LOG_LEVEL as Severity) ?? Severity.Warning
export const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN
export const SENTRY_SAMPLE_RATE = process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE ?? '0.2'
export const GIT_COMMIT = process.env.VERCEL_GIT_COMMIT_SHA ?? 'development'
export const ENV = process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development'

const SEVERITY_ARRAY = [
  Severity.Debug,
  Severity.Info,
  Severity.Log,
  Severity.Warning,
  Severity.Error,
  Severity.Critical,
  Severity.Fatal,
]

export const { addBreadcrumb, addGlobalEventProcessor, captureEvent } = Sentry

const logLevelIndex = SEVERITY_ARRAY.indexOf(LOG_LEVEL)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const init = () => {
  if (SENTRY_DSN)
    Sentry.init({
      dsn: SENTRY_DSN,
      release: GIT_COMMIT,
      environment: ENV,
      logLevel: logLevelIndex,
      sampleRate: parseFloat(SENTRY_SAMPLE_RATE),
      tracesSampleRate: parseFloat(SENTRY_SAMPLE_RATE),
      // beforeSend to not proactively filter any potential PII data.
      // Reference: https://docs.sentry.io/platforms/node/data-management/sensitive-data/#scrubbing-data
      beforeSend: (event: Sentry.Event) => event,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      integrations: process['browser']
        ? [new Integrations.BrowserTracing()]
        : [new Integrations.Express()],
    })
}

interface User extends Omit<Sentry.User, 'id'> {
  id?: string | number
  email?: string
  name?: string
}

type Meta = Record<string, unknown> | Error

export const identify = (user: User) => {
  if (!user.id && !user.email)
    throw new Error('No email or id provided while calling identify in sentry lib')

  Sentry.configureScope((scope) => {
    scope.setUser(user as Sentry.User)
  })
}

const logMessage = (msg: string, severity: Severity = Severity.Info, meta: Meta = {}) => {
  const severityIndex = SEVERITY_ARRAY.indexOf(severity)
  if (meta instanceof Error) {
    captureException(meta)
    return
  }
  if (typeof meta.email === 'string') identify({ email: meta.email })
  if (logLevelIndex >= severityIndex) {
    addBreadcrumb({ level: severity, message: msg, data: meta })
    return
  }
  captureMessage(msg, {
    level: severity,
    extra: meta,
  })
}

export const logger = {
  info: (msg: string, meta?: Meta) => logMessage(msg, Severity.Info, meta),
  warn: (msg: string, meta?: Meta) => logMessage(msg, Severity.Warning, meta),
  error: (msg: string, meta?: Meta) => logMessage(msg, Severity.Error, meta),
  debug: (msg: string, meta?: Meta) => logMessage(msg, Severity.Debug, meta),
}
