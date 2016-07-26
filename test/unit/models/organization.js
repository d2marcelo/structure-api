import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import OrganizationModel from '../../../src/models/organization'

/** @test {OrganizationModel} */
describe('Organization', function() {

  /** @test {OrganizationModel#create} */
  it('should create an organization',  async (done) => {

    var organization = new OrganizationModel()

    expect(organization.name).to.be.equal('organizations')

    done()

  })

 })
