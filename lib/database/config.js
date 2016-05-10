var config = {
  authKey: process.env.RETHINK_DB_AUTH_KEY || '',
  buffer:  process.env.NODE_ENV === 'production' ? 50 : 3,
  db:      process.env.NODE_ENV === 'test' ? 'test' : process.env.RETHINK_DB_NAME,
  host:    process.env.RETHINK_DB_HOST || 'localhost',
  min:     process.env.NODE_ENV === 'production' ? 50 : 3,
  port:    process.env.RETHINK_DB_PORT || 28015
}

if(process.env.RETHINK_SSL) {

  Object.assign(config, {
    ssl: {
      ca: ''
    }
  })

}

export default config
