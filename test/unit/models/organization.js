import {Schema, type} from 'eisley'
import r              from '../../../src/lib/database/driver'

import OrganizationModel from '../../../src/models/organization'

describe('Organization', function() {

  it('should create an OrganizationModel',  async (done) => {

    var organization = new OrganizationModel({})
    expect(organization.name).to.be.equal('organizations')
    done()
  })
 })
