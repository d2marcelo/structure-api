import r    from '../../../../lib/database/driver'
import test from 'ava'

test('should be able to r.now()', (t) => {
  r.now()
  t.pass()
})
