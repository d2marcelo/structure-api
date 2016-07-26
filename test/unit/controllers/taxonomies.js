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
          description: 'All of our sports content'
        }
      }

      var res = await taxonomy.create(req)

      expect(res.title).to.equal('Sports')
      expect(res.slug).to.equal('sports')
      expect(res.description).to.equal('All of our sports content')

    done()

  })

  /** @test {TaxonomiesController#update} */
  it('should update a taxonomy', async function(done) {

    var taxonomy = new TaxonomiesController()

    var res = await taxonomy.create({
      title: 'Sports',
      slug: 'sports',
      description: 'All of our sports content'
    })

    var req = {
      body: {
        title: 'Sports & Scores',
        slug: 'sports_and_scores',
        description: 'All of our sports content and the scores'
      },
      params: {
        id: res.id
      }
    }

    var res2 = await taxonomy.update(req)

    expect(res2.title).to.equal('Sports & Scores')
    expect(res2.slug).to.equal('sports_and_scores')
    expect(res2.description).to.equal('All of our sports content and the scores')

    done()

  }
)
})
