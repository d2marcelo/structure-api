'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _structureStorageDiskAdaptor = require('structure-storage-disk-adaptor');

var _structureStorageDiskAdaptor2 = _interopRequireDefault(_structureStorageDiskAdaptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  disk: {
    adaptor: new _structureStorageDiskAdaptor2.default.Adaptor(),
    name: 'disk'
  }
};
//# sourceMappingURL=storageAdaptors.js.map