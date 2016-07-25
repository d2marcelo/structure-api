var chalk                  = require('chalk'),
    clean                  = require('gulp-clean'),
    concat                 = require('gulp-concat'),
    execAsync               = require('child_process').exec,
    eslint                 = require('gulp-eslint'),
    gulp                   = require('gulp'),
    gutil                  = require('gulp-util'),
    mocha                  = require('gulp-mocha'),
    nodemon                = require('nodemon'),
    path                   = require('path'),
    sequence               = require('run-sequence'),
    size                   = require('gulp-size'),
    spawn                  = require('child_process').spawn

function exec(cmd) {

  //execAsync(cmd, {stdio:[0,1,2]})
  var proc = spawn(cmd, {stdio:[0,1,2]})

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

gulp.task('mocha-unit', async function(done) {

  return gulp
    .src([
      './test/helpers/start.js',
      './test/unit/suite.js',
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

gulp.task('test-unit', function(done) {
  sequence('mocha-unit', done)
})

gulp.task('t',      ['mocha'])
