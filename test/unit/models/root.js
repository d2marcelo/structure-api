import {Schema, type} from 'eisley'

import RootModel from '../../../src/models/root'

/** @test {RootModel} */
describe('Root', function() {

  it('should initialize', function(done) {

    var model = new RootModel({
      name: 'root',
      schema: new Schema({
        foo: type('string')
      })
    })

    expect(model).to.be.an('object')
    expect(model.create).to.be.a('function')
    expect(model.delete).to.be.a('function')
    expect(model.emit).to.be.a('function')
    expect(model.getAll).to.be.a('function')
    expect(model.getById).to.be.a('function')
    expect(model.getRelations).to.be.a('function')
    expect(model.insertReference).to.be.a('function')
    expect(model.name).to.equal('root')
    expect(model.off).to.be.a('function')
    expect(model.on).to.be.a('function')
    expect(model.once).to.be.a('function')
    expect(model.referenceTo).to.be.a('function')
    expect(model.schema).to.be.an('object')
    expect(model.table).to.equal('root')
    expect(model.update).to.be.a('function')

    done()

  })

  it('should create', async function(done) {

    var model = new RootModel({
      name: 'root'
    })

    var res = await model.create({
      foo: 'bar'
    })

    expect(res.foo).to.equal('bar')

    done()

  })

  it('should get by ID', async function(done) {

    var model = new RootModel({
      name: 'root'
    })

    var res = await model.create({
      foo: 'bar'
    })

    var res2 = await model.getById(res.id)

    expect(res2.foo).to.equal('bar')

    done()

  })

  it('should get all', async function(done) {

    var model = new RootModel({
      name: 'root'
    })

    var res = await model.create({
      foo: 'bar'
    })

    var res2 = await model.getAll()

    expect(res2.length > 0).to.be.true

    done()

  })

  it('should update', async function(done) {

    var model = new RootModel({
      name: 'root'
    })

    var res = await model.create({
      foo: 'bar'
    })

    var res2 = await model.update(res.id, {
      foo: 'baz'
    })

    expect(res2.foo).to.equal('baz')

    done()

  })

  it.skip('should validate successfully', function(done) {

    var model = new RootModel({
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

    var model = new RootModel({
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
