'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenService = function () {
  function TokenService() {
    (0, _classCallCheck3.default)(this, TokenService);
  }

  (0, _createClass3.default)(TokenService, [{
    key: 'issue',
    value: function issue(s) {

      if (typeof s == 'number') s = s.toString();
      if (typeof s != 'string') return false;

      var token = _jsonwebtoken2.default.sign(s, cert, {
        //expiresInMinutes: 1440 // 24 hours
      });

      return token;
    }
  }, {
    key: 'verify',
    value: function verify(token) {

      return _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
    }
  }]);
  return TokenService;
}();

exports.default = TokenService;
//# sourceMappingURL=token.js.map