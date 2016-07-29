import Dispatcher from '../../../src/server/dispatcher'
import Router     from '../../../src/server/router'

/** @test {Router} */
describe('Router', function() {

  it('should initialize', function(done) {

    var router = new Router({
      dispatcher: new Dispatcher(),
      // Basic mock Express server object
      server: {
        all: function() {},
        delete: function() {},
        get: function() {},
        post: function() {},
        put: function() {},
        use: function() {}
      }
    })

    expect(router).to.be.an('object')
    expect(router.dispatcher).to.be.an('object')
    expect(router.server).to.be.an('object') // HTTP Server instance

    done()

  })

})
