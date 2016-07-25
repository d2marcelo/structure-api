'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mapper = function () {
  function Mapper(Nodes) {
    (0, _classCallCheck3.default)(this, Mapper);

    this.Nodes = Nodes;
  }

  (0, _createClass3.default)(Mapper, [{
    key: 'relations',
    value: function relations() {
      var _this = this;

      this.Nodes.forEach(function (Node) {
        var node = new Node();

        (0, _keys2.default)(_this.relations).forEach(function (relation) {

          (0, _keys2.default)(relation).forEach(function (key) {
            var options = relation[key];

            options.forEach(function (option) {
              var Node = require('../' + option.Node).default;

              switch (key) {
                case 'belongsTo':

                  try {
                    _this.Model.belongsTo(Node, option.localField, option.localKey, option.foreignKey || _this.defaults.fields.foreignKey);
                  } catch (e) {
                    _logger.logger.error('Relationship failed: belongsTo', e);
                  }

                  break;

                case 'hasAndBelongsToMany':

                  try {
                    _this.Model.hasAndBelongsToMany(Node, option.localField, option.localKey, option.foreignKey || _this.defaults.fields.foreignKey);
                  } catch (e) {
                    _logger.logger.error('Relationship failed: hasAndBelongsToMany', e);
                  }

                  break;

                case 'hasMany':

                  try {
                    _this.Model.hasMany(Node, option.localField, option.localKey, option.foreignKey || _this.defaults.fields.foreignKey);
                  } catch (e) {
                    _logger.logger.error('Relationship failed: hasMany', e);
                  }

                  break;

                case 'hasOne':

                  try {
                    _this.Model.hasOne(Node, option.localField, option.localKey, option.foreignKey || _this.defaults.fields.foreignKey);
                  } catch (e) {
                    _logger.logger.error('Relationship failed: hasOne', e);
                  }

                  break;
              }
            });
          });
        });
      });
    }
  }]);
  return Mapper;
}();

exports.default = Mapper;
//# sourceMappingURL=mapper.js.map