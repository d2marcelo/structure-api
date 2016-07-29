import MockHTTPServer from '../../helpers/mock-http-server'
import {Schema, type} from 'eisley'

import OrganizationController from '../../../src/controllers/organizations'

describe('Organization', function() {

  it('should create an organization via PUT', async function(done) {

    var organization = new OrganizationController()

    var pkg = {
      desc: '',
      title: 'Org 45'
    }

    var res = await new MockHTTPServer()
      .put(`/api/v${process.env.API_VERSION}/${organization.name}`)
      .send(pkg)

    expect(res.body.pkg.title).to.equal('Org 45')
    expect(res.body.status).to.equal(201)

    done()

  })

  it('should get an organization by ID via GET', async function(done) {

    var organization = new OrganizationController()

    var pkg = {
      desc: '',
      title: 'Org 45'
    }

    var org = await new MockHTTPServer()
      .put(`/api/v${process.env.API_VERSION}/${organization.name}`)
      .send(pkg)

    var orgId = org.body.pkg.id

    var res = await new MockHTTPServer()
      .get(`/api/v${process.env.API_VERSION}/${organization.name}/${orgId}`)

    expect(res.body.pkg.title).to.equal('Org 45')
    expect(res.body.status).to.equal(200)

    done()

  })

  it('should get all organizations via GET', async function(done) {

    var organization = new OrganizationController()

    var pkg = {
      desc: '',
      title: 'Org 45'
    }

    var org = await new MockHTTPServer()
      .put(`/api/v${process.env.API_VERSION}/${organization.name}`)
      .send(pkg)

    var res = await new MockHTTPServer()
      .get(`/api/v${process.env.API_VERSION}/${organization.name}`)

    expect(res.body.pkg.organizations.length).to.be.above(0)
    expect(res.body.status).to.equal(200)

    done()

  })

  it('should update an organization by ID via POST', async function(done) {

    var organization = new OrganizationController()

    var pkg = {
      desc: '',
      title: 'Org 45'
    }

    var org = await new MockHTTPServer()
      .put(`/api/v${process.env.API_VERSION}/${organization.name}`)
      .send(pkg)

    var orgId = org.body.pkg.id

    var res = await new MockHTTPServer()
      .post(`/api/v${process.env.API_VERSION}/${organization.name}/${orgId}`)
      .send({
        desc: '',
        title: 'Org 46'
      })

    var res2 = await new MockHTTPServer()
      .get(`/api/v${process.env.API_VERSION}/${organization.name}/${orgId}`)

    expect(res2.body.pkg.title).to.equal('Org 46')
    expect(res.body.status).to.equal(200)

    done()

  })

})
