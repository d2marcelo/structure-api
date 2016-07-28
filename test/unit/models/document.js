import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import DocumentModel         from '../../../src/models/document'
import DocumentRevisionModel from '../../../src/models/document-revision'

/** @test {DocumentModel} */
describe('Document', function() {

  it('should initialize', function(done) {

    var document = new DocumentModel()

    expect(document.name).to.be.equal('documents')

    done()

  })

  /** @test {DocumentModel#create} */
  it('should create a document',  async (done) => {

    var document = new DocumentModel()

    var res = await document.create({
      title: 'Fun Document'
    })

    expect(res.title).to.equal('Fun Document')

    done()

  })

  /** @test {DocumentRevisionModel#create} */
  it('should create a document revision',  async (done) => {

    var document = new DocumentModel()

    var documentRes = await document.create({
      title: 'Fun Document'
    })

    var revision = new DocumentRevisionModel()

    var revisionRes = await revision.create({
      documentId: documentRes.id,
      fields: [
        {
          fieldType: 'text-input',
          title: 'Document Title'
        }
      ],
      title: 'Fun Document 2'
    })

    expect(revisionRes.fields.length).to.equal(1)
    expect(revisionRes.fields[0].title).to.equal('Document Title')

    done()

  })

  /** @test {DocumentRevisionModel#update} */
  it('should update a document revision', async function(done) {

    var document = new DocumentModel()

    var documentRes = await document.create({
      title: 'Fun Document'
    })

    var revision = new DocumentRevisionModel()

    var revisionRes = await revision.create({
      documentId:documentRes.id,
      fields: [
      {
        fieldType: 'text-input',
        title: 'Document Title'
      }
      ],
      title: 'Fun Document 2'
    })

    var documentUpdateRes = await document.update(documentRes.id, {
      activeRevisionId: revisionRes.id,
      revisionIds: [revisionRes.id],
      title: 'Fun Document 3'
    })

    var revisionUpdatedRes = await revision.update(revisionRes.id, {
      fields: [
        {
          fieldType: 'text-input',
          title: 'Revision Title'
        },
        {
          fieldType: 'text-input',
          title: 'Description'
        }
      ]
    })

    expect(documentUpdateRes.title).to.equal('Fun Document 3')
    expect(revisionUpdatedRes.fields.length).to.equal(2)
    expect(revisionUpdatedRes.fields[0].title).to.equal('Revision Title')
    expect(revisionUpdatedRes.fields[1].title).to.equal('Description')

    done()

  })

})
