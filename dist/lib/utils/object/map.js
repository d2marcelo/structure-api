'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ObjectMap(obj, fun) {

  var newObj = {};

  (0, _keys2.default)(obj).forEach(function (k, i) {

    var v = obj[k];

    console.error('inside k,v', k, v);

    if ((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) == 'object' && !v.join) {

      newObj[k] = ObjectMap(v, fun);

      // Array
      /*if(o.join) {
        o.forEach( (item) => {
         })
      }
       // Object
      else {
       }*/
    } else {
      newObj[k] = fun(v, k, i);
      console.error('v', vs);
    }
  });

  return newObj;
}

exports.default = ObjectMap;
//# sourceMappingURL=map.js.map