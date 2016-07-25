'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = require('../lib/logger');

var _shortId = require('../services/short-id');

var _shortId2 = _interopRequireDefault(_shortId);

var _driver = require('../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

var _uuid = require('../lib/utils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RootNode = function () {
  function RootNode() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, RootNode);

    this.defaults = {};

    this.permissions = {
      create: ['admin'],
      delete: ['admin'],
      read: ['public'],
      replace: ['admin'],
      update: ['admin']
    };

    (0, _assign2.default)(this, options);
    if (!this.name) {
      throw new Error('model.name must be defined');
    }
    if (!this.table) this.table = this.name;

    /*
    Map to Thinky Schema requirements
    */
    var schema = {};
    if (this.schema) {
      /*Object.keys(this.schema).forEach( (key) => {
        switch(this.schema[key].type) {
          case 'date':
             schema[key] = Date
             break
           case 'object':
             schema[key] = Object
             break
           case 'string':
             schema[key] = String
             break
           default:
            //console.error('what is o', o)
        }
      })*/
    }
  }

  (0, _createClass3.default)(RootNode, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var pkg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


      var insertOptions = {
        returnChanges: options.returnChanges || true
      };

      pkg.createdAt = _driver2.default.now();
      pkg.id = pkg.id || (0, _uuid2.default)();
      pkg.sid = new _shortId2.default().issue(pkg.id);
      pkg.updatedAt = _driver2.default.now();
      pkg.__version = process.env.npm_package_version;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          var res, doc, refs;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _driver2.default.table(options.table || _this.table).insert(pkg, insertOptions);

                case 3:
                  res = _context.sent;

                  if (!(res.errors && res.errors > 0)) {
                    _context.next = 6;
                    break;
                  }

                  throw new Error(res.first_error);

                case 6:
                  doc = res.changes[0].new_val;

                  //logger.debug('Document created', doc)

                  if (!(pkg.__refs && pkg.__refs.length > 0)) {
                    _context.next = 13;
                    break;
                  }

                  refs = [];

                  pkg.__refs.forEach(function (ref) {
                    refs.push(_this.referenceTo('belongsTo', doc.id, ref));
                  });

                  return _context.abrupt('return', _promise2.default.all(refs).then(function () {
                    resolve(doc);
                  }).catch(reject));

                case 13:
                  return _context.abrupt('return', resolve(doc));

                case 14:
                  _context.next = 21;
                  break;

                case 16:
                  _context.prev = 16;
                  _context.t0 = _context['catch'](0);

                  _logger.logger.error('Could not create');
                  console.error(_context.t0);
                  throw _context.t0;

                case 21:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 16]]);
        }));
        return function (_x4, _x5) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      return _promise2.default.resolve();
    }
  }, {
    key: 'getById',
    value: function getById(id) {
      var _this2 = this;

      // Short ID
      if (id.length <= 10) {

        return new _promise2.default(function () {
          var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
            var doc;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return _driver2.default.table(_this2.table).filter({ sid: id }).limit(1);

                  case 3:
                    doc = _context2.sent;
                    return _context2.abrupt('return', resolve(_this2.getById(doc[0].id)));

                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2['catch'](0);

                    _logger.logger.error('Could not get by id');
                    console.error(_context2.t0.stack);
                    throw _context2.t0;

                  case 12:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2, [[0, 7]]);
          }));
          return function (_x6, _x7) {
            return ref.apply(this, arguments);
          };
        }());
      }

      // Long ID
      else {
          return _driver2.default.table(this.table).get(id);
        }
    }

    /*
    TODO: need more pagination logic
    */

  }, {
    key: 'getAll',
    value: function getAll() {
      return _driver2.default.table(this.table).orderBy(_driver2.default.desc('updatedAt')).limit(10);
    }
  }, {
    key: 'getRelations',
    value: function getRelations(type) {
      var _this3 = this;

      var relations = [];

      (0, _keys2.default)(this.relations).forEach(function (relation) {

        if (relation == type) {
          relations = _this3.relations[relation];
        }
      });

      return relations;
    }
  }, {
    key: 'referenceTo',
    value: function referenceTo(type, id, reference) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        var inserts = [];

        (0, _keys2.default)(reference).forEach(function () {
          var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(key) {
            var referencePkg;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    referencePkg = {};

                    referencePkg[_this4.name + 'Id'] = id; // local key
                    referencePkg[key] = reference[key]; // foreign key

                    _context3.t0 = type;
                    _context3.next = _context3.t0 === 'belongsTo' ? 6 : 8;
                    break;

                  case 6:
                    //referencePkg.name = `${key.replace('Id', '')}_has_${this.name}`
                    referencePkg.type = 'belongsTo';

                    return _context3.abrupt('break', 8);

                  case 8:

                    referencePkg.node = _this4.name;

                    inserts.push(_this4.insertReference(referencePkg));

                  case 10:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this4);
          }));
          return function (_x8) {
            return ref.apply(this, arguments);
          };
        }());

        _promise2.default.all(inserts).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'insertReference',
    value: function insertReference() {
      var pkg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return _driver2.default.table('refs').insert(pkg);
    }
  }, {
    key: 'update',
    value: function update(id) {
      var _this5 = this;

      var pkg = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


      pkg.__version = process.env.npm_package_version;

      options.returnChanges = options.returnChanges || true;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(resolve, reject) {
          var res;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _this5.getById(id).update(pkg, options);

                case 3:
                  res = _context4.sent;
                  return _context4.abrupt('return', resolve(res.changes[0].new_val));

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](0);

                  _logger.logger.error('Error updating');
                  console.error(_context4.t0.stack);
                  throw _context4.t0;

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5, [[0, 7]]);
        }));
        return function (_x12, _x13) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return RootNode;
}();

exports.default = RootNode;
//# sourceMappingURL=root.js.map