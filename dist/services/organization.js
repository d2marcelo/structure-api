'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _logger = require('../lib/logger');

var _shortId = require('../services/short-id');

var _shortId2 = _interopRequireDefault(_shortId);

var _organization = require('../models/organization');

var _organization2 = _interopRequireDefault(_organization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrganizationService = function () {
  function OrganizationService() {
    (0, _classCallCheck3.default)(this, OrganizationService);
  }

  (0, _createClass3.default)(OrganizationService, [{
    key: 'create',
    value: function create() {
      var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var cb = arguments[1];

      var _this = this;

      var pkg = (0, _assign2.default)({}, o);

      // validation

      var shortidService = new _shortId2.default(),
          organizationModel = new _organization2.default();

      organizationModel.create(pkg, function (err, res) {

        if (err) {
          _logger.logger.error(err);

          return cb({
            message: 'Could not create organization',
            resource: 'OrganizationService'
          });
        }

        var sid = shortidService.issue(res.id);

        _this.update(res.id, { sid: sid }, function (err2, res2) {

          if (err) {
            _logger.logger.error(err);

            return cb({
              message: 'Could not create short id for organization',
              resource: 'OrganizationService'
            });
          }

          return cb(null, res2);
        });
      });
    }
  }, {
    key: 'get',
    value: function get() {
      var organizationModel = new _organization2.default();

      organizationModel.get.apply(organizationModel, arguments);
    }
  }, {
    key: 'getByShortId',
    value: function getByShortId() {
      var organizationModel = new _organization2.default();

      organizationModel.getByShortId.apply(organizationModel, arguments);
    }
  }, {
    key: 'list',
    value: function list() {

      var organizationModel = new _organization2.default();

      organizationModel.list.apply(organizationModel, arguments);
    }
  }, {
    key: 'update',
    value: function update() {
      var organizationModel = new _organization2.default();

      organizationModel.update.apply(organizationModel, arguments);
    }
  }, {
    key: 'updateByShortId',
    value: function updateByShortId() {
      var organizationModel = new _organization2.default();

      organizationModel.updateByShortId.apply(organizationModel, arguments);
    }
  }]);
  return OrganizationService;
}();

exports.default = OrganizationService;
//# sourceMappingURL=organization.js.map