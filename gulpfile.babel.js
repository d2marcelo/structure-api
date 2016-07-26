var chalk                  = require('chalk'),
    clean                  = require('gulp-clean'),
    concat                 = require('gulp-concat'),
    execSync               = require('child_process').execSync,
    eslint                 = require('gulp-eslint'),
    gulp                   = require('gulp'),
    gutil                  = require('gulp-util'),
    mocha                  = require('gulp-mocha'),
    nodemon                = require('nodemon'),
    path                   = require('path'),
    r                      = require('./src/lib/database/driver'),
    sequence               = require('run-sequence'),
    size                   = require('gulp-size'),
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

gulp.task('lint', function () {

    return gulp.src([
      'src/**/*.js',
      'test/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())

})

gulp.task('mocha', function() {

  return gulp
    .src([
      './test/helpers/start.js',
      './test/unit/suite.js',
      //'./test/integration/**/*.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      process.exit()
    })
    .on('error', function (e) {
      //process.exit(1)
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

gulp.task('test-unit', function(done) {
  sequence('mocha-unit', done)
})

gulp.task('t',      ['mocha'])
