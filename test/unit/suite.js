describe('Unit', function() {

  /*describe('Lib', function() {
    describe('Database', function() {
      require('./lib/database/driver')
    })
  })*/

  describe('Models', function() {
    require('./models/root')
    require('./models/auth')
    require('./models/document')
    require('./models/organization')
    require('./models/taxonomy')
    require('./models/template')
    require('./models/user')
  })

  describe('Controllers', function() {
    require('./controllers/auth')
    require('./controllers/documents')
    require('./controllers/organizations')
    require('./controllers/taxonomies')
    require('./controllers/templates')
    require('./controllers/users')
  })

  describe('Services', function() {
    require('./services/password')
  })

  describe('Server', function() {
    require('./server/index')
    require('./server/dispatcher')
    require('./server/router')
  })

  describe('Routes', function() {
    require('./routes/organizations')
  })

})
