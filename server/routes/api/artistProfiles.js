const express = require('express')
const router = express.Router()

// @route  GET api/artists/profiles
// @desc   Find artist's profiles
// @access Public
router.get('/', (req, res) => {
  res.send('Artists Profiles route')
})

module.exports = router
