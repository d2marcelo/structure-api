/**
 * Module Dependencies
 *
 * @ignore
 */
import Disk from 'structure-storage-disk-adaptor'

export default {
  items: [
    Object.assign({
      status: 'active',
      type: 'adaptor'
    }, Disk.config)
  ]
}
