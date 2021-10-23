const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: Object,
  },
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  state: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  image: {
    type: String
  },
  token: {
    type: String,
  }
}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema)