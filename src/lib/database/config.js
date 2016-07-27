var config = {
  authKey: process.env.RETHINK_DB_AUTH_KEY || '',
  buffer:  process.env.NODE_ENV === 'production' ? 50 : 3,
  db:      process.env.RETHINK_DB_NAME,
  host:    process.env.RETHINK_DB_HOST || 'localhost',
  min:     process.env.NODE_ENV === 'production' ? 50 : 3,
  pool:    true,
  port:    process.env.RETHINK_DB_PORT || 28015,
  servers: [
    {host: '127.0.0.1', port: 28015}
  ],
  tables:  [
    'actions',
    'auth',
    'applications',
    'buckets',
    'channels',
    'digital_assets',
    'documents',
    'document_revisions',
    'fields',
    'organizations',
    'refs', // References
    'registry',
    //'revisions',
    'root',
    'taxonomies',
    'templates',
    'template_revisions',
    'test',
    'users'
  ]
}

if(process.env.RETHINK_SSL) {

  Object.assign(config, {
    ssl: {
      ca: ''
    }
  })

}

export default config
