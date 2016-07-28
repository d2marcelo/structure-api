import {Schema, type}     from 'eisley'
import r                  from '../../../src/lib/database/driver'
import UsersController from '../../../src/controllers/users'

/** @test {UsersController} */
describe('Users', function() {

  /** @test {UsersController#create} */
  it('should create an user', async function(done) {

      var user = new UsersController()

      var req = {
        body: {
          username: 'tedtalks2000',
          email: 'ted@email.com',
          password: 'foo88'
        }
      }

      var res = await user.create(req)

      expect(res.username).to.equal('tedtalks2000')
      expect(res.email).to.equal('ted@email.com')
      expect(res.password).to.be.undefined
      expect(res.hash).to.be.a('string')

    done()

  })


  /** @test {UsersController#getById} */
  it.skip('should get by ID', async function(done) {

    var user = new UsersController({
    })

    var res = await user.create({
      username: 'tedtalks2000',
      email: 'ted@email.com',
      password: 'foo88'
    })

    var res2 = await user.getById(res.id)

    expect(res2.username).to.equal('tedtalks2000')
    expect(res2.email).to.equal('ted@email.com')
    expect(res2.password).to.be.undefined
    expect(res2.hash).to.be.a('string')

    done()

  })

  /** @test {UserModel#getAll} */
  it.skip('should get all', async function(done) {

    var user = new UsersController({
      name: 'root'
    })

    var res = await user.create({
      username: 'tedtalks2000',
      email: 'ted@email.com',
      password: 'foo88'
    })

    var res2 = await user.getAll()

    expect(res2.length > 0).to.be.true

    done()

  })

  /** @test {UsersController#update} */
  it('should update a user', async function(done) {

    var user = new UsersController()

    var req = {
      body: {
        username: 'tedtalks2000',
        email: 'ted@email.com',
        password: 'foo88'
      }
    }

    var res = await user.create(req)

    var req = {
      body: {
        username: 'ted2000',
        email: 'ted2000@email.com',
      },
      params: {
        id: res.id
      }
    }

    var res2 = await user.update(req)

    expect(res2.username).to.equal('ted2000')
    expect(res2.email).to.equal('ted2000@email.com')
    expect(res.password).to.be.undefined
    expect(res.hash).to.be.a('string')

    done()

  }
)
})
