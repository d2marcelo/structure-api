import {Schema, type} from 'eisley'
import AuthController from '../../../src/controllers/auth'
import UserModel      from '../../../src/models/user'

/** @test {AuthController} */
describe('Auth', function() {

  /** @test {AuthController#login} */
  it('should not login; missing login data',  async function(done) {

    var auth = new AuthController()

    var req = {
      body: {
        username: 'foo'
      }
    }

    try {
      var res = await auth.login(req)
    }
    catch(e) {
      expect(e).to.be.an('object')

      done()
    }

  })

  /** @test {AuthController#login} */
  it('should not login; no user',  async function(done) {

    var auth = new AuthController()

    var req = {
      body: {
        username: 'foo',
        password: 'bar'
      }
    }

    try {
      var res = await auth.login(req)
    }
    catch(e) {
      expect(e).to.be.an('object')

      done()
    }

  })

  /** @test {AuthController#login} */
  it('should not login; bad password',  async function(done) {

    var auth      = new AuthController(),
        userModel = new UserModel()

    var user = await userModel.create({
      email: 'mail@foo.com',
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    var req = {
      body: {
        username: 'tom335599',
        password: 'gonnacatchyou21'
      }
    }

    try {
      var res = await auth.login(req)
    }
    catch(e) {
      expect(e).to.be.an('object')

      done()
    }

  })

  /** @test {AuthController#login} */
  it('should login',  async function(done) {

    var auth      = new AuthController(),
        userModel = new UserModel()

    var user = await userModel.create({
      email: 'mail@foo.com',
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    var req = {
      body: {
        username: 'tom335599',
        password: 'gonnacatchyou22'
      }
    }

    var res = await auth.login(req)

    expect(res).to.be.an('object')
    expect(res.username).to.equal('tom335599')

    done()

  })

})
