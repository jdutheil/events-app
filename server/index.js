const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const passport = require('./passport/setup')
const cors = require('cors')
const session = require('express-session')

const app = express()

// Connect database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'session-secrets', cookie: { _expires: 120000 } }))
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('API running')
})

// Define routes
app.use('/api/auth', require('./routes/api/auth'))

// Artists
app.use('/api/artists', require('./routes/api/artists'))
app.use('/api/artists/profiles', require('./routes/api/artistProfiles'))

// Enterprises
app.use('/api/enterprises', require('./routes/api/enterprises'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
