import ObjectMap from '../../../../lib/utils/object/map'

import test      from 'ava'

test.skip('should map an object', (t) => {

  var foo = {
    bar: 'baz'
  }

  foo = ObjectMap(foo, (o, k, i) => {
    console.error('o, k, i', o, k, i)

    if(o.bar) return o.bar = 'zaz'
  })

  t.is(foo.bar, 'zaz')

})
