import r    from '../../../../src/lib/database/driver'

describe('Driver', function() {

  /*
  NOTE: this may seem like a silly test, but it's necessary. If this test fails,
  it means the driver is not being exported correctly.
  */
  it('should use r.now()', function(done) {

    r.now()

    done()

  })

})
