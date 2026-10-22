const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  // the token arrives in a header that looks like: Authorization: Bearer <token>
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = header.split(' ')[1]

  try {
    // verify checks the signature and the expiry time
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // save the user info for the route to use
    next() // let the request continue
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = authMiddleware