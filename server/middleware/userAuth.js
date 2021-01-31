/**
 * Middleware for Artist authentication
 */

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  if (!token) {
    // 401 : Unauthorized
    return res.status(401).json({ msg: 'Pas de token, accès refusé' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    console.log('user')
    console.log(req.user)
    next()
  } catch (err) {
    res.status(401).json({ msg: "Le token n'est pas valide" })
  }
}
