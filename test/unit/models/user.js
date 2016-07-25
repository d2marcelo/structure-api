import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'
import Model from '../../../src/models/user'

describe('User', function() {

  it('should create a user', async function(done) {

    var user = new User({
    })

    var res = await user.create({
      title: 'Test User'
    })

    expect(res.title).to.equal('Test User')

    done()

  })
})
