const Mongoose = require('mongoose')
UserSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const UserModel = Mongoose.model('User', UserSchema)

module.exports = UserModel