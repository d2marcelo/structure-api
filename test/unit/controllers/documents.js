import {Schema, type}       from 'eisley'
import DocumentsController from '../../../src/controllers/documents'

/** @test {DocumentsController} */
describe('Documents', function() {

  /** @test {DocumentsController#create} */
  it('should create an taxonomy', async function(done) {

      var document = new DocumentsController()

      var req = {
        body: {
          title: 'My Document'
        }
      }

      var res = await document.create(req)

      expect(res.title).to.equal('My Document')

    done()

  })


  /** @test {DocumentsController#getById} */
  it('should get by ID', async function(done) {

    var document = new DocumentsController()

    var req = {
      body: {
        title: 'My Document'
      }
    }

    var res = await document.create(req)

    var req2 = {
      params: {
        id: res.id
      }
    }

    var res2 = await document.getById(req2)

    expect(res.title).to.equal('My Document')

    done()

  })

  /** @test {DocumentsController#getAll} */
  it('should get all', async function(done) {

    var document = new DocumentsController({
    })

    var req = {
      body: {
        title: 'My Document'
      }
    }

    var res = await document.create(req)

    var res2 = await document.getAll()

    expect(res2.length > 0).to.be.true

    done()

  })

  /** @test {DocumentsController#update} */
  it('should update a document', async function(done) {

    var document = new DocumentsController()

    var req = {
      body: {
        title: 'My Document'
      }
    }

    var res = await document.create(req)

    var req = {
      body: {
        title: 'My Updated Document'
      },
      params: {
        id: res.id
      }
    }

    var res2 = await document.update(req)

    expect(res2.title).to.equal('My Updated Document')

    done()

  }
)
})
