'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _logger = require('../../lib/logger');

var _digitalAsset = require('../digital-asset');

var _digitalAsset2 = _interopRequireDefault(_digitalAsset);

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RevisionModel = function (_Model) {
  (0, _inherits3.default)(RevisionModel, _Model);

  function RevisionModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, RevisionModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RevisionModel).call(this, (0, _assign2.default)({}, {
      name: 'revisions',

      permissions: {
        create: ['user'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['user']
      },
      relations: {
        belongsTo: [{
          Node: 'Document',
          foreignKey: 'id',
          localField: 'document',
          localKey: 'documentId'
        }]
      },
      schema: {
        desc: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options)));
  }

  (0, _createClass3.default)(RevisionModel, [{
    key: 'getAll',
    value: function getAll(req) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {

        _root2.default.prototype.getAll.call(_this2).then(function (revisions) {

          var resolvedRevisions = [];
          revisions.forEach(function (revision) {
            resolvedRevisions.push(_this2.resolveFields(revisions));
          });

          _promise2.default.all(resolvedRevisions).then(function (revisions) {
            resolve(revisions);
          }).catch(function (err) {
            _logger.logger.error('Error resolving revisions', err);
            reject(err);
          });
        }).catch(function (err) {
          _logger.logger.error('Could not get revisions', err);
        });
      });
    }
  }, {
    key: 'getById',
    value: function getById(req) {
      var _this3 = this;

      var id = typeof req == 'string' ? req : req.params.id;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          var revision;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _root2.default.prototype.getById.call(_this3, id);

                case 2:
                  revision = _context.sent;

                  if (revision.id) {
                    _context.next = 6;
                    break;
                  }

                  _logger.logger.error('Could not get revision', id);
                  return _context.abrupt('return', reject(revisions));

                case 6:

                  _this3.resolveFields(revision).then(function (revision) {
                    resolve(revision);
                  }).catch(function (err) {
                    _logger.logger.error('Could not resolve fields for revision', err);
                  });

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this3);
        }));
        return function (_x2, _x3) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'getFieldReference',
    value: function getFieldReference(ref) {
      return new _promise2.default(function (resolve, reject) {

        _driver2.default.db(process.env.RETHINK_DB_NAME).table(ref.node.replace('-', '_')).get(ref.id).run().then(function (res) {
          resolve(res);
        }).catch(function (err) {
          console.error('Could not get field reference', err);
          reject(err);
        });
      });
    }
  }, {
    key: 'getFieldReferences',
    value: function getFieldReferences(field) {
      var _this4 = this;

      var resolvedRefs = 0;

      return new _promise2.default(function (resolve, reject) {

        if (!field.__refs) {
          return resolve(field);
        }

        field.__refs.forEach(function (ref) {
          _this4.getFieldReference(ref).then(function (res) {

            switch (ref.node) {
              case 'digital-asset':

                var da = new _digitalAsset2.default(),
                    pkgd = da.pkg(res);

                (0, _assign2.default)(field, {
                  body: {
                    mimetype: pkgd.mimetype,
                    src: pkgd.src
                  }
                });

                break;

              /*
              TODO:
              Not quite sure what to do here
              */
              default:
                var re = (0, _assign2.default)({}, res);
                delete re.id;

                (0, _assign2.default)(field, {
                  body: re
                });
            }

            resolvedRefs++;

            if (field.__refs.length == resolvedRefs) {
              resolve(field);
            }
          }).catch(function (err) {
            _logger.logger.error('Could not handle field references', err);
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'resolveFieldReferences',
    value: function resolveFieldReferences(field, i) {
      var _this5 = this;

      return new _promise2.default(function (resolve, reject) {

        var resolvedRefs = [];
        resolvedFields.push(_this5.getFieldReferences(field));

        _promise2.default.all(resolvedFields).then(function (fields) {
          resolve(fields[0]);
        }).catch(function (err) {
          _logger.logger.error('Error fetching revision field references', err);
          reject(err);
        });
      });
    }
  }, {
    key: 'resolveFields',
    value: function resolveFields(revision) {
      var _this6 = this;

      return new _promise2.default(function (resolve, reject) {

        var fieldsResolved = [];

        if (revision.fields) {
          revision.fields.forEach(function (field, i) {
            fieldsResolved.push(_this6.resolveFieldRefences(field, i));
          });

          _promise2.default.all(fieldsResolved).then(function (fields) {
            (0, _assign2.default)(revision, {
              fields: fields
            });

            resolve(revision);
          }).catch(function (err) {
            reject(err);
          });
        } else {
          resolve(revision);
        }
      });
    }
  }]);
  return RevisionModel;
}(_root2.default);

exports.default = RevisionModel;
//# sourceMappingURL=index.js.map