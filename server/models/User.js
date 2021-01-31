const mongoose = require('mongoose')

const options = { discriminatorKey: 'type' }

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  options
)

module.exports = User = mongoose.model('User', UserSchema)
