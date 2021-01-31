const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const bcrypt = require('bcryptjs')
const config = require('config')

const User = require('../models/User')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })

        if (!user) {
          return done("L'adresse email ou le mot de passe est incorrect", false)
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return done("L'adresse email ou le mot de passe est incorrect", false)
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get('googleClientId'),
      clientSecret: config.get('googleClientSecret'),
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      var email = profile.emails[0].value

      try {
        const user = await User.findOne({ email })

        if (!user) {
          return done(
            'Utilisateur inconnu - Veuillez vous inscrire auparavant',
            false
          )
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

module.exports = passport
