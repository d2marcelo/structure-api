import {Schema, type}     from 'eisley'
import r                  from '../../../src/lib/database/driver'
import TemplatesController from '../../../src/controllers/templates'

/** @test {TemplatesController} */
describe('Templates', function() {

  /** @test {TemplatesController#create} */
  it.skip('should create an template', async function(done) {

      var template = new TemplatesController()

      var req = {
        body: {
          title: 'Fun Template',
        }
      }

      var res = await template.create(req)

      expect(res.title).to.equal('Fun Template')

    done()

  })


  /** @test {TaxonomiesController#getById} */
  it.skip('should get by ID', async function(done) {

    var taxonomy = new TaxonomiesController()

    var req = {
      body: {
        title: 'Sports',
        slug: 'sports',
        desc: 'All of our sports content'
      }
    }

    var res = await taxonomy.create(req)

    var req2 = {
      params: {
        id: res.id
      }
    }

    var res2 = await taxonomy.getById(req2)

    expect(res.title).to.equal('Sports')
    expect(res.slug).to.equal('sports')
    expect(res.desc).to.equal('All of our sports content')

    done()

  })

  /** @test {TaxonomiesController#getAll} */
  it.skip('should get all', async function(done) {

    var taxonomy = new TaxonomiesController({
    })

    var req = {
      body: {
        title: 'Sports',
        slug: 'sports',
        desc: 'All of our sports content'
      }
    }

    var res = await taxonomy.create(req)

    var res2 = await taxonomy.getAll()

    expect(res2.length > 0).to.be.true

    done()

  })

  /** @test {TaxonomiesController#update} */
  it.skip('should update a taxonomy', async function(done) {

    var taxonomy = new TaxonomiesController()

    var req = {
      body: {
        title: 'Sports',
        slug: 'sports',
        desc: 'All of our sports content'
      }
    }

    var res = await taxonomy.create(req)

    var req = {
      body: {
        title: 'Sports & Scores',
        slug: 'sports_and_scores',
        desc: 'All of our sports content and the scores'
      },
      params: {
        id: res.id
      }
    }

    var res2 = await taxonomy.update(req)

    expect(res2.title).to.equal('Sports & Scores')
    expect(res2.slug).to.equal('sports_and_scores')
    expect(res2.desc).to.equal('All of our sports content and the scores')

    done()

  }
)
})
