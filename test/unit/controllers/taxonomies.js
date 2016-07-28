import {Schema, type}     from 'eisley'
import r                  from '../../../src/lib/database/driver'
import TaxonomiesController from '../../../src/controllers/taxonomies'

/** @test {TaxonomiesController} */
describe('Taxonomies', function() {

  /** @test {TaxonomiesController#create} */
  it('should create an taxonomy', async function(done) {

      var taxonomy = new TaxonomiesController()

      var req = {
        body: {
          title: 'Sports',
          slug: 'sports',
          desc: 'All of our sports content'
        }
      }

      var res = await taxonomy.create(req)

      expect(res.title).to.equal('Sports')
      expect(res.slug).to.equal('sports')
      expect(res.desc).to.equal('All of our sports content')

    done()

  })

  /** @test {TaxonomiesController#update} */
  it('should update a taxonomy', async function(done) {

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
