import {Schema, type} from 'eisley'

import PasswordService from '../../../src/services/password'

/** @test {PasswordService} */
describe('Password', function() {

  it('should initialize', function(done) {

    var passwordService = new PasswordService()

    expect(passwordService).to.be.an('object')

    done()

  })

  /** @test {PasswordService#hash} */
  it('should issue a hash',  async function(done) {

    var passwordService = new PasswordService()

    var hash = await passwordService.issue('foo')

    expect(hash).to.be.a('string')

    done()

  })

  /** @test {PasswordService#verify} */
  it('should verify a password/hash',  async function(done) {

    var passwordService = new PasswordService()

    var hash = await passwordService.issue('foo')

    var result = await passwordService.verify('foo', hash)

    expect(result).to.be.true

    done()

  })

  /** @test {PasswordService#verify} */
  it('should not verify a password/hash',  async function(done) {

    var passwordService = new PasswordService()

    var hash = await passwordService.issue('foo')

    try {
      var result = await passwordService.verify('foo2', hash)
    }
    catch(e) {
      done()
    }

  })

})
