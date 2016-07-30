import Dispatcher     from '../../../src/server/dispatcher'
import expressObjects from '../../helpers/expressObjects'

class FooController {

  constructor() {

  }

  // 20x response
  respond200() {
    return new Promise( (resolve, reject) => {

      resolve({
        desc: 'Wow!',
        title: 'Macha'
      })

    })
  }

  // 403 response
  respond403() {
    return new Promise( (resolve, reject) => {

      reject({
        desc: 'Fail',
        title: 'Macha'
      })

    })
  }

}

/** @test {Dispatcher} */
describe('Dispatcher', function() {

  it('should initialize', function(done) {

    var dispatcher = new Dispatcher()

    expect(dispatcher).to.be.an('object')
    expect(dispatcher.dispatch).to.be.a('function')

    done()

  })

  /** @test {Dispatcher#dispatch} */
  it('should dispatch a 200', function(done) {

    var dispatcher    = new Dispatcher(),
        fooController = new FooController()

    var fireDispatch = dispatcher.dispatch(fooController, 'respond200')

    var expObj = new expressObjects(),
        req    = expObj.req,
        res    = expObj.res,
        next   = expObj.next

    var spy1 = sinon.spy(res, 'status')
    var spy2 = sinon.spy(res, 'json')

    fireDispatch(req, res, next)

    /*
    NOTE: The fireDispatch returns an async function, which awaits on the
    controller's action returning it's promise. Since there is no current
    way of knowning when the dispatcher has successfully received a response..
    */
    setTimeout(function() {

      expect(spy1.calledOnce).to.be.true
      expect(spy2.calledOnce).to.be.true
      expect(res.statusCode).to.equal(200)

      done()

    }, 50)

  })

  /** @test {Dispatcher#dispatch} */
  it('should dispatch a 201', function(done) {

    var dispatcher    = new Dispatcher(),
        fooController = new FooController()

    var fireDispatch = dispatcher.dispatch(fooController, 'respond200')

    var expObj = new expressObjects(),
        req    = expObj.req,
        res    = expObj.res,
        next   = expObj.next

    req.method = 'PUT'

    var spy1 = sinon.spy(res, 'status')
    var spy2 = sinon.spy(res, 'json')

    fireDispatch(req, res, next)

    setTimeout(function() {

      expect(spy1.calledOnce).to.be.true
      expect(spy2.calledOnce).to.be.true
      expect(res.statusCode).to.equal(201)

      done()

    }, 50)

  })

  /** @test {Dispatcher#dispatch} */
  it('should dispatch a 403', function(done) {

    var dispatcher    = new Dispatcher(),
        fooController = new FooController()

    var fireDispatch = dispatcher.dispatch(fooController, 'respond403')

    var expObj = new expressObjects(),
        req    = expObj.req,
        res    = expObj.res,
        next   = expObj.next

    var spy1 = sinon.spy(res, 'status')
    var spy2 = sinon.spy(res, 'json')

    fireDispatch(req, res, next)

    setTimeout(function() {

      expect(spy1.calledOnce).to.be.true
      expect(spy2.calledOnce).to.be.true
      expect(res.statusCode).to.equal(403)

      done()

    }, 50)

  })

})
