'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _logger = require('../lib/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordService = function () {
  function PasswordService() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PasswordService);

    this.options = options;
  }

  (0, _createClass3.default)(PasswordService, [{
    key: 'issue',
    value: function issue(s) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {

        if (typeof s != 'string') return cb({
          message: 'Password must be a string',
          resource: 'PasswordService'
        });

        _bcrypt2.default.genSalt(parseInt(_this.options.genSalt) || parseInt(process.env.SALT_FACTOR) || 10, function PasswordService_genSaltCallback(err, salt) {
          if (err) {
            _logger.logger.error('Could not generate salt', err);
            return reject(err);
          }

          _bcrypt2.default.hash(s, salt, function PasswordService_hashCallback(err, hash) {
            if (err) {
              _logger.logger.error('Could not generate hash', err);
              return reject(err);
            }

            resolve(hash);
          });
        });
      });
    }
  }, {
    key: 'verify',
    value: function verify(s, hash) {

      return new _promise2.default(function (resolve, reject) {

        _bcrypt2.default.compare(s, hash, function PasswordService_compareCallback(err, match) {

          if (err) {
            _logger.logger.error('Could not verify password', err);
            _logger.logger.debug('Password', s);
            _logger.logger.debug('Hash', hash);
            return reject(err);
          }

          return resolve(true);
        });
      });
    }
  }]);
  return PasswordService;
}();

exports.default = PasswordService;
//# sourceMappingURL=password.js.map