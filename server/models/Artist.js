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
})

module.exports = Artist = User.discriminator('Artist', ArtistSchema, options)
