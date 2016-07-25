'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.chalk = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _winston2.default.Logger({

  transports: [new _winston2.default.transports.Console({
    colorize: true,
    level: process.env.LOG_LEVEL
  })]

});

exports.chalk = _chalk2.default;
exports.logger = logger;
//# sourceMappingURL=logger.js.map