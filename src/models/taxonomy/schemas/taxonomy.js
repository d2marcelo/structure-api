import {Schema, type} from 'eisley'

export default new Schema({
  data: type('string'),
  description: type('string'),
  title: type('string')
})
