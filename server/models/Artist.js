const mongoose = require('mongoose')
const User = require('./User')

const options = { discriminatorKey: 'type' }

const ArtistSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },

  lastname: {
    type: String,
  },

  address: {
    type: String,
  },

  zipcode: {
    type: String,
  },

  city: {
    type: String,
  },

  phone: {
    type: String,
  },

  isAnonymous: {
    type: Boolean,
    default: true,
  },
})

module.exports = Artist = User.discriminator('Artist', ArtistSchema, options)
