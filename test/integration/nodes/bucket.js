import {chalk, logger}   from '../../../lib/logger'
import {objToStr}        from '../../../lib/utils/graphql'
import runner            from '../../helpers/graphql-runner'
import test              from 'ava'
import Bucket            from '../../../nodes/bucket'
import {BucketGenerator} from 'structure-test-helpers'

test('should create a bucket', async (t) => {

  var bucket = new Bucket()
  var pkg    = new BucketGenerator()

  var res = await runner(`
    mutation {
      createBucket(${objToStr(pkg)}) {
        id
      }
    }
  `)

  if(res.data) {
    if(res.data.createBucket) {
      t.is(typeof res.data.createBucket.id, 'string')

      t.pass()
      return
    }

  }

  t.fail()

})

test('should get a bucket by ID', async (t) => {

  var bucket = new Bucket()
  var pkg    = new BucketGenerator()

  var res = await runner(`
    mutation {
      createBucket(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var id = res.data.createBucket.id

  var res2 = await runner(`
    query {
      bucket(id: "${id}") {
        id,
        title
      }
    }
  `)

  if(res2.data) {
    t.is(res2.data.bucket.id, id)
    t.pass()
    return
  }

  t.fail()

})

test('should get all buckets', async (t) => {

  var bucket = new Bucket()
  var pkg    = new BucketGenerator()

  var res = await runner(`
    mutation {
      createBucket(${objToStr(pkg)}) {
        id
      }
    }
  `)

  var res2 = await runner(`
    query {
      buckets {
        id,
        title
      }
    }
  `)

  if(res2.data && res2.data.buckets.length) {
    t.pass()
    return
  }

  t.fail()

})

test.only('should get items from a bucket', async (t) => {

  var bucket = new Bucket()
  var pkg    = new BucketGenerator()

  pkg.data = {
    foo: 'bar'
  }

  /*var res = await runner(`
    mutation {
      createBucket(${objToStr(pkg)}) {
        id
      }
    }
  `)*/
  var res = await runner(`
    mutation {
      createBucket(
        desc: "",
        title: "Test AppThu Apr 14 2016 22:27:32 GMT-0400 EDT",
        data: data(
          foo: "bar"
        )
      ) {
        id
      }
    }
  `)
  console.error('res', res)
  var id = res.data.createBucket.id

  var res2 = await runner(`
    query {
      bucket(id: "${id}") {
        data,
        id,
        title
      }
    }
  `)

  if(res2.data) {
    t.is(res2.data.bucket.data.foo, 'bar')
    t.pass()
    return
  }

  t.fail()

})
