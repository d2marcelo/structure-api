describe('Unit', function() {

  describe('Lib', function() {
    describe('Database', function() {
      require('./lib/database/driver')
    })
  })

  describe('Models', function() {
    require('./models/root')
    require('./models/template')
  })

})
