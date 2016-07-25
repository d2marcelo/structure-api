import {Schema, type} from 'eisley'

import Model from '../../../src/models/root'

describe('Root', function() {

  it('should initialize', function(done) {

    var model = new Model({
      name: 'root',
      schema: new Schema({
        foo: type('string')
      })
    })

    expect(model).to.be.an('object')
    expect(model.emit).to.be.a('function')
    expect(model.off).to.be.a('function')
    expect(model.on).to.be.a('function')
    expect(model.once).to.be.a('function')
    expect(model.schema).to.be.an('object')
    expect(model.table).to.equal('root')

    done()

  })

  it.skip('should validate successfully', function(done) {

    var model = new Model({
      name: 'root',
      schema: new Schema({
        foo: type('string')
      })
    })

    var valid = model.validate({foo: 'bar'})

    expect(typeof valid.err).to.equal('undefined')

    done()

  })

  it.skip('should validate unsuccessfully', function(done) {

    var model = new Model({
      name: 'root',
      schema: new Schema({
        foo: type('string')
      })
    })

    var valid = model.validate({foo: 2})

    expect(valid.err).to.be.an('array')

    done()

  })

})
