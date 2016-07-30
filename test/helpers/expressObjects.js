import {chalk, logger} from '../../src/lib/logger'

class Res {

  end() {
    return this
  }

  json(pkg = {}) {
    logger.debug('pkg', pkg)
    return this
  }

  send() {
    return this
  }

  status(code) {
    logger.debug('status', code)
    this.statusCode = code

    return this
  }

}

function next() {return this}

export default function expressObjects() {

  return {
    req: {
      body: {},
      params: {}
    },
    res: new Res(),
    next
  }

}
