import {chalk, logger}   from '../../../lib/logger'
import Organization      from '../../../models/organization'
import test              from 'ava'

import {
  OrganizationGenerator
} from 'structure-test-helpers'

test(`should create an organization`, async (t) => {

  var model = new Organization()
  var pkg   = new OrganizationGenerator()

  var res = await model.create(pkg)

  if(res.id && res.sid) {
    t.pass()
    return
  }

  t.fail()

})

test(`should get an organization by ID`, async (t) => {

  var model = new Organization()
  var pkg   = new OrganizationGenerator()

  var res = await model.create(pkg)

  var res2 = await model.getById(res.id)

  if(res2.id) {
    t.is(res.id, res2.id)
    t.pass()
    return
  }

  t.fail()

})

test(`should update an organization by ID`, async (t) => {

  var model = new Organization()
  var pkg   = new OrganizationGenerator()

  var res  = await model.create(pkg)
  var res2 = await model.update(res.id, {foo: 'bar'})
  var res3 = await model.getById(res.id)

  if(res3.foo) {
    t.is(res3.foo, 'bar')
    t.pass()
    return
  }

  t.fail()

})

test(`should get all organizations`, async (t) => {

  var model = new Organization()
  var pkg   = new OrganizationGenerator()

  var res = await model.create(pkg)

  var res2 = await model.getAll()

  if(res2[0] && res2[0].id) {
    t.pass()
    return
  }

  t.fail()

})
