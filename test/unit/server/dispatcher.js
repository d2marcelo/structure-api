import Dispatcher     from '../../../src/server/dispatcher'
import expressObjects from '../../helpers/expressObjects'

class FooController {

  constructor() {

  }

  respond200() {
    return new Promise( (resolve, reject) => {

      resolve({
        desc: 'Wow!',
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
  it.skip('should dispatch a 200', function(done) {

    var dispatcher    = new Dispatcher(),
        fooController = new FooController()

    var fireDispatch = dispatcher.dispatch(fooController, 'respond200')

    var expObj = new expressObjects(),
        req    = expObj.req,
        res    = expObj.res,
        next   = expObj.next

    var spy1 = sinon.spy(res, 'json')
    var spy2 = sinon.spy(res, 'status')

    fireDispatch(req, res, next)

    expect(spy1.calledOnce).to.be.true
    expect(spy2.calledOnce).to.be.true
    expect(res.statusCode).to.equal(200)

    done()

  })

})
