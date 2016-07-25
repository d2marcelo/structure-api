require('babel-core/register')
require('babel-polyfill')
require('./db')(require('minimist')(process.argv.slice(2)))
