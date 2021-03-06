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
The default logging level is `info`, but you can use the `LOGGER_LEVEL` environment variable to adjust the logging level.

Disabled by default in `test` env, but can be overriden if `LOGGER_ENABLED_IN_TEST` is `true`.

### Timber
To use Timber, you'll need to define `LOGGER_TIMBER` as `true` in your environment variable and redirect the drain of your Heroku app to the drain address in Timber.
You can also use the `TIMBER_LEVEL` environment variable to set the logging level.
Setting up Timber deactivates the default Console transport.

### Additional Transports

You can add an additional transport with
```js
const logger = require('@invisible/logger')

logger.add(winston.transports.File, { filename: 'somefile.log' })
```
