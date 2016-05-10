import {chalk, logger}   from '../../../lib/logger'
import MockHTTPServer    from '../../helpers/mock-http-server'
import Nodes             from '../../helpers/nodes'
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
  app: {
    Generator: AppGenerator
  },
  bucket: {
    Generator: BucketGenerator
  },
  document: {
    Generator: DocumentGenerator
  },
  field: {
    Generator: FieldGenerator
  },
  org: {
    Generator: OrganizationGenerator
  },
  taxonomy: {
    Generator: TaxonomyGenerator
  },
  template: {
    Generator: TemplateGenerator
  },
  user: {
    Generator: UserGenerator
  }
}

Nodes.forEach( (Node) => {
  var node = new Node()

  if(['auth'].indexOf(node.linkName) == -1) {
    tests[node.linkName].Node = Node
  }

})

Object.keys(tests).forEach( (key) => {

  test(`should create a ${key}`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res = await node.create(pkg)

    if(res.id && res.sid) {
      t.pass()
      return
    }

    t.fail()

  })

  test(`should get a ${key} by ID`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res = await node.create(pkg)

    var res2 = await node.getById(res.id)

    if(res2.id) {
      t.is(res.id, res2.id)
      t.pass()
      return
    }

    t.fail()

  })

  test(`should update a ${key} by ID`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res  = await node.create(pkg)
    var res2 = await node.update(res.id, {foo: 'bar'})
    var res3 = await node.getById(res.id)

    if(res3.foo) {
      t.is(res3.foo, 'bar')
      t.pass()
      return
    }

    t.fail()

  })

  test(`should get all ${key}s`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res = await node.create(pkg)

    var res2 = await node.getAll()

    if(res2[0] && res2[0].id) {
      t.pass()
      return
    }

    t.fail()

  })

  test(`should create a ${key} via PUT`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res = await new MockHTTPServer()
      .put(`/api/v0.1/${node.entityName}`)
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

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res = await node.create(pkg)

    var res = await new MockHTTPServer()
      .get(`/api/v0.1/${node.entityName}/${res.id}`)

    if(res.body.pkg.id) {
      t.pass()
      return
    }

    t.fail()

  })

  test(`should update a ${key} by ID via POST`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res  = await node.create(pkg)
    var res2 = await new MockHTTPServer()
      .post(`/api/v0.1/${node.entityName}/${res.id}`)
      .send({
        foo: 'bar'
      })

    var res3 = await node.getById(res.id)

    if(res3.foo) {
      t.is(res3.foo, 'bar')
      t.pass()
      return
    }

    t.fail()

  })

  test(`should get all ${key}s via GET`, async (t) => {

    var node = new tests[key].Node()
    var pkg  = new tests[key].Generator()

    var res = await node.create(pkg)

    var res = await new MockHTTPServer()
      .get(`/api/v0.1/${node.entityName}`)

    if(res.body.pkg[`${node.entityName}`][0].id) {
      t.pass()
      return
    }

    t.fail()

  })

})
