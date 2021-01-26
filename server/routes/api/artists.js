const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

// Middlewares
const artistAuth = require('../../middleware/artistAuth')

// Models
const Artist = require('../../models/Artist')

// @route  POST api/artists
// @desc   Register artist
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with at least 8 characters'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Send 400 code (BAD REQUEST)
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      // Check if user exists
      let artist = await Artist.findOne({ email })
      if (artist) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Artist already exists' }] })
      }

      artist = new Artist({
        email,
        password,
      })

      // Encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10)
      artist.password = await bcrypt.hash(password, salt)

      // Save to DB
      await artist.save()

      // Return jsonwebtoken
      const payload = {
        artist: {
          id: artist.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          console.log('err,token')
          if (err) throw err
          console.log('res.json')
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route  POST api/artists/auth
// @desc   Authenticate artist & Get token
// @access Public
router.post(
  '/auth',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const artist = await Artist.findOne({ email })

      if (!artist) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      const isMatch = await bcrypt.compare(password, artist.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      const payload = {
        artist: {
          id: artist.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
    }
  }
)

// @route GET api/artists/auth
// @desc  Authentication route for artists
// @access Public
router.get('/auth', artistAuth, async (req, res) => {
  try {
    const artist = await Artist.findById(req.artist.id).select('-password')
    res.json(artist)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
