'use strict'

const serialize = meta => {
  if (! meta || typeof meta === 'string') return meta
  if (meta.toJSON) return JSON.parse(meta.toJSON())
  Object.keys(meta).forEach(key => {
    meta[key] = serialize(meta[key])
  })
  return meta
}
module.exports = serialize
