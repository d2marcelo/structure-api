import {chalk, logger} from '../../../lib/logger'
import {objToStr}      from '../../../lib/utils/graphql'
import runner          from '../../helpers/graphql-runner'
import test            from 'ava'
import User            from '../../../nodes/user'
import {UserGenerator} from 'structure-test-helpers'

test('should create a user', async (t) => {

  var user = new User()
  var pkg  = new UserGenerator()
  delete pkg.password

  var res = await runner(`
    mutation {
      createUser(${objToStr(pkg)}) {
        id
      }
    }
  `)

  if(res.data) {
    if(res.data.createUser) {
      t.is(typeof res.data.createUser.id, 'string')

      t.pass()
      return
    }

  }

  t.fail()

})

test('should get user by ID', async (t) => {

  var user = new User()
  var pkg  = new UserGenerator()
  delete pkg.password

  var res = await runner(`
    mutation {
      createUser(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var id = res.data.createUser.id

  var res2 = await runner(`
    query {
      user(id: "${id}") {
        email,
        id
      }
    }
  `)

  if(res2.data) {
    t.is(res2.data.user.id, id)
    t.pass()
    return
  }

  t.fail()

})

test('should get all users', async (t) => {

  var user = new User()
  var pkg  = new UserGenerator()
  delete pkg.password

  var res = await runner(`
    mutation {
      createUser(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var res2 = await runner(`
    query {
      users {
        email,
        id
      }
    }
  `)

  if(res2.data && res2.data.users.length) {
    t.pass()
    return
  }

  t.fail()

})
