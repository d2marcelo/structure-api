'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = function () {
  function Log() {
    (0, _classCallCheck3.default)(this, Log);
  }

  (0, _createClass3.default)(Log, [{
    key: 'log',
    value: function log() {
      var _this = this;

      var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


      this.use(function (next) {

        console.log(_this.body);
        //winston.log('debug', this.body)
        next();
      });

      return this;
    }
  }]);
  return Log;
}();

exports.default = Log;
//# sourceMappingURL=log.js.map