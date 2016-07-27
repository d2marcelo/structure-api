import {Schema, type} from 'eisley'

export default new Schema({
  activeRevisionId : type('string'),
  desc             : type('string'),
  revisionIds      : type('array'),
  title            : type('string')
})
