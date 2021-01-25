const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('artist', ArtistSchema)