import {Schema, type} from 'eisley'

import AuthModel from '../../../src/models/auth'
import UserModel from '../../../src/models/user'

/** @test {AuthModel} */
describe('Auth', function() {

  it('should initialize', function(done) {

    var auth = new AuthModel()

    expect(auth.name).to.be.equal('auth')

    done()

  })

  /** @test {AuthModel#login} */
  it('should not login; missing login data',  async function(done) {

    var auth = new AuthModel()

    try {
      var res = await auth.login({
        username: 'foo'
      })
    }
    catch(e) {
      expect(e).to.be.an('object')

      done()
    }

  })

  /** @test {AuthModel#login} */
  it('should not login; no user',  async function(done) {

    var auth = new AuthModel()

    try {
      var res = await auth.login({
        username: 'foo',
        password: 'bar'
      })
    }
    catch(e) {
      expect(e).to.be.an('object')

      done()
    }

  })

  /** @test {AuthModel#login} */
  it('should not login; bad password',  async function(done) {

    var auth = new AuthModel(),
        userModel = new UserModel()

    var user = await userModel.create({
      email: 'mail@foo.com',
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    try {
      var res = await auth.login({
        username: 'tom335599',
        password: 'gonnacatchyou21'
      })
    }
    catch(e) {
      expect(e).to.be.an('object')

      done()
    }

  })

  /** @test {AuthModel#login} */
  it('should login',  async function(done) {

    var auth = new AuthModel(),
        userModel = new UserModel()

    var user = await userModel.create({
      email: 'mail@foo.com',
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    var res = await auth.login({
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    expect(res).to.be.an('object')

    done()

  })

})
