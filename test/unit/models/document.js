import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import Document from '../../../src/models/document'
import Revision from '../../../src/models/document-revision'

describe('Document', function() {

  it('should create a document',  async (done) => {

    var document = new Document({
      name: 'documents'
    })

    var res = await document.create({
      title: 'Fun Document'
    })

    expect(res.title).to.equal('Fun Document')

    done()

  })

  it('should create a document revision',  async (done) => {

    var document = new Document({
      name: 'documents'
    })

    var res = await document.create({
      title: 'Fun Document'
    })

    var revision = new Revision({

    })

    var res2 = await revision.create({
      fields: [
        {
          fieldType: 'text-input',
          title: 'Document Title'
        }
      ],
      title: 'Fun Document 2'
    })

    expect(res2.fields.length).to.equal(1)
    expect(res2.fields[0].title).to.equal('Document Title')

    done()

  })

  it('should update a document revision', function(done) {



  })

})
