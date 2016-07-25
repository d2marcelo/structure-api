import {chalk, logger} from '../lib/logger'
import shorthash       from 'shorthash'

class ShortIdService {

  constructor(options = {}) {
    this.options = options
  }

  issue(id) {

    var sid = shorthash.unique(id)

    return sid

  }

}

export default ShortIdService
