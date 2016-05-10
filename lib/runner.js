import Mapper from './mapper'

class Runner {

  constructor(Nodes) {
    this.Nodes = Nodes

    this.mapper = new Mapper(Nodes)
  }

  query(q) {

  }

}

export default Runner
