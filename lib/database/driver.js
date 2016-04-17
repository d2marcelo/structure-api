import rethinkdbdash from 'rethinkdbdash'

const config = {
  authKey: process.env.RETHINK_AUTH_KEY || '',
  buffer:  process.env.NODE_ENV === 'production' ? 50 : 3,
  db:      process.env.NODE_ENV === process.env.RETHINK_DB,
  host:    process.env.RETHINK_HOST || 'localhost',
  min:     process.env.NODE_ENV === 'production' ? 50 : 3,
  port:    process.env.RETHINK_PORT || 28015
}

if(process.env.RETHINK_SSL) {

  Object.assign(config, {
    ssl: {
      ca: ''
    }
  })

}

export default rethinkdbdash(config)
