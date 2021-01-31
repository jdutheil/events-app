const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

// Models
const Enterprise = require('../../models/Enterprise')

// @route  POST api/enterprises
// @desc   Register enterprise
// @access Public
router.post(
  '/',
  [
    check('email', 'Merci de renseigner une adresse email valide').isEmail(),
    check(
      'password',
      "Merci d'utiliser un mot de passe avec 8 caractères minimum"
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
      let enterprise = await Enterprise.findOne({ email })
      if (enterprise) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Cette adresse email est déjà utilisée - veuillez vous connecter',
            },
          ],
        })
      }

      enterprise = new Enterprise({
        email,
        password,
      })

      // Encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10)
      enterprise.password = await bcrypt.hash(password, salt)

      // Save to DB
      await enterprise.save()

      // Return jsonwebtoken
      const payload = {
        user: {
          id: enterprise.id,
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
      res.status(500).send('Erreur serveur')
    }
  }
)

module.exports = router
