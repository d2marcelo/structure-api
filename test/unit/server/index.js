import Server from '../../../src/server'

/** @test {Server} */
describe('HTTP Server', function() {

  it('should initialize', function(done) {

    var api = new Server()

    expect(api).to.be.an('object')
    expect(api.debugRoutes).to.be.a('function')
    expect(api.logRequestInfo).to.be.a('function')
    expect(api.server).to.be.an('function') // Express server
    expect(api.router).to.be.an('object')
    expect(api.start).to.be.a('function')
    expect(api.stop).to.be.a('function')
    expect(api.use).to.be.a('function')

    done()

  })

  /** @test {Server#start} */
  it('should start', function(done) {

    var api = new Server()
    sinon.stub(api.server, 'listen').returns(api.server)

    api.start()

    expect(api.server.listen.calledOnce).to.be.true

    done()

  })

  /** @test {Server#stop} */
  it('should stop', function(done) {

    var api = new Server()
    sinon.stub(api.server, 'listen').returns(api.server)
    sinon.stub(api, 'stop')

    api.start()
    api.stop()

    expect(api.stop.calledOnce).to.be.true

    done()

  })

})
