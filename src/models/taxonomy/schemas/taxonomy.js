import {Schema, type} from 'eisley'

export default new Schema({
  desc        : type('string'),
  slug        : type('string'),
  title       : type('string')
})
