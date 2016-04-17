import {chalk, logger}  from '../../../lib/logger'
import {objToStr}       from '../../../lib/utils/graphql'
import runner           from '../../helpers/graphql-runner'
import test             from 'ava'
import App              from '../../../nodes/application'
import {AppGenerator}   from 'structure-test-helpers'

test('should create an app', async (t) => {

  var app = new App()
  var pkg = new AppGenerator()

  var res = await runner(`
    mutation {
      createApp(${objToStr(pkg)}) {
        id
      }
    }
  `)

  if(res.data) {
    if(res.data.createApp) {
      t.is(typeof res.data.createApp.id, 'string')

      t.pass()
      return
    }

  }

  t.fail()

})

test('should get an app by ID', async (t) => {

  var app = new App()
  var pkg = new AppGenerator()

  var res = await runner(`
    mutation {
      createApp(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var id = res.data.createApp.id

  var res2 = await runner(`
    query {
      app(id: "${id}") {
        id,
        title
      }
    }
  `)

  if(res2.data) {
    t.is(res2.data.app.id, id)
    t.pass()
    return
  }

  t.fail()

})

test('should get all apps', async (t) => {

  var app = new App()
  var pkg = new AppGenerator()

  var res = await runner(`
    mutation {
      createApp(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var res2 = await runner(`
    query {
      apps {
        id,
        title
      }
    }
  `)

  if(res2.data && res2.data.apps.length) {
    t.pass()
    return
  }

  t.fail()

})
