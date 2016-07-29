import {Schema, type} from 'eisley'
import UserModel      from '../../../src/models/user'

/** @test {UserModel} */
describe('User', function() {

  it('should initialize', function(done) {

    var user = new UserModel()

    expect(user.name).to.be.equal('users')

    done()

  })

  /** @test {UserModel#create} */
  it('should create a user', async function(done) {

    var user = new UserModel()

    var res = await user.create({
      username: 'tedtalks2000',
      email: 'ted@email.com',
      password: 'foo88'
    })

    expect(res.username).to.equal('tedtalks2000')
    expect(res.email).to.equal('ted@email.com')
    expect(res.password).to.be.undefined
    expect(res.hash).to.be.a('string')

    done()

  })

  /** @test {UserModel#getById} */
  it('should get by ID', async function(done) {

    var user = new UserModel({
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
  it('should get all', async function(done) {

    var user = new UserModel({
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

  /** @test {UserModel#update} */
  it('should update a user', async function(done) {

    var user = new UserModel()

    var res = await user.create({
      username: 'tedtalks2000',
      email: 'ted@email.com',
      password: 'foo88'
    })

    var res2 = await user.update(res.id, {
      firstName: 'Theodore',
      lastName: 'Talkington',
      username: 'tedtalks200',
      email: 'ted2000@email.com'
    })

    expect(res2.firstName).to.equal('Theodore')
    expect(res2.lastName).to.equal('Talkington')
    expect(res2.username).to.equal('tedtalks200')
    expect(res2.email).to.equal('ted2000@email.com')
    expect(res2.password).to.be.undefined
    expect(res2.hash).to.be.a('string')

    done()

  }
)
})
