import {chalk, logger}         from '../../../lib/logger'
import {objToStr}              from '../../../lib/utils/graphql'
import runner                  from '../../helpers/graphql-runner'
import test                    from 'ava'
import Org                     from '../../../nodes/organization'
import {OrganizationGenerator} from 'structure-test-helpers'

import User                    from '../../../nodes/user'
import {UserGenerator}         from 'structure-test-helpers'

test('should create an organization', async (t) => {

  var org = new Org()
  var pkg = new OrganizationGenerator()

  var res = await runner(`
    mutation {
      createOrg(${objToStr(pkg)}) {
        id
      }
    }
  `)

  if(res.data) {
    if(res.data.createOrg) {
      t.is(typeof res.data.createOrg.id, 'string')

      t.pass()
      return
    }

  }

  t.fail()

})

test('should get an org by ID', async (t) => {

  var org = new Org()
  var pkg = new OrganizationGenerator()

  var res = await runner(`
    mutation {
      createOrg(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var id = res.data.createOrg.id

  var res2 = await runner(`
    query {
      org(id: "${id}") {
        id,
        title
      }
    }
  `)

  if(res2.data) {
    t.is(res2.data.org.id, id)
    t.pass()
    return
  }

  t.fail()

})

test('should get all orgs', async (t) => {

  var org = new Org()
  var pkg = new OrganizationGenerator()

  var res = await runner(`
    mutation {
      createOrg(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var res2 = await runner(`
    query {
      orgs {
        id,
        title
      }
    }
  `)

  if(res2.data && res2.data.orgs.length) {
    t.pass()
    return
  }

  t.fail()

})

test('should add a user to an organization', async (t) => {

  var org = new Org()
  var pkg = new OrganizationGenerator()

  var user = new User()
  var userPkg  = new UserGenerator()
  delete userPkg.password

  var res = await runner(`
    mutation {
      createOrg(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var res2 = await runner(`
    mutation {
      createUser(${objToStr(userPkg)}) {
        id
      }
    }
  `)

  var uoPkg = {
    orgId: res.data.createOrg.id,
    userId: res2.data.createUser.id
  }

  var res3 = await runner(`
    mutation {
      addUserToOrg(${objToStr(uoPkg)}) {
        id
      }
    }
  `)
  console.error(res3)
  if(res3.data) {
    if(res3.data.addUserToOrg) {
      t.is(typeof res3.data.addUserToOrg.id, 'string')

      t.pass()
      return
    }

  }

  t.fail()

})
