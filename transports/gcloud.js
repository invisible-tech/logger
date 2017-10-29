'use strict'

const GoogleCloudtransport = require('@google-cloud/logging-winston')

const assertLevel = require('./helpers/assertLevel')

const {
  LOGGER_LEVEL = 'info',
  NODE_ENV,
} = process.env

assertLevel(LOGGER_LEVEL, 'LOGGER_LEVEL invalid.')

let transport
if (NODE_ENV === 'production') {
  transport = new GoogleCloudtransport({
    name: 'gcloud',
    level: LOGGER_LEVEL,
  })
}

module.export = transport
