'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PackageService = function () {
  function PackageService() {
    (0, _classCallCheck3.default)(this, PackageService);
  }

  (0, _createClass3.default)(PackageService, [{
    key: 'error',
    value: function error() {
      var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var options = arguments[1];

      var status = 400;

      if (typeof options == 'number') status = options;
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) == 'object') {
        status = options.status || status;
      }

      return {
        err: {},
        status: status
      };
    }
  }, {
    key: 'success',
    value: function success() {
      var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var options = arguments[1];

      var status = 200;

      if (typeof options == 'number') status = options;
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) == 'object') {
        status = options.status || status;
      }

      return {
        pkg: o,
        status: status
      };
    }
  }]);
  return PackageService;
}();

exports.default = PackageService;
//# sourceMappingURL=package.js.map