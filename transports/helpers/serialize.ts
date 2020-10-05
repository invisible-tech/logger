import { Meta } from '../../types/types'

const serialize = (
  meta: Meta & { dataValues?: Meta; toJSON?: () => string },
  levels = 0
): Meta | string => {
  if (levels > 10) return meta // just a precaution. Should never get here
  if (!meta || typeof meta !== 'object') return meta
  if (meta.toJSON) return meta.toJSON()
  if (meta.dataValues) return serialize(meta.dataValues)
  Object.keys(meta).forEach((key: string) => {
    meta[key] = serialize(meta[key] as Meta, levels + 1)
  })
  return meta
}
export default serialize
