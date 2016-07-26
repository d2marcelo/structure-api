describe('Unit', function() {

  describe('Lib', function() {
    describe('Database', function() {
      require('./lib/database/driver')
    })
  })

  describe('Models', function() {
    require('./models/root')
    require('./models/document')
    require('./models/taxonomy')
    require('./models/template')
    require('./models/user')
  })

  describe('Controllers', function() {
    require('./controllers/taxonomies')
  })
})
