import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'
import User           from '../../../src/models/user'

describe('User', function() {

  it('should create a user', async function(done) {

    var user = new User()

    var res = await user.create({
      firstName: 'Ted',
      password: 'foo88'
    })

    expect(res.firstName).to.equal('Ted')

    done()

  })
})
