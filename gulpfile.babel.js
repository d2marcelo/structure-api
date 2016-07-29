var chalk                  = require('chalk'),
    clean                  = require('gulp-clean'),
    concat                 = require('gulp-concat'),
    execSync               = require('child_process').execSync,
    eslint                 = require('gulp-eslint'),
    gulp                   = require('gulp'),
    gutil                  = require('gulp-util'),
    mocha                  = require('gulp-mocha'),
    nano                   = require('gulp-cssnano'),
    nodemon                = require('nodemon'),
    path                   = require('path'),
    postcss                = require('gulp-postcss'),
    postcssAutoprefixer    = require('autoprefixer'),
    postcssColor           = require('postcss-color-function'),
    postcssDiscardComments = require('postcss-discard-comments'),
    postcssFontMagician    = require('postcss-font-magician'),
    postcssMixins          = require('postcss-mixins'),
    postcssNested          = require('postcss-nested'),
    postcssSimpleVars      = require('postcss-simple-vars'),
    sequence               = require('run-sequence'),
    size                   = require('gulp-size'),
    sourcemaps             = require('gulp-sourcemaps'),
    spawn                  = require('child_process').spawn

function exec(cmd) {

  execSync(cmd, {stdio:[0,1,2]})

}

function wait(m) {

  return new Promise( (resolve, reject) => {

    setTimeout(function() {
      resolve()
    }, m)

  })

}

gulp.task('doc-styles', function() {

  //flush cache of the global vars js
  try {
    delete require.cache[require.resolve('./src/manual/styles/base/variables')]
  } catch (e) {}

  var styles = [
    './src/manual/styles/base/xs.css',
    './src/manual/styles/blocks/**/xs.css',
    './src/manual/styles/blocks/**/sm.css',
    './src/manual/styles/blocks/**/md.css',
    './src/manual/styles/blocks/**/lg.css',
  ]

  return gulp
    .src(styles)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssMixins({mixinsDir: path.join(__dirname, './src/manual/styles/mixins/')}),
      postcssSimpleVars({variables: require('./src/manual/styles/base/variables')}),
      postcssColor(),
      postcssFontMagician({
        hosted: './src/manual/assets/fonts'
      }),
      postcssNested,
      postcssAutoprefixer({browsers: ['last 2 versions', '> 2%']}),
      postcssDiscardComments
    ]))
    .pipe(concat('app.css'))
    .pipe(nano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./doc/css'))

})

gulp.task('lint', function () {

    return gulp.src([
      'src/**/*.js',
      'test/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())

})

gulp.task('mocha', function(done) {

  var r = require('./src/lib/database/driver')

  // Modified the rethinkdbdash drain function to be awaitable
  function drain() {

    var _this = r.getPoolMaster()

    return new Promise( (resolve, reject) => {

      _this.emit('draining')

      if (_this._discovery === true) {
        _this._discovery = false;
        if (_this._feed != null) {
          _this._feed.close()
        }
      }
      _this._draining = true
      var promises = []
      var pools = _this.getPools()
      for(var i=0; i<pools.length; i++) {
        promises.push(pools[i].drain())
      }
      _this._healthyPools = []

      Promise
        .all(promises)
        .then(function() {
          for(var i=0; i<pools.length; i++) {
            pools[i].removeAllListeners()
          }
          setTimeout(function() {
            resolve()
          }, 1000)
        })
        .catch(function(error) {
          if (_this._options.silent !== true) {
            _this._log('Failed to drain all the pools:')
            _this._log(error.message)
            _this._log(error.stack)
          }
          reject()
        })

    })

  }

  gulp
    .src([
      './test/helpers/start.js',
      './test/unit/suite.js',
      './test/integration/suite.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .on('end', async function () {

      do {
        await drain()
      }
      while(r.getPoolMaster().getLength() > 0) {
        //console.log('pools', r.getPoolMaster().getPools())
        console.log('DEBUG: pool length', r.getPoolMaster().getLength())
        //console.log('pool length (available)', r.getPoolMaster().getAvailableLength())
        await drain()
      }

      process.exit()

    })
    .on('error', async function (e) {
      console.error(e)

      do {
        await drain()
      }
      while(r.getPoolMaster().getLength() > 0) {

        console.log('DEBUG: pool length', r.getPoolMaster().getLength())

        await drain()
      }

      process.exit(1)
    })

})

gulp.task('mocha-graphql', function() {

  return gulp
    .src([
      './test/helpers/graphql-runner.js',
      //'./test/unit/**/*.js',
      './test/integration/nodes/*.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      process.exit()
    })

})

gulp.task('mocha-integration', async function(done) {

  return gulp
    .src([
      './test/helpers/start.js',
      './test/integration/suite.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      process.exit()
      //done()
    })
    .on('error', function (e) {
      //process.exit(1)
      //done()
    })

})

gulp.task('mocha-unit', async function(done) {

  var r = require('./src/lib/database/driver')

  return gulp
    .src([
      './test/helpers/start.js',
      './test/unit/suite.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      r.getPoolMaster().drain()
      process.exit()
      //done()
    })
    .once('error', function (e) {
      //done()
    })

})

gulp.task('start-reqlite', function(done) {

  try {
    execSync('node_modules/forever/bin/forever stop node_modules/reqlite/lib/node.js --port-offset 1 -s')
  }
  catch(e) {}
  process.exit()

})

gulp.task('stop-reqlite', function(done) {

  try {
    execSync('node_modules/forever/bin/forever stop node_modules/reqlite/lib/node.js --port-offset 1 -s')
  }
  catch(e) {}
  process.exit()

})

gulp.task('test', ['mocha'])

gulp.task('test-unit', function(done) {
  sequence('mocha-unit', done)
})

gulp.task('t', ['test'])
