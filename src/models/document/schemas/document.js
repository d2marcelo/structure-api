import {Schema, type} from 'eisley'

export default new Schema({
  activeRevisionId: type('string'),
  revisionIds: type('string'),
  desc: type('string'),
  title: type('string')
})
