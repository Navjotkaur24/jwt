const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const users = require('../data/users')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// POST /register: save a new user in the array
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const exists = users.find((u) => u.username === username)
  if (exists) {
    return res.status(409).json({ error: 'Username already taken' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  users.push({ username, password: hashedPassword })

  res.status(201).json({ message: 'User registered successfully' })
})

// POST /login: check credentials and return a JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const user = users.find((u) => u.username === username)
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  res.status(200).json({ token })
})

// GET /protected: only works with a valid token
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.username}! This is a protected route.`,
  })
})

module.exports = router