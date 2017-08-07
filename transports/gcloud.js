'use strict'

const GoogleCloudtransport = require('@google-cloud/logging-winston')

const {
  LOGGER_LEVEL = 'info',
  NODE_ENV,
} = process.env

let transport
if (NODE_ENV === 'production') {
  transport = new GoogleCloudtransport({
    name: 'gcloud',
    level: LOGGER_LEVEL,
  })
}

module.export = transport
