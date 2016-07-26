import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'
import TagModel      from '../../../src/models/taxonomy'

/** @test {TagModel} */
describe('Tag', function() {

  /** @test {TagModel#create} */
  it('should create a tag', async function(done) {

      var tag = new TagModel()

      var res = await tag.create({
        title: 'Sports',
        slug: 'sports',
        description: 'All of our sports content'
      })

      expect(res.title).to.equal('Sports')
      expect(res.slug).to.equal('sports')
      expect(res.description).to.equal('All of our sports content')

    done()

  })

  /** @test {TagModel#update} */
  it('should update a tag', async function(done) {

    var tag = new TagModel()

    var res = await tag.create({
      title: 'Sports',
      slug: 'sports',
      description: 'All of our sports content'
    })

    var res2 = await tag.update(res.id, {
      title: 'Sports & Scores',
      slug: 'sports_and_scores',
      description: 'All of our sports content and the scores'
    })

    expect(res2.title).to.equal('Sports & Scores')
    expect(res2.slug).to.equal('sports_and_scores')
    expect(res2.description).to.equal('All of our sports content and the scores')

    done()

  }
)
})
