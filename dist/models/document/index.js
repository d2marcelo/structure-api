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

var _documentRevision = require('../document-revision');

var _documentRevision2 = _interopRequireDefault(_documentRevision);

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import config from '../../config'

var DocumentModel = function (_Model) {
  (0, _inherits3.default)(DocumentModel, _Model);

  function DocumentModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, DocumentModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DocumentModel).call(this, (0, _assign2.default)({}, {
      name: 'documents',

      permissions: {
        create: ['user'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['user']
      },
      relations: {
        belongsTo: [{
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }, {
          Node: 'Template',
          foreignKey: 'id',
          localField: 'template',
          localKey: 'templateId'
        }, {
          Node: 'User',
          foreignKey: 'id',
          localField: 'user',
          localKey: 'userId'
        }],
        hasMany: [{
          Node: 'Taxonomy',
          foreignKey: 'id',
          localField: 'taxonomys',
          localKey: 'taxonomysId'
        }]
      },
      schema: {
        activeRevisionId: {
          type: 'string'
        },
        desc: {
          type: 'string'
        },
        revisionIds: {
          type: 'array'
        },
        title: {
          type: 'string'
        }
      }
    }, options)));
  }

  (0, _createClass3.default)(DocumentModel, [{
    key: 'create',
    value: function create(req) {
      var _this2 = this;

      if (!req.body.fields) return _root2.default.prototype.getById.apply(this, arguments);

      /*
      NOTE:
      When a template is created with fields, we need to take those fields and place them on a revision
      */

      var fields = req.body.fields.slice(0);
      delete req.body.fields;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          var doc, revision, update, docFinalized;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _root2.default.prototype.create.call(_this2, req);

                case 2:
                  doc = _context.sent;
                  _context.next = 5;
                  return new _documentRevision2.default().create({
                    body: {
                      documentId: 2,
                      fields: fields
                    }
                  });

                case 5:
                  revision = _context.sent;
                  _context.next = 8;
                  return _this2.update({
                    body: {
                      activeRevisionId: revision.id,
                      revisionIds: [revision.id]
                    },
                    params: {
                      id: doc.id
                    }
                  });

                case 8:
                  update = _context.sent;
                  _context.next = 11;
                  return _this2.getById({
                    params: {
                      id: doc.id
                    }
                  });

                case 11:
                  docFinalized = _context.sent;


                  resolve(docFinalized);

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));
        return function (_x2, _x3) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var _this3 = this;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
          var docs, docsResolved;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _root2.default.prototype.getAll.call(_this3);

                case 2:
                  docs = _context2.sent;
                  docsResolved = [];


                  docs.forEach(function (doc) {
                    docsResolved.push(_this3.getActiveRevision(doc).then(function (revision) {
                      return (0, _assign2.default)(doc, {
                        fields: revision.fields,
                        title: revision.title
                      });
                    }));
                  });

                  _promise2.default.all(docsResolved).then(function (docs) {
                    resolve(docs);
                  });

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3);
        }));
        return function (_x4, _x5) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'getById',
    value: function getById(req) {
      var _this4 = this;

      var id = typeof req == 'string' ? req : req.params.id;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(resolve, reject) {
          var doc, revision;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _root2.default.prototype.getById.call(_this4, id);

                case 2:
                  doc = _context3.sent;

                  if (doc.id) {
                    _context3.next = 6;
                    break;
                  }

                  _logger.logger.error('Could not get document', id);
                  return _context3.abrupt('return', reject(doc));

                case 6:
                  _context3.next = 8;
                  return _this4.getActiveRevision(doc);

                case 8:
                  revision = _context3.sent;


                  (0, _assign2.default)(doc, {
                    fields: revision.fields,
                    title: revision.title
                  });

                  return _context3.abrupt('return', resolve(doc));

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4);
        }));
        return function (_x6, _x7) {
          return ref.apply(this, arguments);
        };
      }());
    }

    /*
    NOTE:
    Revisions are created on save, not doc creation, which means they aren't guaranteed exist after initial creation.
    The create method has been recently modified to add a revision if the `fields` property is passed
    */

  }, {
    key: 'getActiveRevision',
    value: function getActiveRevision(doc) {
      var _this5 = this;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(resolve, reject) {
          var revision;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (doc.activeRevisionId) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return', resolve({
                    fields: [],
                    title: doc.title
                  }));

                case 2:
                  _context4.next = 4;
                  return new _documentRevision2.default().getById(doc.activeRevisionId);

                case 4:
                  revision = _context4.sent;

                  if (revision.id) {
                    _context4.next = 8;
                    break;
                  }

                  _logger.logger.error('Could not get document revision for', doc.id);
                  return _context4.abrupt('return', reject(revision));

                case 8:

                  resolve(revision);

                case 9:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5);
        }));
        return function (_x8, _x9) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return DocumentModel;
}(_root2.default);

exports.default = DocumentModel;
//# sourceMappingURL=index.js.map