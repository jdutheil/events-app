const mongoose = require('mongoose')
const User = require('./User')

const options = { discriminatorKey: 'type' }

const EnterpriseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
})

module.exports = Enterprise = User.discriminator(
  'Enterprise',
  EnterpriseSchema,
  options
)
