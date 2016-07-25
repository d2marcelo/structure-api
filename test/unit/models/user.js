import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'
import UserModel      from '../../../src/models/user'

/** @test {UserModel} */
describe('User', function() {

  /** @test {UserModel#create} */
  it('should create a user', async function(done) {

    var user = new UserModel()

    var res = await user.create({
      firstName: 'Ted',
      password: 'foo88'
    })

    expect(res.firstName).to.equal('Ted')

    done()

  })
})
