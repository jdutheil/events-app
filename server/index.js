const express = require('express')
const connectDB = require('./config/db')

const app = express()

// Connect database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('API running')
})

// Define routes
app.use('/api/artists', require('./routes/api/artists'))
app.use('/api/artists/profiles', require('./routes/api/artistProfiles'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
