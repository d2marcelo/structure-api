import {Schema, type}       from 'eisley'
import OrganizationsController from '../../../src/controllers/organizations'

/** @test {OrganizationsController} */
describe('Organizations', function() {

  /** @test {OrganizationsController#create} */
  it('should create an organization', async function(done) {

      var organization = new OrganizationsController()

      var req = {
        body: {
          title: 'My Organization',
          desc: 'Cool Organization'
        }
      }

      var res = await organization.create(req)

      expect(res.title).to.equal('My Organization')
      expect(res.desc).to.equal('Cool Organization')

    done()

  })


  /** @test {OrganizationsController#getById} */
  it('should get by ID', async function(done) {

    var organization = new OrganizationsController()

    var req = {
      body: {
        title: 'My Organization',
        desc: 'Cool Organization'
      }
    }

    var res = await organization.create(req)

    var req2 = {
      params: {
        id: res.id
      }
    }

    var res2 = await organization.getById(req2)

    expect(res.title).to.equal('My Organization')
    expect(res.desc).to.equal('Cool Organization')

    done()

  })

  /** @test {OrganizationsController#getAll} */
  it('should get all', async function(done) {

    var organization = new OrganizationsController({
    })

    var req = {
      body: {
        title: 'My Organization',
        desc: 'Cool Organization'
      }
    }

    var res = await organization.create(req)

    var res2 = await organization.getAll()

    expect(res2.length > 0).to.be.true

    done()

  })

  /** @test {OrganizationsController#update} */
  it('should update a organizations', async function(done) {

    var organization = new OrganizationsController()

    var req = {
      body: {
        title: 'My Organization',
        desc: 'Cool Organization'
      }
    }

    var res = await organization.create(req)

    var req = {
      body: {
        title: 'My New Organization',
        desc: 'Cooler Organization'
      },
      params: {
        id: res.id
      }
    }

    var res2 = await organization.update(req)

    expect(res2.title).to.equal('My New Organization')
    expect(res2.desc).to.equal('Cooler Organization')

    done()

  }
)
})
