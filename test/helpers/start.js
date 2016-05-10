require('babel-core/register')
require('babel-polyfill')

var path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

process.env.NODE_ENV = 'test'
require('./runner')
