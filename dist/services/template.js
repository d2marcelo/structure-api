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

var _organization = require('../models/organization');

var _organization2 = _interopRequireDefault(_organization);

var _shortId = require('../services/short-id');

var _shortId2 = _interopRequireDefault(_shortId);

var _template = require('../models/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateService = function () {
  function TemplateService() {
    (0, _classCallCheck3.default)(this, TemplateService);
  }

  (0, _createClass3.default)(TemplateService, [{
    key: 'create',
    value: function create() {
      var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var cb = arguments[1];

      var _this = this;

      var pkg = (0, _assign2.default)({}, o);

      // validation

      var shortidService = new _shortId2.default(),
          templateModel = new _template2.default();

      templateModel.create(pkg, function (err, res) {

        if (err) {
          _logger.logger.error(err);

          return cb({
            message: 'Could not create template',
            resource: 'TemplateService'
          });
        }

        var sid = shortidService.issue(res.id);

        _this.update(res.id, { sid: sid }, function (err2, res2) {

          if (err) {
            _logger.logger.error(err);

            return cb({
              message: 'Could not create short id for template',
              resource: 'TemplateService'
            });
          }

          return cb(null, res2);
        });
      });
    }
  }, {
    key: 'get',
    value: function get() {
      var templateModel = new _template2.default();

      templateModel.get.apply(templateModel, arguments);
    }
  }, {
    key: 'getByShortId',
    value: function getByShortId() {
      var templateModel = new _template2.default();

      templateModel.getByShortId.apply(templateModel, arguments);
    }
  }, {
    key: 'update',
    value: function update() {
      var templateModel = new _template2.default();

      templateModel.update.apply(templateModel, arguments);
    }
  }, {
    key: 'updateByShortId',
    value: function updateByShortId() {
      var templateModel = new _template2.default();

      templateModel.updateByShortId.apply(templateModel, arguments);
    }
  }]);
  return TemplateService;
}();

exports.default = TemplateService;
//# sourceMappingURL=template.js.map