import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import OrganizationModel from '../../../src/models/organization'

/** @test {OrganizationModel} */
describe('Organization', function() {

  /** @test {OrganizationModel#initialize} */
  it('should initialize', function(done) {

    var organization = new OrganizationModel()

    expect(organization.name).to.be.equal('organizations')

    done()

  })

  /** @test {OrganizationModel#create} */
  it('should create an organization',  async function(done) {

    var organization = new OrganizationModel()

    var res = await organization.create({
      title:'My organization', description:'cool organization'
    })

    expect(res.title).to.equal('My organization')

    done()

  })

  /** @test {OrganizationModel#getById} */
  it('should get an organization by id',  async function(done) {

    var organization = new OrganizationModel()

    var responseOrganization = await organization.create({
      title:'My organization', description:'cool organization'
    })

    var responseGetById = await organization.getById(responseOrganization.id)

    expect(responseGetById.title).to.equal('My organization')

    done()

  })

  /** @test {OrganizationModel#getAll}**/
  it('should get all organizations', async function(done) {

    var organization = new OrganizationModel()

    var responseOrganization = await organization.create({
      title:'My organization', description:'cool organization'
    })

    var responseAll = await organization.getAll()

    expect(responseAll.length > 0).to.be.true

    done()

  })

  /** @test {RootModel#update} */
  it('should update an organization', async function(done) {

    var organization = new OrganizationModel()

    var responseOrganization = await organization.create({
      title:'My organization', description:'cool organization'
    })

    var responseUpdated = await organization.update(responseOrganization.id, {
      title: 'My updated organization'
    })

    expect(responseUpdated.title).to.equal('My updated organization')

    done()

  })

})
