'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = require('rethinkdbdash')(_config2.default);

r.getPoolMaster().on('log', function () {
  console.error.apply(console, arguments);
});

exports.default = r;
//# sourceMappingURL=driver.js.map