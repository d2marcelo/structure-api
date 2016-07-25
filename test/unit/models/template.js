import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import Template from '../../../src/models/template'
import Revision from '../../../src/models/template-revision'

describe('Template', function() {

  /*beforeEach(function(done) {
    this.stubInsert = sinon.stub(r, 'insert', function(pkg, options) {
      return new Promise( (resolve, reject) => {

        resolve({
          changes: [
            {
              new_val: pkg
            }
          ]
        })

      })
    })
  })

  afterEach(function(done) {
    r.insert.restore()
  })*/

  it('should create a template',  async (done) => {

    var template = new Template({
      name: 'templates'
    })

    var res = await template.create({
      title: 'Fun Template'
    })

    expect(res.title).to.equal('Fun Template')

    done()

  })

  it('should create a template revision',  async function(done) {

    var template = new Template({
      name: 'templates'
    })

    var res = await template.create({
      title: 'Fun Template'
    })

    var revision = new Revision({
      templateId: res.id
    })

    var res2 = await revision.create({
      fields: [
        {
          fieldType: 'text-input',
          title: 'Document Title'
        }
      ],
      title: 'Fun Template 2'
    })

    var res3 = await template.update(res.id, {
      activeRevisionId: res2.id,
      revisionIds: [res2.id]
    })

    expect(res2.fields.length).to.equal(1)
    expect(res2.fields[0].title).to.equal('Document Title')
    expect(res3.activeRevisionId).to.equal(res2.id)

    done()

  })

  it('should update a template revision', async function(done) {



  })

})
