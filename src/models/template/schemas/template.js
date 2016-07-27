import {Schema, type} from 'eisley'

export default new Schema({
  desc: type('string'),
  fields: type('string'),
  title: type('string')
})
