import assert from 'assert'

import assertLevel from '../../transports/helpers/assertLevel'

describe('assertLevel', () => {
  it('should work with a valid logging level', () => {
    const level = 'warn'
    const msg = 'LOGGER_LEVEL invalid.'

    assertLevel(level, msg)
  })

  it('should throw for an invalid logging level', () => {
    const level = 'invalidLevel'
    const msg = 'LOGGER_LEVEL invalid.'

    assert.throws(() => assertLevel(level, msg))
  })
})
