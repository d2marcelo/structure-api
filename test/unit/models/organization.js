import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import OrganizationModel from '../../../src/models/organization'

/** @test {OrganizationModel} */
describe('Organization', function() {

  it('should initialize', function(done) {

    var organization = new OrganizationModel()

    expect(organization.name).to.be.equal('organizations')

    done()

  })

  /** @test {OrganizationModel#create} */
  it.skip('should create an organization',  async function(done) {

    done()

  })

 })
