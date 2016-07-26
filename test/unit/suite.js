describe('Unit', function() {

  describe('Lib', function() {
    describe('Database', function() {
      require('./lib/database/driver')
    })
  })

  describe('Models', function() {
    require('./models/root')
    require('./models/template')
    require('./models/user')
  })

  describe('Documents', function() {
    require('./models/document')
  })

  describe('Organization', function(){
    require('./models/organization')
  }) 
})
