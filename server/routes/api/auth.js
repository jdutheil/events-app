const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const User = require('../../models/User')

const userAuth = require('../../middleware/userAuth')

// @route  POST api/auth
// @desc   Authenticate User & Get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Merci de renseigner une adresse email correcte').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "L'adresse email ou le mot de passe est incorrect" }],
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "L'adresse email ou le mot de passe est incorrect" }],
        })
      }

      const payload = {
        user: {
          id: user.id,
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
      res.status(500).send('Erreur serveur')
    }
  }
)

// @route GET api/auth
// @desc  Authentication route
// @access Public
router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
})

module.exports = router
