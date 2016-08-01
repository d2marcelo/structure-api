import MockHTTPServer from '../../helpers/mock-http-server'
import {Schema, type} from 'eisley'

import UserModel      from '../../../src/models/user'

describe('Auth', function() {

  it('should not login a user via POST; missing login data', async function(done) {

    var pkg = {
      username: 'robthebarron',
      password: 'forgotmywolf'
    }

    var res = await new MockHTTPServer()
      .post(`/api/v${process.env.API_VERSION}/auth/login`)
      .send(pkg)

    expect(res.body.status).to.equal(403)

    done()

  })

  it('should not login a user via POST; no user', async function(done) {

    var pkg = {
      username: 'robthebarron',
      password: 'forgotmywolf'
    }

    var res = await new MockHTTPServer()
      .post(`/api/v${process.env.API_VERSION}/auth/login`)
      .send(pkg)

    expect(res.body.status).to.equal(403)

    done()

  })

  it('should not login a user via POST; bad password', async function(done) {

    var userModel = new UserModel()

    var user = await userModel.create({
      email: 'mail@foo.com',
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    var res = await new MockHTTPServer()
      .post(`/api/v${process.env.API_VERSION}/auth/login`)
      .send({
        username: 'tom335599',
        password: 'gonnacatchyou21'
      })

    expect(res.body.status).to.equal(403)

    done()

  })

  it('should login a user via POST', async function(done) {

    var userModel = new UserModel()

    var user = await userModel.create({
      email: 'mail@foo.com',
      username: 'tom335599',
      password: 'gonnacatchyou22'
    })

    var res = await new MockHTTPServer()
      .post(`/api/v${process.env.API_VERSION}/auth/login`)
      .send({
        username: 'tom335599',
        password: 'gonnacatchyou22'
      })

    expect(res.body.status).to.equal(200)
    expect(res.body.pkg.username).to.equal('tom335599')

    done()

  })

})
