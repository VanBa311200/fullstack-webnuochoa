const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization')
  console.log(`[verifyToken] authHeader: ${authHeader}`)

  const token = authHeader && authHeader.split(' ')[1]
  console.log(`[verifyToken] token: ${token}`)

  if (!token) {
    console.log('[verifyToken] : Token NotFound')
    return res.status(404).json({ success: false, message: 'Token not found' })
  }
  try {
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(`[verifyToken] decode: `, decode)
    req.userId = decode.user._id;
    next()
  } catch (error) {
    console.log('[verifyToken] Error decode: Invalid Token')
    return res.status(403).json({ success: false, message: 'Invalid Token' });
  }
}

module.exports = verifyToken