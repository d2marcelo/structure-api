import {Schema, type} from 'eisley'

export default new Schema({
  email    : type('string'),
  password : type('string'),
  username : type('string')
})
