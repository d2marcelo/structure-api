import {chalk, logger}   from '../../../lib/logger'
import Application       from '../../../models/application'
import Organization      from '../../../models/organization'
import test              from 'ava'

import {
  ApplicationGenerator,
  OrganizationGenerator
} from 'structure-test-helpers'

test(`should create an application`, async (t) => {

  var organization = new Organization(),
      application  = new Application()

  var org = await organization.create(new OrganizationGenerator())
  var app = await application.create(Object.assign(new ApplicationGenerator(), {
    __refs: [
      {
        id: org.id
      }
    ]
  }))

  if(app.id && app.sid) {
    // Confirm the refs were saved
    t.is(org.id, app.__refs[0].id)
    t.pass()
    return
  }

  t.fail()

})

test(`should get an application by ID`, async (t) => {

  var organization = new Organization(),
      application  = new Application()

  var org = await organization.create(new OrganizationGenerator())
  var app = await application.create(Object.assign(new ApplicationGenerator(), {
    __refs: [
      {
        id: org.id
      }
    ]
  }))

  var res = await application.getById(app.id)

  if(res.id) {
    t.is(res.id, app.id)
    t.pass()
    return
  }

  t.fail()

})

test(`should update an application by ID`, async (t) => {

  var organization = new Organization(),
      application  = new Application()

  var org = await organization.create(new OrganizationGenerator())
  var app = await application.create(Object.assign(new ApplicationGenerator(), {
    __refs: [
      {
        id: org.id
      }
    ]
  }))

  var res2 = await application.update(app.id, {foo: 'bar'})
  var res3 = await application.getById(app.id)

  if(res3.foo) {
    t.is(res3.foo, 'bar')
    t.pass()
    return
  }

  t.fail()

})

test(`should get all applications`, async (t) => {

  var organization = new Organization(),
      application  = new Application()

  var org = await organization.create(new OrganizationGenerator())
  var app = await application.create(Object.assign(new ApplicationGenerator(), {
    __refs: [
      {
        id: org.id
      }
    ]
  }))

  var res2 = await application.getAll()

  if(res2[0] && res2[0].id) {
    t.pass()
    return
  }

  t.fail()

})
