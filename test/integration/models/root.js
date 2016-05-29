import {chalk, logger}   from '../../../lib/logger'
import Root              from '../../../models/root'
import test              from 'ava'

Root.prototype.name  = 'root' // To satisfy the constructor, but it's not needed for root
Root.prototype.table = 'test'

test(`should create a root object`, async (t) => {

  var model = new Root()
  var pkg   = {
    foo: 'bar'
  }

  var res = await model.create(pkg)

  if(res.id && res.sid) {
    t.pass()
    return
  }

  t.fail()

})

test(`should get a root object by ID`, async (t) => {

  var model = new Root()
  var pkg   = {
    foo: 'bar'
  }

  var res = await model.create(pkg)

  var res2 = await model.getById(res.id)

  if(res2.id) {
    t.is(res.id, res2.id)
    t.pass()
    return
  }

  t.fail()

})

test(`should update a root object by ID`, async (t) => {

  var model = new Root()
  var pkg   = {
    foo: 'bar'
  }

  var res  = await model.create(pkg)
  var res2 = await model.update(res.id, {foo: 'baz'})
  var res3 = await model.getById(res.id)

  if(res3.foo) {
    t.is(res3.foo, 'baz')
    t.pass()
    return
  }

  t.fail()

})

test(`should get all root objects`, async (t) => {

  var model = new Root()
  var pkg   = {
    foo: 'bar'
  }

  var res = await model.create(pkg)

  var res2 = await model.getAll()

  if(res2[0] && res2[0].id) {
    t.pass()
    return
  }

  t.fail()

})
