
require('dotenv').config()

console.log('SESSION_SECRET configured:', Boolean(process.env.SESSION_SECRET))
console.log('DATABASE_URL configured:', Boolean(process.env.DATABASE_URL))

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const PgSession = require('connect-pg-simple')(session)
const pool = require('./db')

const app = express()

// Required when deployed behind a proxy such as Railway.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    callback(new Error('Origin not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json())

// Store login sessions in PostgreSQL.
app.use(session({
  store: new PgSession({
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  }),
  name: 'verde.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production'
      ? 'none'
      : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}))

// Existing health route.
app.get('/api/health', (req, res) => {
  res.json({
    message: 'VERDE backend is running!',
    status: 'success',
  })
})

// Existing menu route.
app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM menu_items ORDER BY id'
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Database error:', error.message)

    res.status(500).json({
      message: 'Could not load menu items',
    })
  }
})

// Register a new customer.
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanName || !cleanEmail || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      })
    }

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        message: 'Please enter a valid name and email address',
      })
    }

    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({
        message: 'Password must be between 8 and 72 characters',
      })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [cleanName, cleanEmail, passwordHash]
    )

    const user = result.rows[0]

    // Regenerate the session ID after authentication.
    req.session.regenerate((error) => {
      if (error) {
        console.error('Session error:', error)
        return res.status(500).json({
          message: 'Account created, but login failed',
        })
      }

      req.session.userId = user.id

      req.session.save((saveError) => {
        if (saveError) {
          console.error('Session save error:', saveError)
          return res.status(500).json({
            message: 'Could not save login session',
          })
        }

        res.status(201).json({
          message: 'Account created successfully',
          user,
        })
      })
    })
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        message: 'An account with this email already exists',
      })
    }

    console.error('Signup error:', error)
    res.status(500).json({
      message: 'Could not create account',
    })
  }
})

// Log in an existing customer.
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const result = await pool.query(
      `SELECT id, name, email, password_hash
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()]
    )

    const user = result.rows[0]

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    req.session.regenerate((error) => {
      if (error) {
        console.error('Session error:', error)
        return res.status(500).json({
          message: 'Could not start login session',
        })
      }

      req.session.userId = user.id

      req.session.save((saveError) => {
        if (saveError) {
          console.error('Session save error:', saveError)
          return res.status(500).json({
            message: 'Could not save login session',
          })
        }

        res.json({
          message: 'Logged in successfully',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })
      })
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      message: 'Could not log in',
    })
  }
})

// Find out who is currently logged in.
app.get('/api/auth/me', async (req, res) => {
  if (!req.session.userId) {
    return res.json({ user: null })
  }

  try {
    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.session.userId]
    )

    res.json({
      user: result.rows[0] || null,
    })
  } catch (error) {
    console.error('Session lookup error:', error)
    res.status(500).json({
      message: 'Could not check login session',
    })
  }
})

// Log out the current customer.
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Logout error:', error)
      return res.status(500).json({
        message: 'Could not log out',
      })
    }

    res.clearCookie('verde.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production'
        ? 'none'
        : 'lax',
    })

    res.json({
      message: 'Logged out successfully',
    })
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`VERDE server running on port ${PORT}`)
})
