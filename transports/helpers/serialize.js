'use strict'

const serialize = (meta, levels = 0) => {
  if (levels > 10) return meta // just a precaution. Should never get here
  if (! meta || typeof meta !== 'object') return meta
  if (meta.toJSON) return meta.toJSON()
  if (meta.dataValues) return serialize(meta.dataValues)
  Object.keys(meta).forEach(key => {
    meta[key] = serialize(meta[key], levels + 1)
  })
  return meta
}
module.exports = serialize
