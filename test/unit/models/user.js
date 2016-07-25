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
        lastName: 'Talks',
        username: 'tedtalks2000',
        email: 'ted@email.com',
        password: 'foo88'
      })


      expect(res.firstName).to.equal('Ted')
      expect(res.lastName).to.equal('Talks')
      expect(res.username).to.equal('tedtalks2000')
      expect(res.email).to.equal('ted@email.com')
      expect(res.password).to.be.undefined
      expect(res.hash).to.be.a('string')

    done()

  })

  it('should update a user', async function(done) {

    var user = new UserModel()

    var res = await user.create({
      firstName: 'Ted',
      lastName: 'Talks',
      username: 'tedtalks2000',
      email: 'ted@email.com',
      password: 'foo88'
    })

    var res2 = await user.update(res.id, {
      firstName: 'Theodore',
      lastName: 'Talkington',
      username: 'tedtalks200',
      email: 'ted2000@email.com',
      password: 'foo888'
    })


    expect(res2.firstName).to.equal('Theodore')
    expect(res2.lastName).to.equal('Talkington')
    expect(res2.username).to.equal('tedtalks200')
    expect(res2.email).to.equal('ted2000@email.com')


    done()

  }
)
})
