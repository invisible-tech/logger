# logger

[![CircleCI](https://circleci.com/gh/invisible-tech/logger/tree/master.svg?style=svg)](https://circleci.com/gh/invisible-tech/logger/tree/master)

Invisible Logging Wrapper.

### Install
```
yarn add @invisible/logger
```

### Usage
```js
const logger = require('@invisible/logger')

logger.debug('This is a debug message', { meta: true })
```

Make sure to set `LOGGER_LEVEL = silly` on your development environment.

## Default Transports

### Console
Will only be colorized in development.
The defaule logging level is `info`, but you can use the `LOGGER_LEVEL` environment variable to adjust the logging level.

### Bugsnag
To use bugsnag, just define `BUGSNAG_KEY` environment variable.
You can also use the `BUGSNAG_LEVEL` environment variable to set the logging level.

### Google Logger
Only worsk in production.
Logging level also specified through the `LOGGER_LEVEL` environment variable.

### Additional Transports

You can add an aditional transport with
```js
const logger = require('@invisible/logger')

logger.add(winston.transports.File, { filename: 'somefile.log' })
```