'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = require('../lib/logger');

var _shorthash = require('shorthash');

var _shorthash2 = _interopRequireDefault(_shorthash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShortIdService = function () {
  function ShortIdService() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ShortIdService);

    this.options = options;
  }

  (0, _createClass3.default)(ShortIdService, [{
    key: 'issue',
    value: function issue(id) {

      var sid = _shorthash2.default.unique(id);

      return sid;
    }
  }]);
  return ShortIdService;
}();

exports.default = ShortIdService;
//# sourceMappingURL=short-id.js.map