import {chalk, logger}   from '../../../lib/logger'
import Models            from '../../helpers/models'
import test              from 'ava'

/*import AppGenerator          from '../../helpers/generators/application'
import BucketGenerator       from '../../helpers/generators/bucket'
import DocumentGenerator     from '../../helpers/generators/document'
import FieldGenerator        from '../../helpers/generators/field'
import OrganizationGenerator from '../../helpers/generators/organization'
import TaxonomyGenerator     from '../../helpers/generators/taxonomy'
import TemplateGenerator     from '../../helpers/generators/application'
import UserGenerator         from '../../helpers/generators/application'*/
import {
  AppGenerator,
  AuthGenerator,
  BucketGenerator,
  DigitalAssetGenerator,
  DocumentGenerator,
  DocumentRevisionGenerator,
  FieldGenerator,
  OrganizationGenerator,
  RegistryGenerator,
  TaxonomyGenerator,
  TemplateGenerator,
  TemplateRevisionGenerator,
  UserGenerator
} from 'structure-test-helpers'

var tests = {
  applications: {
    Generator: AppGenerator
  },
  auth: {
    Generator: AuthGenerator
  },
  buckets: {
    Generator: BucketGenerator
  },
  "digital-assets": {
    Generator: DigitalAssetGenerator
  },
  documents: {
    Generator: DocumentGenerator
  },
  "document-revisions": {
    Generator: DocumentRevisionGenerator
  },
  fields: {
    Generator: FieldGenerator
  },
  organizations: {
    Generator: OrganizationGenerator
  },
  registry: {
    Generator: RegistryGenerator
  },
  taxonomies: {
    Generator: TaxonomyGenerator
  },
  templates: {
    Generator: TemplateGenerator
  },
  "template-revisions": {
    Generator: TemplateRevisionGenerator
  },
  users: {
    Generator: UserGenerator
  }
}

Models.forEach( (Model) => {
  var model = new Model(),
      key   = model.name
  //console.log('model.name', model.name)
  tests[model.name].Model = Model
  console.log(1)
  test(`should create a ${key}`, async (t) => {
    console.log(2)
    var model = new Model()
    var pkg   = new tests[model.name].Generator()

    var res = await model.create(pkg)

    if(res.id && res.sid) {
      t.pass()
      return
    }

    t.fail()

  })

  test(`should get a ${key} by ID`, async (t) => {

    var model = new Model()
    var pkg   = new tests[model.name].Generator()

    var res = await model.create(pkg)

    var res2 = await model.getById(res.id)

    if(res2.id) {
      t.is(res.id, res2.id)
      t.pass()
      return
    }

    t.fail()

  })

  test(`should update a ${key} by ID`, async (t) => {

    var model = new Model()
    var pkg   = new tests[model.name].Generator()

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

  test(`should get all ${key}s`, async (t) => {

    var model = new Model()
    var pkg   = new tests[model.name].Generator()

    var res = await model.create(pkg)

    var res2 = await model.getAll()

    if(res2[0] && res2[0].id) {
      t.pass()
      return
    }

    t.fail()

  })

})
