class Res {

  end() {
    return this
  }

  json() {
    return this
  }

  send() {
    return this
  }

  status(code) {
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
