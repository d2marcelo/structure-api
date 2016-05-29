import {chalk, logger}   from '../../../lib/logger'
import MockHTTPServer    from '../../helpers/mock-http-server'
import Models            from '../../helpers/models'
import test              from 'ava'

import {
  AppGenerator,
  BucketGenerator,
  DocumentGenerator,
  FieldGenerator,
  OrganizationGenerator,
  TaxonomyGenerator,
  TemplateGenerator,
  UserGenerator
} from 'structure-test-helpers'

var tests = {
  apps: {
    Generator: AppGenerator
  },
  buckets: {
    Generator: BucketGenerator
  },
  documents: {
    Generator: DocumentGenerator
  },
  fields: {
    Generator: FieldGenerator
  },
  orgs: {
    Generator: OrganizationGenerator
  },
  taxonomies: {
    Generator: TaxonomyGenerator
  },
  templates: {
    Generator: TemplateGenerator
  },
  users: {
    Generator: UserGenerator
  }
}

Models.forEach( (Model) => {
  var model = new Model()

  tests[model.name].Model = Model

})

Object.keys(tests).forEach( (key) => {

  test(`should create a ${key} via PUT`, async (t) => {

    var model = new tests[key].Model()
    var pkg  = new tests[key].Generator()

    var res = await new MockHTTPServer()
      .put(`/api/v0.1/${model.entityName}`)
      .send(pkg)

    if(res.body.pkg && res.body.pkg.id) {
      t.pass()
      return
    }
    //console.error('RES', res)
    console.error(`Could not create pkg ${key}`, res.body, res.text)
    t.fail()

  })

  test(`should get a ${key} by ID via GET`, async (t) => {

    var model = new tests[key].Model()
    var pkg  = new tests[key].Generator()

    var res = await model.create(pkg)

    var res = await new MockHTTPServer()
      .get(`/api/v0.1/${model.entityName}/${res.id}`)

    if(res.body.pkg.id) {
      t.pass()
      return
    }

    t.fail()

  })

  test(`should update a ${key} by ID via POST`, async (t) => {

    var model = new tests[key].Model()
    var pkg  = new tests[key].Generator()

    var res  = await model.create(pkg)
    var res2 = await new MockHTTPServer()
      .post(`/api/v0.1/${model.entityName}/${res.id}`)
      .send({
        foo: 'bar'
      })

    var res3 = await model.getById(res.id)

    if(res3.foo) {
      t.is(res3.foo, 'bar')
      t.pass()
      return
    }

    t.fail()

  })

  test(`should get all ${key}s via GET`, async (t) => {

    var model = new tests[key].Model()
    var pkg  = new tests[key].Generator()

    var res = await model.create(pkg)

    var res = await new MockHTTPServer()
      .get(`/api/v0.1/${model.entityName}`)

    if(res.body.pkg[`${model.entityName}`][0].id) {
      t.pass()
      return
    }

    t.fail()

  })

})
