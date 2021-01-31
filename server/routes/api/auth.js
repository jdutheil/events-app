const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const passport = require('passport')

const User = require('../../models/User')

const userAuth = require('../../middleware/userAuth')

const sendToken = (user, res, err = null) => {
  console.log('sendToken user')
  console.log(user)
  if (err) {
    return res.status(400).send({ errors: [{ msg: err }] })
  }

  try {
    const payload = {
      user: {
        id: user._id,
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
    return res.status(500).send('Erreur serveur')
  }
}

// @route  POST api/auth
// @desc   Authenticate User & Get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Merci de renseigner une adresse email correcte').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    passport.authenticate('local', (err, user) => {
      sendToken(user, res, err)
    })(req, res, next)
  }
)

// @route GET api/auth
// @desc  Authentication route
// @access Public
router.get('/', userAuth, async (req, res) => {
  console.log('req user userAuth')
  console.log(req.user)

  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
})

router.get('/google', (req, res, next) => {
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] },
    (err, user) => {}
  )(req, res, next)
})

/*router.get('/google/callback', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    sendToken(user, res, err)
  } catch (err) {
    res.status(500).send('Erreur serveur')
  }
})*/

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/connexion',
  })
)

router.get('/google/success', (req, res) => {
  if (req.user) {
    console.log('req.user')
    console.log(req.user)
    const user = req.user
    sendToken(user, res, null)
  } else {
    res
      .status(400)
      .json({ errors: [{ msg: "Echec de l'identification Google" }] })
  }
})

module.exports = router
