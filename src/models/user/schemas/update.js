import {Schema, type} from 'eisley'

export default new Schema({
  email     : type('string'),
  firstName : type('string'),
  lastName  : type('string'),
  username  : type('string'),
  password : type('password', {hash: true})
}, {strict: false})
