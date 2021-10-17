const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization')

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(404).json({ success: false, message: 'Token not found' })
  }
  try {
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.userId = decode.user._id;
    next()
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid Token' });
  }
}

module.exports = verifyToken