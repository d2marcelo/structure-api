import Disk from 'structure-storage-disk-adaptor'

export default {
  disk: {
    adaptor: new Disk.Adaptor(),
    name: 'disk'
  }
}
